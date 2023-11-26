import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 导入路由模块
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store'
createApp(App)
.use(router)
.use(pinia)
.use(ElementPlus)
.mount('#app')
