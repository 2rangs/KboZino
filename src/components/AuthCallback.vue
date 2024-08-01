<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold">Processing authentication...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '../util/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true })
  if (error) {
    alert('Error processing authentication: ' + error.message)
  } else {
    router.push('/') // Redirect to your main page after successful authentication
  }
})
</script>

<style scoped>
/* Add any additional styles you need for your component */
</style>
