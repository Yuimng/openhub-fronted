import { defineStore } from 'pinia'
import { store } from '@/store'
import { IMainState } from './type'
import { getMomentList, getMomentListByUserId } from '@/service/main'

export const useMainStore = defineStore({
  id: 'main',
  state: (): IMainState => ({
    MomentList: [],
    MomentUserList: []
  }),
  getters: {},
  actions: {
    /**
     *
     * @description 获取动态列表数据
     */
    async getMomentListAction(offset: number, size: number) {
      // 获取数据
      const result = await getMomentList(offset, size)
      if (result.code == 200) {
        const tempArr = result.data
        for (const item of tempArr) {
          this.MomentList.push(item)
        }
      }
    },
    /**
     *
     * @description 获取个人动态列表数据
     */
    async getMomentUserListAction(
      userId: number,
      offset: number,
      size: number
    ) {
      // 获取数据
      const result = await getMomentListByUserId(userId, offset, size)
      if (result.code == 200) {
        const tempArr = result.data.momentUserList
        for (const item of tempArr) {
          this.MomentUserList.push(item)
        }
      }
    },
    clearList() {
      this.MomentList = []
      this.MomentUserList = []
    }
  }
})

export function useMainStoreWithOut() {
  return useMainStore(store)
}
