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
          <div class="flex flex-col items-center text-center text-gray-700 p-10 mt-2">
            <span class="block text-gray-500">{{ game.location }}</span>
            <span class="text-lg font-semibold">{{ game.time.split('T')[1].split(':').slice(0, 2).join(':') }}</span>
            <span v-if="game.statusCode === 'BEFORE'">경기 전</span>
            <span v-if="game.statusCode === 'READY'">경기 준비</span>
          </div>
          <div class="flex flex-col items-center space-y-2">
            <img :src="`src/assets/logos/${game.awayTeamCode}.png`" alt="Away Team Emblem" class="h-16 w-16 object-contain" />
            <span class="font-bold text-xl text-black">{{ game.awayTeam }}</span>
          </div>
        </div>
        <div v-if="game.statusInfo ==='경기취소'">
          해당 경기는 취소되었습니다!
        </div>
        <div v-if="game.statusCode === 'RESULT' || game.statusCode === 'STARTED'" class="flex items-center space-x-8 mb-4 cursor-pointer"  @click="navigateToRecord(game.id)" >
          <div class="flex flex-col items-center space-y-2 ">
            <img :src="`src/assets/logos/${game.homeTeamCode}.png`" alt="Home Team Emblem" class="h-16 w-16 object-contain" />
            <!--            <span class="font-bold text-xl text-black">{{ game.homeTeam }}</span>-->
            <span v-if="game.winner == 'HOME'" class="font-bold text-xl text-black"><a class="text-blue-500 text-sm bg-blue-50 p-1 rounded-xl">승</a> {{ game.winPitcherName }}</span>
            <span v-else class="font-bold text-xl text-gray-500"><a class="text-red-500 text-sm bg-red-50 p-1 rounded-xl">패</a> {{ game.losePitcherName }}</span>
          </div>
          <span class="p-3 text-3xl font-bold">
              {{game.homeTeamScore}}
            </span>
          <div class="flex flex-col items-center text-center text-gray-700 p-10 mt-2">
            <span class="block text-gray-500">{{ game.location }}</span>
            <span class="text-lg font-semibold">{{ game.time.split('T')[1].split(':').slice(0, 2).join(':') }}</span>
            <span v-if="game.statusCode === 'RESULT'">경기 종료</span>
            <span v-if="game.statusCode === 'STARTED'">경기 중</span>
          </div>

          <span class="p-3 text-3xl font-bold">
            {{game.awayTeamScore}}
            </span>
          <div class="flex flex-col items-center space-y-2">
            <img :src="`src/assets/logos/${game.awayTeamCode}.png`" alt="Away Team Emblem" class="h-16 w-16 object-contain" />
            <!--            <span class="font-bold text-xl text-black">{{ game.awayTeam }}</span>-->
            <span v-if="game.winner == 'AWAY'" class="font-bold text-xl text-black"><a class="text-blue-500 text-sm bg-blue-50 p-1 rounded-xl">승</a>  {{ game.winPitcherName }}</span>
            <span v-else class="font-bold text-xl text-gray-500"><a class="text-red-500 text-sm bg-red-50 p-1 rounded-xl">패</a> {{ game.losePitcherName }}</span>
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
import {ref, onMounted, watch} from 'vue'
import axios from 'axios'
import DatePicker from "../components/DatePicker.vue"
import {useDateStore} from "../stores/dateStore.ts"
import router from "../router";
const selectDate = ref()
interface Game {
  id: string;
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
      id: game.gameId,
      time: game.gameDateTime, // Example time, replace with actual data
      location: game.stadium,
      homeTeam: game.homeStarterName,
      losePitcherName : game.losePitcherName,
      winPitcherName : game.winPitcherName,
      awayTeam: game.awayStarterName,
      homeTeamCode: game.homeTeamCode,
      awayTeamCode: game.awayTeamCode,
      awayTeamScore: game.awayTeamScore,
      homeTeamScore: game.homeTeamScore,
      homeTeamEmblemUrl: game.homeTeamEmblemUrl,
      awayTeamEmblemUrl: game.awayTeamEmblemUrl,
      statusCode: game.statusCode,
      statusInfo : game.statusInfo,
      winner: game.winner
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

const navigateToRecord = (gameId : string) => {
  router.push(`/record/${gameId}`);

}

watch(dateStore,async (nv) => {
  selectedDate.value = nv.getDate()
  await fetchGames()
  // const record = await ApiService.getGameRecord(games.value[1].id)
  // console.log(record.data.result.recordData)
})

onMounted(async () => {
  await fetchGames()
});
</script>

<style scoped>
/* Add any styles you need for your component */
</style>

