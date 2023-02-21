<template>
  <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path">
    <template #title>
      <svg-icon v-if="menu.icon" :iconName="`icon-${menu.icon}`" color="rgba(255, 255, 255, 0.7)"></svg-icon>
      <span>{{ menu.title }}</span>
    </template>
    <MenuItem
        v-for="subMenu in menu.children"
        :key="subMenu.path"
        :menu="subMenu"
    />
  </el-sub-menu>

    <el-menu-item v-else :index="menu.path">
      <svg-icon v-if="menu.icon" :iconName="`icon-${menu.icon}`" color="rgba(255, 255, 255, 0.7)"></svg-icon>
      <template #title>
        <span>{{ menu.title }}</span>
      </template>
    </el-menu-item>
</template>
<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {PropType} from "vue";
import {IMenu} from "@/api/types/common";

const props = defineProps({
  menu: {
    type: Object as PropType<IMenu>,
    required: true
  }
})
// const props = defineProps({
//   menu: {
//     type: Object as PropType(IMenu),
//   required: true
// },
// })
</script>
<style scoped lang="scss">


</style>
