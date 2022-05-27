<template>
  <div class="flex flex-col justify-center items-center mt-10">
    <header class="bg-blue-400 w-3/5 p-2 text-center rounded mb-5">
      <h1 class="text-4xl font-bold text-white">
        Nuxt, Pinia and TailwindCSS Starter kit
      </h1>
    </header>

    <NuxtLink to="/counter" class="text-lg text-blue-600 underline">
      See Counter example component
    </NuxtLink>

    <NuxtLink to="/api-example" class="text-lg text-blue-600 underline">
      See Fetch API example component
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
