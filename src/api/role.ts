import request from "@/untils/request";
import {EditRole, IListParams, Role, RolePostData} from "@/api/types/role";
import {Menu} from "@/api/types/role";

export const getRoles = (params: IListParams) => {
    return request<{
        count: number,
        list: Role[]
    }>({
        method: "get",
        url: "/setting/role",
        params
    })
}
export const saveRole = (id: number, data: RolePostData) => {
    return request({
        method: "POST",
        url: `/setting/role/${id}`,
        data
    })
}


export const deleteRole = (id: number) => {
    return request({
        method: 'DELETE',
        url: `/setting/role/${id}`
    })
}

export const updateRoleStatus = (id: number, status: 0 | 1) => {
    return request({
        method: 'PUT',
        url: `/setting/role/set_status/${id}/${status}`
    })
}


export const getRole = (id: number) => {
    return request<{
        role: EditRole
        menus: Menu[]
    }>({
        method: 'GET',
        url: `/setting/role/${id}/edit`
    })
}

export const getMenus = () => {
    return request<{
        menus: Menu[]
    }>({
        method: 'GET',
        url: '/setting/role/create'
    })
}
