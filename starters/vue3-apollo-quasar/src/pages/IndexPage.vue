<template>
  <q-page class="row items-center justify-start column main">
    <p class="examples">
      <router-link to="/counter">See Counter example component</router-link>
    </p>

    <p class="examples">
      <router-link to="/api-example"
        >See Apollo GraphQL example component</router-link
      >
    </p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>


<style lang="scss" scoped>
main {
  min-height: unset!important;
  margin-top: 2rem;
  .examples {
    margin: 0 0 .5rem;
  }
}
</style>
