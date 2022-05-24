import { MomentResult, MomentUserResult } from '@/service/main/type'

export interface IMainState {
  MomentList: Array<Array<MomentResult>>
  MomentUserList: Array<MomentUserResult>
}
