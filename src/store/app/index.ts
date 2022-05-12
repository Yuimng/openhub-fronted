import { defineStore } from 'pinia'
import { store } from '@/store'
import { IAppState } from './type'

export const useAppStore = defineStore({
  id: 'app',
  state: (): IAppState => ({
    counter: 20
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
