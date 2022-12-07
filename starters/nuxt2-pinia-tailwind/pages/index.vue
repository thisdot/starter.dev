<template>
  <div class="flex flex-col justify-center items-center mt-5 gap-2">
    <header class="bg-blue-600 w-3/5 p-4 text-center rounded mb-5">
      <h1 class="text-2xl font-bold text-white">
        Nuxt 2, Pinia and TailwindCSS Starter kit
      </h1>
    </header>

    <NuxtLink
      to="/counter"
      class="text-lg text-blue-600 underline hover:text-blue-400"
    >
      See Counter example component
    </NuxtLink>

    <NuxtLink
      to="/api-example"
      class="text-lg text-blue-600 underline hover:text-blue-400"
    >
      See Fetch API example component
    </NuxtLink>
    <div class="flex justify-center">
      <a href="https://www.netlify.com">
        <img
          src="https://www.netlify.com/v3/img/components/netlify-light.svg"
          alt="Deploys by Netlify"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
});
</script>
