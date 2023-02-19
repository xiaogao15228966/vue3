import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./styles/index.scss"
import './assets/iconfont/iconfont.js';
const app = createApp(App)
app.use(router).use(elementPlus).mount('#app')
// 自动注册全局组件
const modules = import.meta.globEager('./components/**/index.ts')
for (const path in modules) {
    // @ts-ignore
    app.use(modules[path].default)
}
