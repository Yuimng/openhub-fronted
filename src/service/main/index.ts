import ymRequest from '../'
import { IDataType } from '../type'

import { MomentResult, MomentUserObject } from './type'

// offset 为 2n 的数
export function getMomentList(offset: number) {
  return ymRequest.get<IDataType<Array<MomentResult>>>({
    url: `/moment?offset=${offset}&size=2`,
    showLoading: false
  })
}

export function getMomentListByUserId(
  userId: number,
  offset: number,
  size: number
) {
  return ymRequest.get<IDataType<MomentUserObject>>({
    url: `/moment/${userId}?offset=${offset}&size=${size}`,
    showLoading: false
  })
}
