<template>
  <div v-if="record" class="p-6 flex justify-center items-center bg-gray-900 min-h-screen">
    <div class="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-2xl">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold mb-4 text-white">{{ record.gameInfo.hName }} vs {{ record.gameInfo.aName }} {{ record.gameInfo.round }} 차전</h1>
        <div class="flex flex-col-3 justify-between items-center text-white w-4/5 m-auto">
          <div class="text-left flex flex-col items-center mb-4 md:mb-0">
            <img id="emblem" :src="`/src/assets/emblem/${record.gameInfo.aCode}.png`" class="w-20 h-20 object-contain"/>
            <div class="font-bold text-lg mt-2">{{ record.gameInfo.aFullName }}</div>
            <div class="text-4xl font-bold">{{ record.scoreBoard.rheb.away.r }}</div>
          </div>
          <div class="text-center mb-4 md:mb-0">
            <div class="text-xl font-semibold">{{ record.gameInfo.gdate }}</div>
            <div class="text-gray-400">{{ record.gameInfo.stadium }}</div>
            <div class="text-gray-400">{{ record.gameInfo.gtime }}</div>
          </div>
          <div class="text-right flex flex-col items-center mb-4 md:mb-0">
            <img id="emblem" :src="`/src/assets/emblem/${record.gameInfo.hCode}.png`" class="w-20 h-20 object-contain"/>
            <div class="font-bold text-lg mt-2">{{ record.gameInfo.hFullName }}</div>
            <div class="text-4xl font-bold">{{ record.scoreBoard.rheb.home.r }}</div>
          </div>
        </div>
        <div class="mt-4 bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div class="flex justify-center bg-gray-900 text-center text-sm font-semibold p-2 text-white">
            <div class="w-16">팀 명</div>
            <div class="flex-1 grid grid-cols-9">
              <div v-for="inning in 9" :key="inning" class="col-span-1">{{ inning }}</div>
            </div>
            <div class="w-16">R</div>
            <div class="w-16">H</div>
            <div class="w-16">E</div>
          </div>
          <div class="flex justify-center text-center p-2">
            <div class="w-16 font-bold text-white">{{ record.gameInfo.aName }}</div>
            <div class="flex-1 grid grid-cols-9">
              <div v-for="(score, index) in record.scoreBoard.inn.away" :key="index" class="col-span-1 text-white">{{ score }}</div>
            </div>
            <div class="w-16 font-bold text-white">{{ record.scoreBoard.rheb.away.r }}</div>
            <div class="w-16 font-bold text-white">{{ record.scoreBoard.rheb.away.h }}</div>
            <div class="w-16 font-bold text-white">{{ record.scoreBoard.rheb.away.e }}</div>
          </div>
          <div class="flex justify-center text-center bg-gray-800 p-2">
            <div class="w-16 font-bold text-white">{{ record.gameInfo.hName }}</div>
            <div class="flex-1 grid grid-cols-9">
              <div v-for="(score, index) in record.scoreBoard.inn.home" :key="index" class="col-span-1 text-white">{{ score }}</div>
            </div>
            <div class="w-16 font-bold text-white">{{ record.scoreBoard.rheb.home.r }}</div>
            <div class="w-16 font-bold text-white">{{ record.scoreBoard.rheb.home.h }}</div>
            <div class="w-16 font-bold text-white">{{ record.scoreBoard.rheb.home.e }}</div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4 text-white">최근 게임 & 투수</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 class="font-semibold mb-2 text-white">{{ record.gameInfo.aFullName }} 최근 게임</h3>
            <ul class="list-disc pl-5 text-gray-300">
              <li v-for="(game, index) in record.recentVsGames" :key="index" class="mb-2">
                {{ game.gdate }}: {{ game.aName }} {{ game.aScore }} - {{ game.hName }} {{ game.hScore }}
              </li>
            </ul>
          </div>
          <div class="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 class="font-semibold mb-2 text-white">{{ record.gameInfo.hFullName }} 최근 게임</h3>
            <ul class="list-disc pl-5 text-gray-300">
              <li v-for="(game, index) in record.recentVsGames" :key="index" class="mb-2">
                {{ game.gdate }}: {{ game.aName }} {{ game.aScore }} - {{ game.hName }} {{ game.hScore }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-4 p-4 bg-gray-700 rounded-lg shadow-md">
          <div class="flex justify-between items-center w-8/12 m-auto">
            <div class="text-center">
              <img :src="`/image/${record.pitchingResult[0].pCode}.jpg`" class="w-16 h-16 rounded-full shadow-md"/>
              <div class="font-semibold text-gray-300 p-1 pt-2">{{ record.pitchingResult[0].name }}</div>
              <div class="text-white font-bold">{{ record.pitchingResult[0].w }}W - {{ record.pitchingResult[0].l }}L</div>
            </div>
            <div class="text-center font-extrabold text-2xl text-white">VS</div>
            <div class="text-center">
              <img :src="`/image/${record.pitchingResult[1].pCode}.jpg`" class="w-16 h-16 rounded-full shadow-md"/>
              <div class="font-semibold text-gray-300 p-1 pt-2">{{ record.pitchingResult[1].name }}</div>
              <div class="text-white font-bold">{{ record.pitchingResult[1].w }}W - {{ record.pitchingResult[1].l }}L</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-2xl font-bold text-white mb-4">주요 스탯</h2>
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div class="flex-1 bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-center text-white">{{ record.gameInfo.aFullName }}</h3>
            <div class="flex justify-around items-center mt-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.away.kk }}</div>
                <div class="text-sm text-gray-400">삼진</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.away.hit }}</div>
                <div class="text-sm text-gray-400">안타</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.away.err }}</div>
                <div class="text-sm text-gray-400">실책</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.away.hr }}</div>
                <div class="text-sm text-gray-400">홈런</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.away.sb }}</div>
                <div class="text-sm text-gray-400">도루</div>
              </div>
            </div>
          </div>
          <div class="flex-1 bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-center text-white">{{ record.gameInfo.hFullName }}</h3>
            <div class="flex justify-around items-center mt-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.home.kk }}</div>
                <div class="text-sm text-gray-400">삼진</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.home.hit }}</div>
                <div class="text-sm text-gray-400">안타</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.home.err }}</div>
                <div class="text-sm text-gray-400">실책</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.home.hr }}</div>
                <div class="text-sm text-gray-400">홈런</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">{{ record.todayKeyStats.home.sb }}</div>
                <div class="text-sm text-gray-400">도루</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-2xl font-bold text-white mb-4">주요 기록</h2>
        <div class="bg-gray-700 p-6 rounded-lg shadow-lg">
          <ul class="space-y-4">
            <li v-for="(recordItem, index) in record.etcRecords" :key="index" class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.172l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-sm">
                <p class="font-semibold text-white">{{ recordItem.result }}</p>
                <p class="text-gray-400">({{ recordItem.how }})</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="text-white flex w-full m-auto">
        <div v-for="game in record.games" class="m-auto flex-col p-2">
          <div class="shadow-lg rounded-lg overflow-hidden m-2">
            <div class="p-4">
              <h2 class="text-xl font-bold">{{ game.aName }} vs {{game.hName}}</h2>
            </div>
            <div class="p-4 bg-gray-700 text-gray-50 text-center text-xl font-bold cursor-pointer" @click="navigateToRecord(game.gameId)">
              <span>
                {{game.score.aScore}} : {{game.score.hScore}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { ApiService } from "../api";
import { useRoute } from "vue-router";
import router from "../router";

interface GameInfo {
  aCode: string;
  hCode: string;
  aFullName: string;
  hFullName: string;
  gdate: string;
  gtime: string;
  stadium: string;
  aName: string;
  hName: string;
}

interface ScoreBoard {
  rheb: {
    away: { r: number; h: number; e: number };
    home: { r: number; h: number; e: number };
  };
  inn: {
    away: number[];
    home: number[];
  };
}

interface RecentVsGame {
  gdate: string;
  aName: string;
  hName: string;
  aScore: number;
  hScore: number;
}

interface PitchingResult {
  name: string;
  w: number;
  l: number;
}

interface KeyStats {
  kk: number;
  hit: number;
  err: number;
  hr: number;
  sb: number;
}

interface EtcRecord {
  result: string;
  how: string;
}

interface RecordData {
  gameInfo: GameInfo;
  scoreBoard: ScoreBoard;
  recentVsGames: RecentVsGame[];
  pitchingResult: PitchingResult[];
  todayKeyStats: {
    home: KeyStats;
    away: KeyStats;
  };
  etcRecords: EtcRecord[];
}

const route = useRoute();
const record = ref<RecordData | null>(null);

const navigateToRecord = (gameId: string): void => {
  router.push(`/record/${gameId}`)
}

const fetchRecord = async (gameId : string) => {
  const response = await ApiService.getGameRecord(gameId as string);
  record.value = response.data.result.recordData;
}

watch(route,async (nv) => {
  await fetchRecord(nv.params.id as string)
})
onMounted(async () => {
  await fetchRecord(route.params.id as string)
});
</script>

<style scoped>
#emblem {
  max-width: 100px;
  width: 80%;
  padding: 3px;
}
</style>
