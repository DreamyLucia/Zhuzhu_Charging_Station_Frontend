<script setup lang="ts">
import Header from './components/Header.vue'
import Siderbar from './components/Siderbar.vue'
import Content from './components/Content.vue'
import type { Exam } from '@/types/exam'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { ref, watch } from 'vue';
import { fromBase64 } from '@/utils/base64';

const route = useRoute()
const examData = ref<Exam | null>(null)

const isDataReady = ref(false);

// 解析考试数据
const parseExamData = async (encodedData: string) => {
  try {
    if (encodedData) {
      // 确保 examData 是字符串
      if (encodedData !== 'string')
        throw new Error('考试数据格式不正确');

      // 使用 fromBase64 函数进行 Base64 解码
      const decodedData = await fromBase64(encodedData);
      examData.value = JSON.parse(decodedData);
      isDataReady.value = true;
    }
  }
  catch (error) {
    console.error('解析考试数据失败')
    throw error
  }
}

// 关键：监听路由变化
watch(
  () => route.query.examData,
  async (newData) => {
    if (typeof newData === 'string')
      await parseExamData(newData);
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="isDataReady && examData" class="flex flex-col h-full w-full normal-bg">
    <Header :exam-data="examData" />
    <div>
      <Siderbar />
      <Content />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
</style>
