import ymRequest from '../'
import { IDataType } from '../type'

import { MomentResult, MomentUserObject, IContent } from './type'

// offset 为 2n 的数
export function getMomentList(offset: number, size: number) {
  return ymRequest.get<IDataType<Array<MomentResult>>>({
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

export function postMoment(content: IContent) {
  return ymRequest.post<IDataType>({
    url: '/moment',
    data: content,
    showLoading: false
  })
}
