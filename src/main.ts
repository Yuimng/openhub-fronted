import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import router from './router'
import { setupStore } from './store'
import { initAppConfigStore } from './logics/initAppConfig'
import dateRelative from './utils/date-relative'

const app = createApp(App)

setupStore(app)

initAppConfigStore()

app.use(dateRelative)

app.use(router).mount('#app')
