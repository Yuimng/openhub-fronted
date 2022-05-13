// service 统一出口
import YMRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

const ymRequest = new YMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带 token 的拦截
      const token = localCache.getCache('token')
      // config.headers.Authorization = `Bearer ${token}` 无法识别Authorization
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default ymRequest
