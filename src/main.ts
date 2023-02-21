import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./styles/index.scss"
import './assets/iconfont/iconfont.js';
import pinia from "@/store"
const app = createApp(App)
// 自动注册全局组件
const modules = import.meta.globEager('./components/**/index.ts')
for (const path in modules) {
    // @ts-ignore
    app.use(modules[path].default)
}
app.use(router).use(pinia).use(elementPlus).mount('#app')

