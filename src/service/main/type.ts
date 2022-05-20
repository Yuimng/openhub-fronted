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
