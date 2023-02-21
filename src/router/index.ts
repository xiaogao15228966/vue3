// src\router\index.vue.ts
import {createRouter, RouteRecordRaw, createWebHashHistory} from 'vue-router'
import product from "@/router/modules/product";
import setting from "@/router/modules/setting";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {useStore} from "@/store/index"
import {storeToRefs} from "pinia";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/admin/home'
        // component: () => import('../views/home/index.vue.vue')
    },
    {
        path: '/admin',
        name:"admin",
        component: () => import('@/layout/appLayout.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'home', // 默认子路由
                name: 'home',
                component: () => import('../views/home/index.vue'),
                meta: {title: '首页'}
            },
            product,
            setting
        ]
    },
    {
        path: '/admin/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
let registerRouteFresh = true;//是否还没有动态加载过
// VueRouter 4 中可以不写 next 了，默认就是通过状态
router.beforeEach((to, from) => {
    nprogress.start()
    const state = useStore()
    const {user, menus} = storeToRefs(state)
    if (to.meta.requiresAuth && !user.value) {
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        return {
            path: '/admin/login',
            // 保存我们所在的位置，以便以后再来
            query: {redirect: to.fullPath}
        }
    }
    // if (registerRouteFresh && user.value) {//还没有动态加载过
    //     //动态注册路由 <----------------------------------------
    //     menus.value.forEach(itemRouter=>{
    //         router.addRoute("admin", {
    //             path: `${itemRouter.path}`,
    //             component: () => import(`@/views${itemRouter.path}/index.vue`)
    //         });
    //     })
    //
    //     // routeAssembler(router);
    //     registerRouteFresh = false;
    //     // next({ ...to, replace: true });
    // }
})

router.afterEach(() => {
    nprogress.done()
})
export default router
