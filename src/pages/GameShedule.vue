<template>
  <div class="mx-auto p-6 bg-gray-900">
    <date-picker v-model="selectDate" />
    <div v-if="games.length > 0" class="shadow-lg rounded-lg overflow-hidden w-full mx-auto mt-6 md:w-4/5 lg:w-2/4 bg-gray-900">
      <div
          v-for="game in games"
          :key="game.id"
          class="flex flex-col p-2 md:p-3 border-b last:border-b-0 bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer"
          @click="game.statusCode === 'RESULT' || game.statusCode === 'STARTED' ? navigateToRecord(game.id) : null"
      >
        <div class="flex items-center justify-between w-full p-10">

          <div class="flex flex-col items-center mx-2 md:mx-4">
            <img
                :src="`src/assets/logos/${game.awayTeamCode}.png`"
                alt="Away Team Emblem"
                class="h-12 w-12 md:h-16 md:w-16 object-contain"
            />
            <span  v-if="game.statusCode !== 'RESULT'" class="p-3 font-bold text-sm md:text-lg text-white">{{ game.awayTeam }}</span>
            <div v-if="game.statusCode === 'RESULT'" class="flex items-center space-x-1 mt-1">
              <span v-if="game.winner === 'AWAY'" class="badge bg-blue-900 text-blue-300 rounded p-1 text-xs md:text-sm">승</span>
              <span v-else class="badge bg-red-900 text-red-300 rounded p-1 text-xs md:text-sm">패</span>
              <span class="text-xs md:text-sm p-1 text-white">{{ game.winner === 'AWAY' ? game.winPitcherName : game.losePitcherName }}</span>
            </div>
          </div>

          <span class="mx-2 md:mx-4 text-lg md:text-2xl font-bold text-gray-300">{{ game.awayTeamScore }}</span>

          <div class="flex flex-col items-center text-center text-gray-300 mx-2 md:mx-4">
            <span class="block text-gray-500 text-xs md:text-sm">{{ game.location }}</span>
            <span class="text-md font-semibold text-gray-300">
          {{ game.time.split('T')[1].split(':').slice(0, 2).join(':') }}
        </span>
            <span v-if="game.statusInfo === '경기취소'" class="text-xs md:text-sm text-gray-400">경기 취소</span>
            <span v-if="game.statusCode === 'BEFORE' && game.statusInfo != '경기취소'" class="text-xs md:text-sm text-gray-400">경기 전</span>
            <span v-if="game.statusCode === 'READY'" class="text-xs md:text-sm text-gray-400">경기 준비</span>
            <span v-if="game.statusCode === 'RESULT'" class="text-xs md:text-sm text-gray-400">경기 종료</span>
            <span v-if="game.statusCode === 'STARTED'" class="text-xs md:text-sm text-gray-400">경기 중</span>
          </div>

          <span class="mx-2 md:mx-4 text-lg md:text-2xl font-bold text-gray-300">{{ game.homeTeamScore }}</span>

          <div class="flex flex-col items-center mx-2 md:mx-4">
            <img
                :src="`src/assets/logos/${game.homeTeamCode}.png`"
                alt="Home Team Emblem"
                class="h-12 w-12 md:h-16 md:w-16 object-contain"
            />
            <span v-if="game.statusCode !== 'RESULT'" class="p-3 font-bold text-sm md:text-lg text-white">{{ game.homeTeam }}</span>
            <div v-if="game.statusCode === 'RESULT'" class="flex items-center space-x-1 mt-1">
              <span v-if="game.winner === 'HOME'" class="badge bg-blue-900 text-blue-300 rounded p-1 text-xs md:text-sm">승</span>
              <span v-else class="badge bg-red-900 text-red-300 rounded p-1 text-xs md:text-sm">패</span>
              <span class="text-xs md:text-sm p-1 text-white">{{ game.winner === 'HOME' ? game.winPitcherName : game.losePitcherName }}</span>
            </div>
          </div>
        </div>

        <div v-if="game.statusCode === 'BEFORE' && game.statusInfo !== '경기취소'" class="mt-4 w-full text-center">
<!--         <GameBetting :game-id="game.id" />-->
        </div>
      </div>
    </div>


    <div v-else class="text-center">
      <img class="p-10 w-52 block m-auto" src="/src/assets/images/nodata.svg" />
      <span class="block text-xl md:text-2xl p-15 font-bold text-white">
        해당 날짜는 경기가 없습니다.
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import DatePicker from '../components/DatePicker.vue'
import { useDateStore } from '../stores/dateStore.ts'
import router from '../router'
import GameBetting from "../components/GameBetting.vue";
import {supabase} from "../util/supabase.ts";

interface Game {
  id: string
  time: string
  location: string
  homeTeam: string
  awayTeam: string
  homeTeamCode: string
  awayTeamCode: string
  homeTeamEmblemUrl: string
  awayTeamEmblemUrl: string
  statusCode: string
  statusInfo: string
  homeTeamScore: number
  awayTeamScore: number
  winner: string
  winPitcherName: string
  losePitcherName: string
}

const selectDate = ref<Date | null>(null)
const dateStore = useDateStore()
const games = ref<Game[]>([])
const loading = ref(true)
const date = new Date()

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const selectedDate = ref<string>(formatDate(date))

const fetchGames = async (): Promise<void> => {
  try {
    const response = await axios.get('/api/schedule/games', {
      params: {
        fields:
            'basic,superCategoryId,categoryName,stadium,statusNum,gameOnAir,hasVideo,title,specialMatchInfo,roundCode,seriesOutcome,seriesGameNo,homeStarterName,awayStarterName,winPitcherName,losePitcherName,homeCurrentPitcherName,awayCurrentPitcherName,broadChannel,homeTeamEmblemUrl,awayTeamEmblemUrl',
        upperCategoryId: 'kbaseball',
        fromDate: selectedDate.value,
        toDate: selectedDate.value,
        size: 500,
      },
    })
    games.value = response.data.result.games.map((game: any) => ({
      id: game.gameId,
      time: game.gameDateTime,
      location: game.stadium,
      homeTeam: game.homeStarterName,
      losePitcherName: game.losePitcherName,
      winPitcherName: game.winPitcherName,
      awayTeam: game.awayStarterName,
      homeTeamCode: game.homeTeamCode,
      awayTeamCode: game.awayTeamCode,
      awayTeamScore: game.awayTeamScore,
      homeTeamScore: game.homeTeamScore,
      homeTeamEmblemUrl: game.homeTeamEmblemUrl,
      awayTeamEmblemUrl: game.awayTeamEmblemUrl,
      statusCode: game.statusCode,
      statusInfo: game.statusInfo,
      winner: game.winner,
    }))
    await  addNewGames(games.value)

    if (games.value.length > 5) {
      games.value.splice(0, 1)
    }
  } catch (error) {
    console.error('Error fetching games:', error)
  } finally {
    loading.value = false
  }
}


const addNewGames = async (games : any) => {
  for (const game of games) {
    const { data, error } = await supabase
        .from('betting')
        .select('game_id')
        .eq('game_id', game.id)

    if (error) {
      continue
    }
    if (data.length === 0) {
      const { error: insertError } = await supabase
          .from('betting')
          .insert([
            {
              game_id: game.id
            }
          ])

      if (insertError) {
        console.error('Error inserting data:', insertError)
      } else {
        console.log(`Game ${game.id} inserted successfully.`)
      }
    }
  }
}


const navigateToRecord = (gameId: string): void => {
  router.push(`/record/${gameId}`)
}

watch(
    dateStore,
    async (nv) => {
      selectedDate.value = nv.getDate()
      await fetchGames()
    },
    { immediate: true }
)

onMounted(async () => {
  selectedDate.value = formatDate(date)
})
</script>

<style scoped>
/* Add any styles you need for your component */
</style>
