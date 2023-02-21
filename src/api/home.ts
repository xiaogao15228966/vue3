import request from "@/untils/request";
import {Menu} from "@/api/types/home";
export const getMenus = () => {
    return request<Menu[]>({
        method: 'GET',
        url: '/menusList'
    })
}
