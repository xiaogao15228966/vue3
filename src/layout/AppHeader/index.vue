<template>
  <el-space size="large">
    <ToggleSidebar />
    <Breadcrumb/>
  </el-space>
  <el-space size="large">
    <MenuSearch/>
    <FullScreen/>
    <UserInfo/>
  </el-space>
</template>
<script setup lang="ts">
import ToggleSidebar from "./ToggleSidebar.vue"
import Breadcrumb from "./Breadcrumb.vue"
import MenuSearch from "./MenuSearch.vue"
import FullScreen from "./FullScreen.vue"
import UserInfo from "./UserInfo.vue"
import {useRouter} from "vue-router";
const router = useRouter()
const routers = router.currentRoute.value.matched.filter(item=>{
  return item.meta.title
})
</script>
<style scoped lang="scss">
</style>
