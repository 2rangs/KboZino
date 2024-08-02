<!-- /recovery.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-extrabold">KboZino</h2>
      <form @submit.prevent="sendResetEmail">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">이메일 주소</label>
            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="이메일 주소"
                v-model="email"
            />
          </div>
        </div>

        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          >
            비밀번호 재설정 이메일 보내기
          </button>
        </div>
      </form>
      <div class="text-sm text-center">
        <router-link to="/sign" class="font-medium text-indigo-600 hover:text-indigo-500">로그인 페이지로 돌아가기</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../util/supabase.ts';

const email = ref('');

const sendResetEmail = async () => {
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/reset`
  });
  if (error) {
    console.error('비밀번호 재설정 이메일 전송 중 오류 발생:', error);
    alert('비밀번호 재설정 이메일 전송 중 오류 발생: ' + error.message);
  } else {
    alert('비밀번호 재설정 이메일이 전송되었습니다!');
  }
};
</script>

<style scoped>
/* 컴포넌트에 필요한 추가 스타일을 여기에 추가하세요 */
</style>
