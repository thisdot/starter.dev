import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  })
})