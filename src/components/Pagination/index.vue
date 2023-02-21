<template>
  <el-pagination
      :current-page="props.page"
      :page-size="props.limit"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :total="listCount"
      background
      layout="total,sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>
<script setup lang="ts">
import {PropType} from "vue";

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10,
  },
  listCount: {
    type: Number,
    default: 0
  },
  loadList: {
    type: Function as PropType<(...args: any[]) => void>,
    default: () => {
    }
  }
})

interface EmitType {
  (e: "update:page", page: Number): void,

  (e: "update:limit", size: Number): void
}

const emit = defineEmits<EmitType>()
// const emit = defineEmits(["update:page", "update:limit"])
const handleSizeChange = (size: number) => {
  emit('update:page', 1)
  emit('update:limit', size)
  props.loadList()
}
const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}
</script>
<style scoped lang='scss'>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
