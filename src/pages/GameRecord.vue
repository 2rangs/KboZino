<template>
  <div v-if="record" class="p-6 flex justify-center items-center">
    <div class="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold mb-4 text-gray-800">{{ record.gameInfo.hName }} vs {{ record.gameInfo.aName }} {{ record.gameInfo.round }} 차전</h1>

        <div class="flex justify-between items-center text-gray-800">
          <div class="text-left flex flex-col items-center">
            <img id="emblem" :src="`/src/assets/emblem/${record.gameInfo.aCode}.png`" />
            <div class="font-bold text-lg">{{ record.gameInfo.aFullName }}</div>
            <div class="text-4xl font-bold">{{ record.scoreBoard.rheb.away.r }}</div>
          </div>
          <div class="text-center">
            <div class="text-xl">{{ record.gameInfo.gdate}}</div>
            <div class="text-gray-600">{{ record.gameInfo.stadium }}</div>
            <div class="text-gray-600">{{ record.gameInfo.gtime }}</div>
          </div>
          <div class="text-right flex flex-col items-center">
            <img id="emblem" :src="`/src/assets/emblem/${record.gameInfo.hCode}.png`" />
            <div class="font-bold text-lg">{{ record.gameInfo.hFullName }}</div>
            <div class="text-4xl font-bold">{{ record.scoreBoard.rheb.home.r }}</div>
          </div>
        </div>
        <div class="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
          <div class="flex justify-center bg-gray-200 text-center text-sm font-semibold p-2">
            <div class="w-16">팀 명</div>
            <div class="flex-1 grid grid-cols-9">
              <div v-for="inning in 9" :key="inning" class="col-span-1">{{ inning }}</div>
            </div>
            <div class="w-16">R</div>
            <div class="w-16">H</div>
            <div class="w-16">E</div>
          </div>
          <div class="flex justify-center text-center p-2">
            <div class="w-16 font-bold">{{ record.gameInfo.aName }}</div>
            <div class="flex-1 grid grid-cols-9">
              <div v-for="(score, index) in record.scoreBoard.inn.away" :key="index" class="col-span-1">{{ score }}</div>
            </div>
            <div class="w-16 font-bold">{{ record.scoreBoard.rheb.away.r }}</div>
            <div class="w-16 font-bold">{{ record.scoreBoard.rheb.away.h }}</div>
            <div class="w-16 font-bold">{{ record.scoreBoard.rheb.away.e }}</div>
          </div>
          <div class="flex justify-center text-center bg-gray-50 p-2">
            <div class="w-16 font-bold">{{ record.gameInfo.hName }}</div>
            <div class="flex-1 grid grid-cols-9">
              <div v-for="(score, index) in record.scoreBoard.inn.home" :key="index" class="col-span-1">{{ score }}</div>
            </div>
            <div class="w-16 font-bold">{{ record.scoreBoard.rheb.home.r }}</div>
            <div class="w-16 font-bold">{{ record.scoreBoard.rheb.home.h }}</div>
            <div class="w-16 font-bold">{{ record.scoreBoard.rheb.home.e }}</div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">최근 게임 & 투수</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 class="font-semibold mb-2 text-gray-700">{{ record.gameInfo.aFullName }} 최근 게임</h3>
            <ul class="list-disc pl-5 text-gray-600">
              <li v-for="(game, index) in record.recentVsGames" :key="index" class="mb-2">
                {{ game.gdate }}: {{ game.aName }} {{ game.aScore }} - {{ game.hName }} {{ game.hScore }}
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 class="font-semibold mb-2 text-gray-700">{{ record.gameInfo.hFullName }} 최근 게임</h3>
            <ul class="list-disc pl-5 text-gray-600">
              <li v-for="(game, index) in record.recentVsGames" :key="index" class="mb-2">
                {{ game.gdate }}: {{ game.aName }} {{ game.aScore }} - {{ game.hName }} {{ game.hScore }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <div class="flex justify-between items-center">
            <div class="text-center">
              <div class="font-semibold text-gray-700">{{ record.pitchingResult[0].name }}</div>
              <div class="text-gray-600">{{ record.pitchingResult[0].w }}W - {{ record.pitchingResult[0].l }}L</div>
            </div>
            <div class="text-center font-bold text-2xl text-gray-700">VS</div>
            <div class="text-center">
              <div class="font-semibold text-gray-700">{{ record.pitchingResult[1].name }}</div>
              <div class="text-gray-600">{{ record.pitchingResult[1].w }}W - {{ record.pitchingResult[1].l }}L</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800">주요 스탯</h2>
        <div class="flex space-x-4 mt-4">
          <div class="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 class="font-semibold text-center text-gray-700">홈</h3>
            <ul class="list-disc ml-5 text-gray-600">
              <li>Strikeouts: {{ record.todayKeyStats.home.kk }}</li>
              <li>Hits: {{ record.todayKeyStats.home.hit }}</li>
              <li>Errors: {{ record.todayKeyStats.home.err }}</li>
              <li>Home Runs: {{ record.todayKeyStats.home.hr }}</li>
              <li>Stolen Bases: {{ record.todayKeyStats.home.sb }}</li>
            </ul>
          </div>
          <div class="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 class="font-semibold text-center text-gray-700">원정</h3>
            <ul class="list-disc ml-5 text-gray-600">
              <li>Strikeouts: {{ record.todayKeyStats.away.kk }}</li>
              <li>Hits: {{ record.todayKeyStats.away.hit }}</li>
              <li>Errors: {{ record.todayKeyStats.away.err }}</li>
              <li>Home Runs: {{ record.todayKeyStats.away.hr }}</li>
              <li>Stolen Bases: {{ record.todayKeyStats.away.sb }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800">주요 기록</h2>
        <ul class="list-disc ml-5 mt-4 bg-gray-100 p-4 rounded-lg shadow-md text-gray-600">
          <li v-for="(recordItem, index) in record.etcRecords" :key="index">
            {{ recordItem.result }} ({{ recordItem.how }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ApiService } from "../api";
import { useRoute } from "vue-router";

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
onMounted(async () => {
  const response = await ApiService.getGameRecord(route.params.id as string);
  record.value = response.data.result.recordData;
  console.log(record.value);
});
</script>

<style scoped>
#emblem {
  max-width: 100px;
  width: 80%;
  padding: 3px;
}
</style>
