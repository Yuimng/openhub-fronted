import ymRequest from '../'
import { IDataType } from '../type'
import { IAccount, ILoginResult, IUserInfo } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  AccountRegister = '/users'
}

export function accountLoginRequest(account: IAccount) {
  return ymRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return ymRequest.get<IDataType<IUserInfo>>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function accountRegisterRequest(account: IAccount) {
  return ymRequest.post<IDataType>({
    url: LoginAPI.AccountRegister,
    data: account,
    showLoading: false
  })
}
