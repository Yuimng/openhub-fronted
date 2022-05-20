import ymRequest from '../'
import { IDataType } from '../type'

import { MomentResult } from './type'

// offset 为 2n 的数
export function getMomentList(offset: number) {
  return ymRequest.get<IDataType<Array<MomentResult>>>({
    url: `/moment?offset=${offset}&size=2`,
    showLoading: false
  })
}
