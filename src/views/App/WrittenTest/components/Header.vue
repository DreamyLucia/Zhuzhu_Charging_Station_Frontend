<script setup lang="ts">
import {
  EditOutlined,
  LeftOutlined,
} from '@ant-design/icons-vue'
import type { Exam } from '@/types/exam'
import { useRouter } from 'vue-router'

const props = defineProps<{
  examData: Exam
}>()

const router = useRouter();

const handleClick = () => {
  router.push({ name: 'Dashboard' });
}
</script>

<template>
  <div class="flex justify-between w-full border-bottom px-4 py-2">
    <!-- 左侧内容 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center text-4xl p-2 return-button" @click="handleClick">
        <LeftOutlined />
      </div>
      <div class="flex flex-col h-full space-y-2 ml-2">
        <div class="flex text-primary">
          <span class="text-xl max-w-[400px] text-ellipsis-single-line">{{ examData.exam_name }}</span>
          <EditOutlined class="ml-2 cursor-pointer active-icon" />
        </div>
        <span class="text-secondary max-w-[400px] text-ellipsis-single-line">{{ examData.lang }} / {{ examData.coding_lang }}</span>
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="" />
  </div>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
.return-button {
  background-color: var(--normal-layout-body-bg-color);
  transition: all 0.2s ease;
  border-radius: 10px;
  border: solid 2px var(--normal-layout-border-color);
  color: var(--normal-layout-text-color);
  cursor: pointer;
  &:hover {
    background-color: var(--normal-layout-body-bg-invert-color);
    color: var(--normal-layout-invert-text-color);
    border: solid 2px var(--normal-layout-border-invert-color);
  }
}

.active-icon {
  transition: all 0.2s ease;
  &:hover {
    color: var(--primary);
  }
}
</style>
