import axios from "axios"
import {AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig} from "axios/index";
import router from "@/router/";
import {ElMessageBox, ElMessage} from "element-plus";
import {useStore} from "@/store/index"

const store = useStore()
const request = axios.create({
    baseURL: 'https://shop.fed.lagounews.com/api/admin' // 基础路径
})

// Add a request interceptor
request.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
    // 容错：防止请求地址中有空格
    config.url = config.url?.trim()
    // Do something before request is sent
    // 统一设置用户身份 token
    const user = store.user
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function (error: any) {
    // Do something with request error
    return Promise.reject(error);
});
// 控制登录过期的锁
let isRefreshing = false
// Add a response interceptor
request.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 正确的情况
    const status = response.data.status
    if (!status || status === 200) {
        return response
    }
    // 错误情况：比如 token 无效...

    // 统一处理登录过期
    if (status === 410000) {
        if (isRefreshing) return Promise.reject(response)
        isRefreshing = true
        ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        }).then(() => {
            // 清除本地过期的登录状态
            store.setUser(null)
            // 跳转到登录页面
            router.push({
                name: 'login',
                query: {
                    redirect: router.currentRoute.value.fullPath
                }
            })
            // 抛出异常
        }).finally(() => {
            isRefreshing = false
        })

        // 在内部消化掉这个业务异常
        return Promise.reject(response)
    }
    ElMessage({
        type: 'error',
        message: response.data.msg,
        duration: 5 * 1000
    })
    return Promise.reject(response)
}, function (error: any) {
    ElMessage({
        type: 'error',
        message: error.message,
        duration: 5 * 1000
    })
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default <T = any>(config: AxiosRequestConfig) => {
    return request(config).then(res => {
        return (res.data.data || res.data) as T
    })
}
