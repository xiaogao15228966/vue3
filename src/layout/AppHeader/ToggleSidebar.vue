<template>
  <svg-icon :iconName="collapseIcon" @click="handleCollapse"></svg-icon>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useStore} from "@/store/index"
import {storeToRefs} from "pinia";

const store = useStore()
const {isCollapse} = storeToRefs(store)
const collapseIcon = computed(() => {
  return !isCollapse.value ? 'icon-s-unfold':'icon-s-fold'
})

const handleCollapse = () => {
  store.setIsCollapse(!isCollapse.value)
}
</script>

<style lang="scss" scoped></style>
