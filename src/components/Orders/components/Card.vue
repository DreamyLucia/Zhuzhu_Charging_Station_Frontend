<script setup lang="ts">
import { computed } from 'vue'
import type { OrderType } from '@/types/order';
import { formatDate } from '@/utils/formatDate'
import { StationMode } from '@/constants/station'
import { t } from '@/locales';
import {
  InfoCircleOutlined,
} from '@ant-design/icons-vue';

defineProps<{
  order: OrderType
}>()
</script>

<template>
  <div class="flex box-bg rounded-[10px] px-4 py-2 space-x-4">
    <div class="flex flex-1 justify-between">
      <span>{{ formatDate(order.recordTime) }}</span>
      <span>{{ order.chargeAmount }}</span>
      <span>{{ StationMode[order.mode].label }}</span>
      <span>{{ order.id }}</span>
      <span>{{ order.status }}</span>
    </div>
    <InfoCircleOutlined />
  </div>
</template>
