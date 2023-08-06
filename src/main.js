import '@/assets/scss/index.scss'
import 'ol/ol.css'
import { svgLoader } from './icons'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
svgLoader(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
