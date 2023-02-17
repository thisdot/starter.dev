<script setup lang="ts"></script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  width: 9.5rem;
  background: var(--lightBlue);
  color: var(--white);
  font-weight: bold;
  font-size: 1.05rem;
  padding: 1% 2%;
  border-radius: 3px;
  border-color: var(--lightBlue);
}
</style>
