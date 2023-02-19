// src\router\index.ts
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../views/home/index.vue')
    },
    {
        path:'/admin',
        component:()=>import('@/layout/appLayout.vue'),
        children:[
            {
                path: 'home', // 默认子路由
                name: 'home',
                component: () => import('../views/home/index.vue'),
            },
        ]
    },
    {
        path: '/login',
        component: () => import('../views/login/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
