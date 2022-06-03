<template>
  <div class="flex flex-col justify-center items-center gap-5 mt-10">
    <header class="border-b-4 border-blue-600 w-3/5 pb-4 text-center">
      <h1 class="text-4xl font-bold">Fetch Data from API</h1>
    </header>

    <div class="flex gap-20 justify-center items-center">
      <p class="text-2xl" data-testid="message-value">Message: {{ message }}</p>
    </div>
    <NuxtLink to="/" class="text-lg text-blue-600 underline">
      Return Home
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TheGreeting',
  setup() {
    const { $axios } = useContext();

    const message = useAsync(async () => {
      try {
        const response = await $axios.get<string>(
          'https://api.starter.dev/hello?greeting=from This Dot Labs!'
        )
        return response.data
      } catch {
        return 'Error!'
      }
    }, 'get message')

    return { message }
  },
})
</script>
