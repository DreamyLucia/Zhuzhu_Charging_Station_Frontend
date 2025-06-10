<script setup lang="ts">
import type { StationType } from '@/types/station';
import Card from './components/Card.vue';
import {
  PlusCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue';
import { t } from '@/locales';
import { message } from 'ant-design-vue'

defineProps<{ stations: StationType[] }>()

const buttons = [
  {
    icon: PlusCircleOutlined,
    title: t('stationContainer.button.add'),
    action: () => message.success(t('message.success.chargePanel')),
  },
  {
    icon: ReloadOutlined,
    title: t('stationContainer.button.reload'),
    action: () => message.success(t('message.success.allOrders')),
  },
]
</script>

<template>
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
    <div class="flex w-full mt-auto px-4 space-x-2 items-center py-4">
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
  </div>
</template>
