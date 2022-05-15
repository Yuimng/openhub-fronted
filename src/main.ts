import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import router from './router'
import { setupStore } from './store'
import { initAppConfigStore } from './logics/initAppConfig'

const app = createApp(App)

setupStore(app)

initAppConfigStore()

app.use(router).mount('#app')
