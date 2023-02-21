<template>
  <el-dialog
      title="Tips"
      ref="dialg"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button
            type="primary"
            :loading="confirmLoading"
            @click="handleConfirm"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {PropType, ref} from 'vue'
import {IElDialog} from "@/types/element-plus";

const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})
const dialg = ref<IElDialog | null>(null)
const confirmLoading = ref(false)
const handleCancel = () => {
  if (dialg.value) {
    dialg.value.visible = false
  }
}
const handleConfirm = () => {
  props.confirm()
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
