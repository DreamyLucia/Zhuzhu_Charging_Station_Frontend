<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { StationType } from '@/types/station';
import Card from './components/Card.vue';
import {
  PlusCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue';
import { t } from '@/locales';
import { message } from 'ant-design-vue'
import LoadingWrapper from '@/components/LoadingWrapper/index.vue'
import { getAllStationApi } from '@/api/station';

const stations = ref<StationType[]>([])
const isLoading = ref(true)
let queriedAt = new Date()

const fetchAllStationInfo = async () => {
  try {
    stations.value = await getAllStationApi()
  }
  catch (error) {
    message.error(t('message.error.getAllStationError'))
    console.error('获取充电桩失败:', error)
  }
  finally {
    isLoading.value = false
    queriedAt = new Date()
  }
}

const getCurrentTime = (now: Date) => {
  const hours = String(now.getHours()).padStart(2, '0'); // 获取小时并补零
  const minutes = String(now.getMinutes()).padStart(2, '0'); // 获取分钟并补零
  const seconds = String(now.getSeconds()).padStart(2, '0'); // 获取秒并补零
  return `${hours}:${minutes}:${seconds}`; // 返回格式化的时间字符串
}

const buttons = [
  {
    icon: PlusCircleOutlined,
    title: t('stationContainer.button.add'),
    action: () => message.success(t('message.success.chargePanel')),
  },
  {
    icon: ReloadOutlined,
    title: t('stationContainer.button.reload'),
    action: () => fetchAllStationInfo(),
  },
]

onMounted(() => {
  fetchAllStationInfo();
})
</script>

<template>
  <LoadingWrapper :loading="isLoading" class="w-full h-full">
    <div class="flex flex-col w-full h-full items-center body-bg rounded-[10px]">
      <div class="flex flex-col flex-1 w-full border-bottom px-4 py-4">
        <div class="grid grid-cols-3 gap-8 w-full">
          <Card
            v-for="item in stations"
            :key="item.id"
            :station="item"
          />
        </div>
      </div>
      <!-- 按钮 -->
      <div class="flex w-full mt-auto px-4 items-center py-4">
        <div class="flex space-x-2 items-center">
          <button
            v-for="(btn, index) in buttons"
            :key="`buuton-${index}`"
            class="flex items-center px-4 py-2 normal-button space-x-2"
            @click="btn.action"
          >
            <component :is="btn.icon" />
            <span>{{ btn.title }}</span>
          </button>
        </div>
        <div class="text-secondary ml-auto space-x-2">
          <span>{{ t('ordersContainer.queriedAt') }}</span>
          <span>{{ getCurrentTime(queriedAt) }}</span>
        </div>
      </div>
    </div>
  </LoadingWrapper>
</template>
