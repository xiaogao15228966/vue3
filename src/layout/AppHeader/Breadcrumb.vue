<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in routers" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed} from "vue";

const router = useRouter()
const routers = computed(() => {
  return router.currentRoute.value.matched.filter(item => {
    return item.meta.title
  })
})
</script>
<style scoped lang="scss">
</style>
