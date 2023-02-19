import axios from "axios"
import {AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig} from "axios/index";

const request = axios.create({
    baseURL: 'https://shop.fed.lagounews.com/api/admin' // 基础路径
})

// Add a request interceptor
request.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    return config;
}, function (error: any) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default <T = any>(config: AxiosRequestConfig) => {
    return request(config).then(res => {
        return res.data.data || res.data as T
    })
}
