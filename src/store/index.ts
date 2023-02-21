import {defineStore} from "pinia";
import {IMenu, IUserInfo} from "@/api/types/common";

export const useStore = defineStore('useStore', {
    state: () => ({
        isCollapse: false,
        user: null as ({ token: string } & IUserInfo) | null,
        // user: getItem<{ token: string } & IUserInfo>(USER),
        menus: [] as IMenu[]
    }),

    actions: {
        setIsCollapse (payload:boolean) {
            this.isCollapse = payload
        },

        setUser (payload:({ token: string } & IUserInfo) | null) {
            this.user = payload
        },

        setMenus (payload:IMenu[]) {
            this.menus = payload
        }
    },
    persist: true
})

import {createPinia} from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersist);
export default pinia
