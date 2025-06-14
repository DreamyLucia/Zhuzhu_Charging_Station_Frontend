<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  header: string,
  number: number,
  unit: string
}>()

/**
 * 格式化数字，大于等于 1万 显示为 xx.xx w，否则原样返回
 */
const formatNumber = computed(() => {
  if (props.number >= 10000) {
    // 保留两位小数
    let val = (props.number / 10000).toFixed(2);
    // 去掉多余的小数点0
    val = val.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    return `${val}w`;
  }
  else {
    return props.number.toString();
  }
})
</script>

<template>
  <div class="flex flex-col px-4 py-4 digital-container items-center rounded-[10px] space-y-2">
    <div class="text-primary text-sm">
      {{ props.header }} ({{ props.unit }})
    </div>
    <div class="flex w-full items-center justify-center space-x-2">
      <span class="primary text-3xl">{{ formatNumber }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
.digital-container {
  background-color: var(--normal-layout-body-bg-color);
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background-color: var(--normal-layout-bg-appear-color);
  }
}
</style>
