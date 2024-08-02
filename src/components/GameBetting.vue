<template>
  <div class="betting-area p-6 rounded-lg shadow-lg mx-auto">
    <div class="flex justify-between items-center mb-4">
      <input type="radio" v-model="voting" :value="1" class="form-radio text-blue-600">
      <div class="progress-bar bg-gray-800 rounded-full h-4 w-full mx-4 relative overflow-hidden">
        <div class="absolute inset-0 flex">
          <div
              class="bg-blue-600 text-center text-white text-xs font-medium flex items-center justify-center transition-all duration-500 ease-out"
              :style="{ width: `${bluePercentage}%` }"></div>
          <div
              class="bg-red-600 text-center text-white text-xs font-medium flex items-center justify-center transition-all duration-500 ease-out"
              :style="{ width: `${redPercentage}%` }"></div>
        </div>
      </div>
      <input type="radio" v-model="voting" :value="0" class="form-radio text-red-600">
      <input type="radio" v-model="voting" :value="-1" class="form-radio text-gray-600">
    </div>
    <div class="flex justify-between text-gray-300 text-sm">
      <p>{{ blueTeam }}</p>
      <p>{{ redTeam }}</p>
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { supabase } from "../util/supabase.ts";

const props = defineProps({
  gameId: String
});

const voting = ref<number | null>(null);
const message = ref<string>('');
const blueTeam = ref<string>('Blue Team');
const redTeam = ref<string>('Red Team');
const bluePercentage = ref<number>(0);
const redPercentage = ref<number>(100);
const userEmail = ref<string | null>(null);

const fetchFullName = async (email: string) => {
  const { data, error } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('email', email)
      .single();

  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }
  return data.full_name;
};

const fetchBettingData = async () => {
  const email = userEmail.value;
  if (!email) {
    message.value = 'User email not found in local storage';
    return;
  }

  const fullName = await fetchFullName(email);

  if (!fullName) {
    message.value = 'Error fetching user profile';
    return;
  }

  const { data, error } = await supabase
      .from('betting')
      .select('*')
      .eq('game_id', props.gameId)
      .single();

  if (error) {
    message.value = 'Error fetching betting data: ' + error.message;
    return;
  }

  if (data) {
    blueTeam.value = data.blue_team || 'Team A';
    redTeam.value = data.red_team || 'Team B';
    const totalVotes = (data.blue_votes || 0) + (data.red_votes || 0);
    if (totalVotes > 0) {
      bluePercentage.value = (data.blue_votes / totalVotes) * 100;
      redPercentage.value = (data.red_votes / totalVotes) * 100;
    } else {
      bluePercentage.value = 50;
      redPercentage.value = 50;
    }
  }
};

const updateBettingData = async (newVal: number) => {
  const email = userEmail.value;
  if (!email) {
    message.value = 'User email not found in local storage';
    return;
  }

  const fullName = await fetchFullName(email);

  if (!fullName) {
    message.value = 'Error fetching user profile';
    return;
  }

  const newVote = { [fullName]: newVal };

  const { data: existingRecord, error: fetchError } = await supabase
      .from('betting')
      .select('*')
      .eq('game_id', props.gameId)
      .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    message.value = 'Error fetching record: ' + fetchError.message;
    return;
  }

  if (existingRecord) {
    // Update the existing record
    const updatedBetters = existingRecord.betters ? [...existingRecord.betters, newVote] : [newVote];
    const { data: updatedRecord, error: updateError } = await supabase
        .from('betting')
        .update({ betters: updatedBetters })
        .eq('game_id', props.gameId);

    if (updateError) {
      message.value = 'Error updating record: ' + updateError.message;
    } else {
      message.value = 'Record updated successfully';
      await fetchBettingData();
    }
  } else {
    // Insert a new record
    const insertData = {
      game_id: props.gameId
    };

    const { data: insertedRecord, error: insertError } = await supabase
        .from('betting')
        .insert([insertData]);

    if (insertError) {
      message.value = 'Error inserting record: ' + insertError.message;
    } else {
      message.value = 'Record inserted successfully';
      await fetchBettingData();
    }
  }
};

watch(voting, (newVal) => {
  if (newVal !== null) {
    updateBettingData(newVal);
  }
});

onMounted(() => {
  userEmail.value = localStorage.getItem('email');
  fetchBettingData();
});
</script>

<style scoped>
.betting-area {
  max-width: 600px;
}
.progress-bar {
  position: relative;
}
.message {
  margin-top: 10px;
  color: red;
}
</style>
