import { useLoginStoreWithOut } from '@/store/login'
import { useMainStoreWithOut } from '@/store/main'

const LoginStore = useLoginStoreWithOut()
const MainStore = useMainStoreWithOut()

export function initAppConfigStore() {
  LoginStore.loadLocalLogin()
  MainStore.getMomentListAction(0)
}
