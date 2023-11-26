import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 使用 pinia-plugin-persistedstate 插件
pinia.use(persist)
// 导出 Pinia 实例
export default pinia
// 导出 './modules/user' 中的所有内容
export * from './modules/user'