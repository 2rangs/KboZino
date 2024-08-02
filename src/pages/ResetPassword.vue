<!-- /reset.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-extrabold">새 비밀번호 설정</h2>
      <form @submit.prevent="updatePassword">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="new-password" class="sr-only">새 비밀번호</label>
            <input
                id="new-password"
                name="new-password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="새 비밀번호"
                v-model="newPassword"
            />
          </div>
        </div>

        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          >
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../util/supabase.ts';
import { useRouter, useRoute } from 'vue-router';

const newPassword = ref('');
const router = useRouter();
const route = useRoute();
const isPasswordRecovery = ref(false);

onMounted(() => {
  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      isPasswordRecovery.value = true;
    }
  });

  // Check for access token in URL query parameters
  const accessToken = route.query.access_token;
  if (accessToken) {
    isPasswordRecovery.value = true;
    supabase.auth.setSession({ access_token: accessToken });
  }
});

const updatePassword = async () => {
  if (!isPasswordRecovery.value) {
    alert('비밀번호 재설정 링크를 통해 접근해 주세요.');
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword.value
  });
  if (error) {
    console.error('비밀번호 변경 중 오류 발생:', error);
    alert('비밀번호 변경 중 오류 발생: ' + error.message);
  } else {
    alert('비밀번호가 성공적으로 변경되었습니다!');
    router.push('/sign');
  }
};
</script>

<style scoped>
/* 컴포넌트에 필요한 추가 스타일을 여기에 추가하세요 */
</style>
