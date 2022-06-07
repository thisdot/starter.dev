<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn icon="home" flat to="/"></q-btn>
        <q-toolbar-title class="text-center"
          >{{ PRODUCT_NAME }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<script lang="ts" setup>
import { useMeta } from 'quasar';
import { inject } from 'vue';

const PRODUCT_NAME = inject('PRODUCT_NAME') as string;
useMeta({
  title: PRODUCT_NAME,
});
</script>

<style lang="scss">
.page-container {
  height: 100%;
  padding: 2rem;
  max-width: 50rem;
  margin: auto;
}
</style>
