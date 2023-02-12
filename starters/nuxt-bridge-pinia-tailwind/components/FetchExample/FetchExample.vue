<template>
  <div
    class="flex flex-col justify-center items-center gap-5 mt-10 w-3/5 mx-auto"
  >
    <header class="border-b-4 border-blue-600 w-3/5 pb-4 text-center">
      <h1 class="text-4xl font-bold">Fetch Data from API</h1>
    </header>

    <div class="flex gap-4 justify-center items-center text-2xl">
      <p>Message:</p>
      <p
        :class="{
          'grow-0': data,
          'grow animate-pulse bg-gray-200 rounded-md w-40 h-6': !data,
        }"
        :data-testid="data ? 'message-value' : 'message-skeleton'"
      >
        {{ data }}
      </p>
    </div>
    <NuxtLink
      to="/"
      class="text-lg text-blue-600 underline hover:text-blue-400"
    >
      Return Home
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { useLazyAsyncData } from '#imports'

export default {
  name: 'FetchExample',
  setup() {
    const encodedMessage = encodeURIComponent('from this Dot Labs!')

    const { data, error } = useLazyAsyncData<string>('message', () =>
      $fetch(
        `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`
      )
    )

    if (error.value) {
      data.value = 'Error fetching data'
    }

    return { data }
  },
}
</script>
