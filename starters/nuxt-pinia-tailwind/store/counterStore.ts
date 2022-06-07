import { defineStore } from 'pinia'

export interface ICounterRootState {
  counter: number
}

export const useCounterStore = defineStore('counterStore', {
  state: (): ICounterRootState => ({
    counter: 0,
  }),
})
