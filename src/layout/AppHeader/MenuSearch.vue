<template>
  <el-autocomplete
      v-model="state1"
      :fetch-suggestions="querySearch"
      clearable
      prefix-icon="el-icon-search"
      class="inline-input w-50"
      placeholder="请输入内容"
      @select="handleSelect"
  >
    <template #default="{ item }">
      <router-link
          :to="item.menu_path"
          custom
          v-slot="{ href }"
      >
        <el-link
            class="menu-link"
            :href="href"
            :disabled="item.type === 1"
            :underline="false"
        >
          <span
              class="link-text"
              @click="handleLinkClick(item, $event)"
          >{{ item.menu_name }}</span>
        </el-link>
      </router-link>
    </template>
  </el-autocomplete>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {createFilter} from "vite";
import {getMenus} from "@/api/home";
import {Menu} from "@/api/types/home";
const menus = ref<Menu[]>([])

const state1 = ref('')
const querySearch = (queryString: string, cb: (val: any) => void) => {
  console.log('querySearch', queryString)
  const results = queryString
      ? menus.value.filter(item => item.menu_name.includes(queryString))
      : menus.value
  // 调用 callback 返回建议列表的数据
  cb(results)
}
const handleSelect = (item: Menu) => {
  console.log(item)
}
const loadMenus = async () => {
  const data = await getMenus()
  menus.value = data
}
onMounted(() => {
  loadMenus()
})


</script>
<style scoped lang='scss'>
</style>
