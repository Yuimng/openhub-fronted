import { ymFormRequest, ymRequest } from '../'
import { IDataType } from '../type'

import {
  MomentResult,
  MomentUserObject,
  MomentContent,
  MomentDetail,
  CommentContent,
  MomentObject
} from './type'

// offset 为 2n 的数
export function getMomentList(offset: number, size: number) {
  return ymRequest.get<IDataType<MomentObject>>({
    url: `/moment?offset=${offset}&size=${size}`,
    showLoading: false
  })
}

export function getMomentListByUserId(
  userId: number,
  offset: number,
  size: number
) {
  return ymRequest.get<IDataType<MomentUserObject>>({
    url: `/moment/user/${userId}?offset=${offset}&size=${size}`,
    showLoading: false
  })
}

export function postMoment(content: MomentContent) {
  return ymRequest.post<IDataType>({
    url: '/moment',
    data: content,
    showLoading: false
  })
}

export function getMomentDetail(momentId: number) {
  return ymRequest.get<IDataType<MomentDetail>>({
    url: `/moment/${momentId}`,
    showLoading: false
  })
}

export function deleteMoment(momentId: number) {
  return ymRequest.delete<IDataType>({
    url: `/moment/${momentId}`,
    showLoading: false
  })
}

export function postComment(data: CommentContent) {
  return ymRequest.post<IDataType>({
    url: '/comment',
    data: data,
    showLoading: false
  })
}

export function postMomentWithPic(data: FormData) {
  return ymFormRequest.request<IDataType>({
    url: '/upload/moment',
    data: data,
    showLoading: true
  })
}
