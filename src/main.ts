import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'animate.css'
import '@/assets/style/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://hbimg.huaban.com/d4982ed1cd962e300153e3e1bfe4674493c32ae1f593-Uey3Vw_fw658',
  loading: 'https://img.soogif.com/305PjuGtCDzK5xX2F4TlB0DHEuIk6CPM.gif',
  attempt: 1,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.mount('#app')
