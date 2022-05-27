<template>
  <div :class="styles.container">
    <header :class="styles.header">
      <h1 :class="styles.h1Header">Fetch Data from API</h1>
    </header>

    <div :class="styles.messageContainer">
      <p :class="styles.paragraph" data-testid="message-value">Message: {{ message }}</p>
    </div>
    <NuxtLink to="/" :class="styles.link">
      Return Home
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import * as styles from './TheGreeting.classNames';

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

    return { message, styles }
  },
})
</script>
