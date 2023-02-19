import request from "@/untils/request"
import {ILoginResponse} from "@/api/types/common";
export const login = (
    data: {
        account: string,
        pwd: string,
        imgcode: string
    }
) => {
    return request<ILoginResponse>({
        method: 'POST',
        url: '/login',
        data
    })
}

export const getCaptcha = ()=>{
    return request<Blob>({
        method:'GET',
        url:"/captcha_pro",
        params:{
            stamp: Date.now()
        },
        responseType: 'blob' // 请求获取图片数据
    })
}
