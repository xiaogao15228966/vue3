import {RouterView} from "vue-router";

const routers = {
    path: 'product',
    component: RouterView,
    meta: {
        title: '商品'
    },
    children: [
        {
            path: 'product_list',
            name: 'product.ts-list',
            component: () => import('@/views/product/list/index.vue'),
            meta: { // 自定义路由元数据
                title: '商品列表'
            }
        },
        {
            path: 'add_product',
            name: 'product.ts-add',
            component: () => import('@/views/product/add/index.vue'),
            meta: {
                title: '添加商品'
            }
        },
        {
            path: 'product_attr',
            name: 'product.ts-attr',
            component: () => import('@/views/product/attr/index.vue'),
            meta: {
                title: '商品规格'
            }
        },
        {
            path: 'product_classify',
            name: 'product.ts-classify',
            component: () => import('@/views/product/classify/index.vue'),
            meta: {
                title: '商品分类'
            }
        },
        {
            path: 'product_reply',
            name: 'product.ts-reply',
            component: () => import('@/views/product/reply/index.vue'),
            meta: {
                title: '商品评论'
            }
        }
    ]
}
export default routers
