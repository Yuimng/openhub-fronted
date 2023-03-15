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
        const tempArr = result.data.momentList
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
     * @description 获取有评论的动态
     * @param momentId 查询动态的id
     * @param isPost 是否是发表评论后的数据刷新
     */
    async getMomentCommentAction(momentId: number, isPost: boolean) {
      // 获取是否已有对应的moments数据存在
      const hasMomentIndex = this.MomentDetailArray.findIndex(
        (item) => item.id == momentId
      )
      // 判断新增评论刷新
      if (isPost) {
        const result = await getMomentDetail(momentId)
        if (result.code == 200) {
          // 更新已存在动态的评论数据
          if (hasMomentIndex != -1) {
            this.MomentDetailArray[hasMomentIndex].comments =
              result.data.comments
          } else {
            this.MomentDetailArray.push(result.data)
          }
        }
      } else {
        // 判断是否加载过
        if (hasMomentIndex != -1) return
        // 无加载过获取数据
        const result = await getMomentDetail(momentId)
        if (result.code == 200) {
          if (result.data.comments != null) {
            this.MomentDetailArray.push(result.data)
          }
        }
      }
    }
  }
})

export function useMainStoreWithOut() {
  return useMainStore(store)
}
