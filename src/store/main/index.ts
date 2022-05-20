import { defineStore } from 'pinia'
import { store } from '@/store'
import { IMainState } from './type'
import { getMomentList } from '@/service/main'

export const useMainStore = defineStore({
  id: 'main',
  state: (): IMainState => ({
    MomentList: []
  }),
  getters: {},
  actions: {
    /**
     *
     * @description 账号登录
     */
    async getMomentListAction(offset: number): Promise<boolean> {
      // 获取数据
      const momentResult = await getMomentList(offset)
      if (momentResult.code == 200) {
        if (momentResult.data.length !== 0) {
          // 注意数组数据要扁平化处理
          this.MomentList.push(momentResult.data)
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
})

export function useMainStoreWithOut() {
  return useMainStore(store)
}
