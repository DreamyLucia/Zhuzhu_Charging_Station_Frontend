<script setup lang="ts">
import { ref } from 'vue'
import type { StationType } from '@/types/station'
import { StationMode, StationStatus } from '@/constants/station'
import { formatDate } from '@/utils/formatDate'
import { getUnitPrice } from '@/utils/getUnitPrice'
import { t } from '@/locales';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import StationDetailModal from '@/components/StationDetailModal/index.vue'

const props = defineProps<{
  station: StationType
}>()

const stationDetailModalRef = ref<InstanceType<typeof StationDetailModal> | null>(null)

const statusObj = StationStatus[props.station.slot.status.status]
const statusLabel = statusObj.label
const statusColor = statusObj.color
const statusIcon = statusObj.icon

const modeObj = StationMode[props.station.mode]
const modeLabel = modeObj.label

const handleClick = () => {
  stationDetailModalRef.value?.open(props.station)
}
</script>

<template>
  <StationDetailModal ref="stationDetailModalRef" />
  <div class="flex flex-col box-bg rounded-[10px] px-4 py-2 space-y-2">
    <div class="flex items-center w-full">
      <span class="text-primary text-3xl whitespace-nowrap">{{ station.name }}</span>
      <div class="flex h-full items-center ml-4" :style="{ color: statusColor }">
        <component
          :is="statusIcon"
          class="text-2xl mr-2"
        />
        <span class="text-2xl whitespace-nowrap">{{ statusLabel }}</span>
      </div>
      <span class="text-sm text-secondary ml-auto">ID: {{ station.id }}</span>
    </div>
    <div class="flex items-center w-full">
      <span class="primary text-2xl">{{ modeLabel }}</span>
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
            <span class="text-primary">{{ t('stationCard.price.title') }}</span>
            <span class="primary">{{ getUnitPrice(station) }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
          </div>
        </div>
        <div class="ml-auto active-icon cursor-pointer text-secondary" @click="handleClick">
          <QuestionCircleOutlined />
        </div>
      </div>
    </div>
  </div>
</template>
