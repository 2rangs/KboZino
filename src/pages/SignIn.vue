<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-extrabold">Sign in to your account</h2>
      <button
          @click="signInWithGitHub"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        Sign in with GitHub
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../util/supabase.ts'

const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
  if (error) {
    alert('Error signing in with GitHub: ' + error.message)
  } else {
    alert('Redirecting to GitHub for authentication...')
  }
}
</script>

<style scoped>
/* Add any additional styles you need for your component */
</style>
