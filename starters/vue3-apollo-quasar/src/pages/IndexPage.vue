<template>
  <q-page class="row items-center justify-evenly">
    <div class="text-center">
      <p>
        <router-link class="text-primary" to="/counter">
          See example Counter component
        </router-link>
      </p>
      <p>
        <router-link class="text-primary" to="/api-example">
          See example API component
        </router-link>
      </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>
