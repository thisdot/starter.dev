<script setup lang="ts"></script>

<template>
  <main>
    <div class="title">
      <h1>Vue 3 + XState + CSS</h1>
    </div>
    <div class="links">
      <RouterLink to="/counter">See button example component</RouterLink>
      <RouterLink to="/fetch">See data fetching example component</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.title {
  width: 80%;
  padding: 1% 2%;
  margin: 0 auto 5%;
  border-radius: 4px;
  background: var(--lightBlue);
}

h1 {
  color: var(--white);
  text-align: center;
}

.links {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
}
</style>
