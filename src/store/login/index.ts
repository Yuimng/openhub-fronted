import { defineStore } from 'pinia'
import { store } from '@/store'
import { ILoginState } from './type'
import { IAccount } from '@/service/login/type'
import { accountLoginRequest, requestUserInfoById } from '@/service/login'
import localCache from '@/utils/cache'
import router from '@/router'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

export const useLoginStore = defineStore({
  id: 'login',
  state: (): ILoginState => ({
    token: '',
    userInfo: {
      id: 0,
      name: '',
      avatar_url: null,
      momentCount: 0
    }
  }),
  getters: {},
  actions: {
    /**
     *
     * @description 账号登录
     */
    async accountLoginAction(payload: IAccount) {
      // 1.登录请求
      // ElMessage.closeAll()
      const loginResult = await accountLoginRequest(payload)
      if (loginResult.code == 200) {
        const { id, token } = loginResult.data
        this.token = token
        localCache.setCache('token', token)

        // 2.请求用户信息
        const userInfoResult = await requestUserInfoById(id)
        const userInfo = userInfoResult.data
        this.userInfo = userInfo
        localCache.setCache('userInfo', userInfo)
        ElMessage({
          message: loginResult.msg,
          type: 'success'
        })
        // 3.跳到首页
        router.push('/main/discover')
      } else {
        ElMessage({
          message: loginResult.msg,
          type: 'error'
        })
      }
    },
    /**
     *
     * @description 缓存信息加载
     */
    loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.token = token
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
    }
  }
})

export function useLoginStoreWithOut() {
  return useLoginStore(store)
}
