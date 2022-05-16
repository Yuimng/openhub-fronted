import { IUserInfo } from '@/service/login/type'

export interface ILoginState {
  token: string
  userInfo: IUserInfo
}
