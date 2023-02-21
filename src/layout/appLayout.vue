<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <app-menu></app-menu>
      </el-aside>
      <el-container>
        <el-header>
          <app-header/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import AppMenu from "./AppMenu/index.vue"
import AppHeader from "./AppHeader/index.vue"
import {useStore} from "@/store/index"

const store = useStore()
</script>
<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  width: auto;
  background-color: #304156;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

</style>
