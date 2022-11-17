<template>
    <div class="flex flex-col justify-center items-center mt-5 gap-2">
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
      <v-btn variant="outlined">
        Button
      </v-btn>
    </div>
</template>
  