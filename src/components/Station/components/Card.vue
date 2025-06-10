<script setup lang="ts">
import { computed } from 'vue'
import type { StationType } from '@/types/station'
import { StationMode, StationStatus } from '@/constants/station'
import { formatDate } from '@/utils/formatDate'
import { t } from '@/locales';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';

const props = defineProps<{
  station: StationType
}>()

const statusObj = StationStatus[props.station.slot.status.status]
const statusLabel = statusObj.label
const statusColor = statusObj.color
const statusIcon = statusObj.icon

const modeObj = StationMode[props.station.mode]
const modeLabel = modeObj.label
</script>

<template>
  <div class="flex flex-col box-bg rounded-[10px] px-4 py-2 space-y-4">
    <div class="flex items-center w-full">
      <div class="flex h-full items-center" :style="{ color: statusColor }">
        <component
          :is="statusIcon"
          class="text-2xl mr-2"
        />
        <span class="text-2xl whitespace-nowrap">{{ statusLabel }}</span>
      </div>
      <span class="primary text-2xl ml-4">{{ modeLabel }}</span>
      <div class="flex flex-1 items-center justify-center">
        <span class="text-primary text-3xl whitespace-nowrap">{{ station.name }}</span>
      </div>
      <div v-if="statusObj.value === 0 || statusObj.value === 1" class="ml-auto">
        <span>
          <span class="primary">{{ station.slot.queue.length }}</span>
          <span class="text-primary"> / {{ station.maxQueueLength }}</span>
        </span>
      </div>
    </div>
    <div class="flex items-center w-full">
      <div class="flex items-center space-x-8 text-sm">
        <div class="flex space-x-2 items-center">
          <span class="text-primary">{{ t('stationCard.power') }}</span>
          <span class="primary">{{ station.power }} {{ t('unit.degree') }}/{{ t('unit.time') }}</span>
        </div>
        <div class="flex space-x-2">
          <span class="text-primary">{{ t('stationCard.serviceFee') }}</span>
          <span class="primary">{{ station.serviceFee }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
        </div>
        <div class="flex flex-col primary space-y-2">
          <div class="flex space-x-2">
            <span class="text-primary">峰时</span>
            <span class="primary">{{ station.peakPrice }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
          </div>
          <div class="flex space-x-2">
            <span class="text-primary">平时</span>
            <span class="primary">{{ station.normalPrice }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
          </div>
          <div class="flex space-x-2">
            <span class="text-primary">谷时</span>
            <span class="primary">{{ station.valleyPrice }} {{ t('unit.currency') }}/度</span>
          </div>
        </div>
      </div>
      <div class="ml-auto text-2xl text-primary active-icon p-4">
        <QuestionCircleOutlined />
      </div>
    </div>
  </div>
</template>
