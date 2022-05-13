import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YMRequestInterceptors<T = AxiosResponse<any, any>> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface YMRequestConfig<T = AxiosResponse<any, any>>
  extends AxiosRequestConfig {
  interceptors?: YMRequestInterceptors<T>
  showLoading?: boolean
}
