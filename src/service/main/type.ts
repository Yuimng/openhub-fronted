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

export interface MomentObject {
  momentCount: number
  momentList: MomentResult[]
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

export interface MomentContent {
  content: string
}

export interface CommentContent {
  momentId: number
  content: string
}

export interface Label {
  id: number
  name: string
}

export interface Comment {
  id: number
  user: Author
  content: string
  createTime: string
}

export interface MomentDetail {
  id: number
  content: string
  createTime: Date
  updateTime: Date
  author: Author
  labels: Label[]
  comments: Comment[]
  images: string[]
}
