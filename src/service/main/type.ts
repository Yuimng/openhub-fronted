export interface Author {
  id: number
  name: string
  avatar_url: string
}

export interface MomentResult {
  id: number
  content: string
  createTime: Date
  updateTime: Date
  author: Author
  commentCount: number
  labelCount: number
  images: string[]
}

export interface MomentUserResult {
  id: number
  content: string
  createTime: Date
  updateTime: Date
  commentCount: number
  labelCount: number
  images: string[]
}

export interface MomentUserObject {
  momentUserCount: number
  momentUserList: MomentUserResult[]
}

export interface IContent {
  content: string
}
