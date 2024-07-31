<template>
  <div class="w-2/3 p-4 m-auto">
    <h1 class="text-4xl font-extrabold mb-8 text-center text-white">KboZino</h1>
    <date-picker v-model="selectDate" />
    <div v-if="games.length > 0" class="shadow-lg rounded-lg overflow-hidden">
      <div v-for="game in games" :key="game.id" class="flex flex-col items-center justify-between p-6 border-b last:border-b-0 bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
        <div v-if="game.statusCode === 'BEFORE' || game.statusCode === 'READY'" class="flex items-center space-x-8 mb-4">
          <div class="flex flex-col items-center space-y-2">
            <img :src="`src/assets/logos/${game.homeTeamCode}.png`" alt="Home Team Emblem" class="h-16 w-16 object-contain" />
            <span class="font-bold text-xl text-black">{{ game.homeTeam }}</span>
          </div>
          <div class="text-center text-gray-700 p-10 mt-2">
            <span class="block text-gray-500">{{ game.location }}</span>
            <span class="text-lg font-semibold">{{ game.time.split('T')[1].split(':').slice(0, 2).join(':') }}</span>
          </div>
          <div class="flex flex-col items-center space-y-2">
            <img :src="`src/assets/logos/${game.awayTeamCode}.png`" alt="Away Team Emblem" class="h-16 w-16 object-contain" />
            <span class="font-bold text-xl text-black">{{ game.awayTeam }}</span>
          </div>
        </div>
        <div v-if="game.statusCode === 'RESULT' || game.statusCode === 'STARTED'" class="flex items-center space-x-8 mb-4">
          <div class="flex flex-col items-center space-y-2">
            <img :src="`src/assets/logos/${game.homeTeamCode}.png`" alt="Home Team Emblem" class="h-16 w-16 object-contain" />
            <span class="font-bold text-xl text-black">{{ game.homeTeam }}</span>
          </div>
            <span class="p-3 text-3xl font-bold">
              {{game.homeTeamScore}}
            </span>
          <div class="text-center text-gray-700 p-10 mt-2">
            <span class="block text-gray-500">{{ game.location }}</span>
            <span class="text-lg font-semibold">{{ game.time.split('T')[1].split(':').slice(0, 2).join(':') }}</span>
          </div>
          <span class="p-3 text-3xl font-bold">
            {{game.awayTeamScore}}
            </span>
          <div class="flex flex-col items-center space-y-2">
            <img :src="`src/assets/logos/${game.awayTeamCode}.png`" alt="Away Team Emblem" class="h-16 w-16 object-contain" />
            <span class="font-bold text-xl text-black">{{ game.awayTeam }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <span class="block text-2xl p-5 font-bold">
        오늘은 경기가 없습니다.
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import DatePicker from "./components/DatePicker.vue";
import {useDateStore} from "./stores/dateStore.ts";

const selectDate = ref()
interface Game {
  id: number;
  time: string;
  location: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamCode: string;
  awayTeamCode: string;
  homeTeamEmblemUrl: string;
  awayTeamEmblemUrl: string;
  statusCode: string;
}


const dateStore = useDateStore()
const games = ref<Game[]>([]);
const loading = ref(true);
const date = new Date()


const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const selectedDate = ref<string>(formatDate(date)); // 초기 날짜를 설정할 수 있습니다.

const fetchGames = async () => {
  try {
    const response = await axios.get('/api/schedule/games', {
      params: {
        fields: 'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,homeStarterName,awayStarterName,winPitcherName,losePitcherName,homeCurrentPitcherName,awayCurrentPitcherName,broadChannel,homeTeamEmblemUrl,awayTeamEmblemUrl',
        upperCategoryId: 'kbaseball',
        fromDate: selectedDate.value,
        toDate: selectedDate.value,
        size: 500
      }
    });
    games.value = response.data.result.games.map((game: any) => ({
      id: game.id,
      time: game.gameDateTime, // Example time, replace with actual data
      location: game.stadium,
      homeTeam: game.homeStarterName,
      awayTeam: game.awayStarterName,
      homeTeamCode: game.homeTeamCode,
      awayTeamCode: game.awayTeamCode,
      awayTeamScore: game.awayTeamScore,
      homeTeamScore: game.homeTeamScore,
      homeTeamEmblemUrl: game.homeTeamEmblemUrl,
      awayTeamEmblemUrl: game.awayTeamEmblemUrl,
      statusCode: game.statusCode,
      channel: game.broadChannel
    }))
  if(games.value.length > 5){
    games.value.splice(0,1)
  }
  } catch (error) {
    console.error('Error fetching games:', error);
  } finally {
    loading.value = false;
  }
};

watch(dateStore,(nv) => {
  selectedDate.value = nv.getDate()
  fetchGames()
})

onMounted(async () => {
  await fetchGames()
});
</script>

<style scoped>
/* Add any styles you need for your component */
</style>

