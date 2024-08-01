<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-extrabold">Sign up for an account</h2>
      <form @submit.prevent="signUp">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                v-model="password"
            />
          </div>
        </div>

        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          >
            Sign up
          </button>
        </div>
      </form>
      <div class="text-sm text-center">
        <router-link to="/signin" class="font-medium text-indigo-600 hover:text-indigo-500">Already have an account? Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../util/supabase.ts';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const signUp = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    alert('Error signing up: ' + error.message);
  } else {
    alert('Successfully signed up!');
    router.push('/signin');
  }
};
</script>

<style scoped>
/* Add any additional styles you need for your component */
</style>
