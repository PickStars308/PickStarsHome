// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import '@/styles/global.scss';
import '@fortawesome/fontawesome-free/css/all.css'
import 'animate.css'
import 'element-plus/dist/index.css'
import WOW from 'wow.js'
import 'wow.js/css/libs/animate.css'



const pinia = createPinia()

// 初始化 WOW
new WOW({
    boxClass: 'wow',
    offset: 100,
    mobile: true,
    live: true,
}).init()

// PWA 注册
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
        // 新版本可用，通知用户
        ElNotification({
            title: '新版本上线',
            message: '点击刷新以更新到最新版本',
            type: 'info',
            duration: 0,
            onClick: () => {
                updateSW()
                location.reload()
            }
        })
    }
})

// 创建应用
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)   // <-- 这句非常关键，必须加

app.mount('#app')
