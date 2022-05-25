export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IUserInfo {
  id: number
  name: string
  avatar_url: string | null
}
