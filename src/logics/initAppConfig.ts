import { useLoginStoreWithOut } from '@/store/login'
import { useMainStoreWithOut } from '@/store/main'

const LoginStore = useLoginStoreWithOut()
const MainStore = useMainStoreWithOut()

export function initAppConfigStore() {
  LoginStore.loadLocalLogin()
  // 默认刷新保持 个人动态数量 加载
  MainStore.getMomentUserCountAction(LoginStore.userInfo.id)
}
