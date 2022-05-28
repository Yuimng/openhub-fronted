import { defineStore } from 'pinia'
import { store } from '@/store'
import { IMainState } from './type'
import {
  getMomentList,
  getMomentListByUserId,
  getMomentDetail
} from '@/service/main'

export const useMainStore = defineStore({
  id: 'main',
  state: (): IMainState => ({
    MomentList: [],
    MomentUserList: [],
    MomentUserCount: 0,
    MomentDetailArray: []
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
    /**
     *
     * @description 获取个人动态数量
     */
    async getMomentUserCountAction(userId: number) {
      // 获取数据
      const result = await getMomentListByUserId(userId, 0, 0)
      if (result.code == 200) {
        this.MomentUserCount = result.data.momentUserCount
      }
    },
    /**
     *
     * @description 清除动态数据
     */
    clearList() {
      this.MomentList = []
      this.MomentUserList = []
    },
    /**
     *
     * @description 获取有评论的动态
     */
    async getMomentCommentAction(momentId: number) {
      // 判断是否加载过
      if (this.MomentDetailArray.find((item) => item.id == momentId)) return
      // 无加载过获取数据
      const result = await getMomentDetail(momentId)
      if (result.code == 200) {
        if (result.data.comments != null) {
          this.MomentDetailArray.push(result.data)
        }
      }
    }
  }
})

export function useMainStoreWithOut() {
  return useMainStore(store)
}
