import { MomentResult, MomentUserResult } from '@/service/main/type'

export interface IMainState {
  MomentList: Array<MomentResult>
  MomentUserList: Array<MomentUserResult>
  MomentUserCount: number
}
