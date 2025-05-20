import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupI18n } from './locales'
import { setRouter } from '@/api/login'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(Antd)
app.use(pinia)
app.use(router)

// 设置国际化语言
setupI18n(app)

setRouter(router)

app.mount('#app')
