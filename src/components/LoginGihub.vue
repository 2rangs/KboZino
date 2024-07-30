<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4">Login with GitHub</h1>
      <div v-if="!user">
        <button @click="signInWithGitHub" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign In with GitHub
        </button>
      </div>
      <div v-else>
        <p class="text-xl">Welcome, {{ user.email }}</p>
        <button @click="signOut" class="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700">
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../util/supabase';

const user = ref<any>(null);

const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:8080'
    }
  });
  if (error) {
    console.error('Error logging in with GitHub:', error);
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  } else {
    user.value = null;
    localStorage.removeItem('supabase.auth.token');
  }
};

const checkUser = async () => {
  const session = supabase.auth.session();
  user.value = session?.user ?? null;
};

onMounted(async () => {
  const session = localStorage.getItem('supabase.auth.token');
  if (session) {
    const parsedSession = JSON.parse(session);
    supabase.auth.setSession(parsedSession.access_token);
    user.value = parsedSession.user;
  } else {
    checkUser();
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      localStorage.setItem('supabase.auth.token', JSON.stringify(session));
      user.value = session.user;
    } else {
      localStorage.removeItem('supabase.auth.token');
      user.value = null;
    }
  });
});
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>
