<template>
  <el-menu
      :default-active="$route.path"
      active-text-color="#ffd04b"
      background-color="#30415"
      class="el-menu-vertical-demo"
      :collapse-transition="true"
      default-active="2"
      text-color="#fff"
      :collapse="isCollapse"
      router
  >
    <menu-item v-for="menu in menus" :key="menu.path" :menu="menu"/>
  </el-menu>
</template>
<script setup lang="ts">
import {useStore} from "@/store/index"
import MenuItem from "./MenuItem.vue"
import {storeToRefs} from "pinia";

const menus = useStore().menus
const {isCollapse} = storeToRefs(useStore())
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped lang="scss">
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
