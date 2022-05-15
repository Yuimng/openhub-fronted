import { useLoginStoreWithOut } from '@/store/login'

const LoginStore = useLoginStoreWithOut()

export function initAppConfigStore() {
  LoginStore.loadLocalLogin()
}
