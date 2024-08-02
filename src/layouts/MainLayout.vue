<template>
  <div class="bg-gray-800 text-white min-h-screen">
    <nav class="flex items-center justify-between p-4">
      <div class="text-2xl font-bold">KboZino</div>
      <div class="hidden md:flex space-x-4">
        <router-link to="/" class="hover:text-gray-400">Home</router-link>
        <div v-if="user" class="relative">
          <button @click="toggleUserMenu" class="hover:text-gray-400">{{ userProfile.full_name || user.email.split('@')[0] }}</button>
          <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
            <a @click="signOut" class="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">Logout</a>
          </div>
        </div>
        <router-link v-else to="/sign" class="hover:text-gray-400">로그인</router-link>
      </div>
      <div class="md:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
    <transition name="slide">
      <div v-if="isMenuOpen" class="fixed inset-0 bg-gray-900 bg-opacity-75">
        <div class="fixed top-0 left-0 w-64 h-full bg-gray-800">
          <button @click="toggleMenu" class="absolute top-4 right-4 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <router-link @click="toggleMenu" to="/" class="block px-4 py-2 hover:bg-gray-700">Home</router-link>
          <router-link v-if="!user" @click="toggleMenu" to="/sign" class="block px-4 py-2 hover:bg-gray-700">로그인</router-link>
          <div v-if="user">
            <button @click="toggleUserMenu" class="block px-4 py-2 hover:bg-gray-700 w-full text-left">{{ userProfile.full_name || user.email.split('@')[0] }}</button>
            <a @click="signOut" class="block px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">Logout</a>
          </div>
        </div>
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../util/supabase.ts';

const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
const user = ref();
const userProfile = ref({ full_name: '' });

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const getUser = async () => {
  const { data: { user: supabaseUser } } = await supabase.auth.getUser();
  user.value = supabaseUser;
  if (supabaseUser) {
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('email', supabaseUser.email)
        .single();
    userProfile.value = profile || { full_name: '' };
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert('Error signing out: ' + error.message);
  } else {
    user.value = null;
    userProfile.value = { full_name: '' };
    isUserMenuOpen.value = false;
  }
};

onMounted(() => {
  supabase.auth.onAuthStateChange((event: any, session) => {
    if (session?.user) {
      user.value = session.user;
      getUser();
    } else {
      user.value = null;
      userProfile.value = { full_name: '' };
    }
  });
});
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
