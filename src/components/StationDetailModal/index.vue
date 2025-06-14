<script setup lang="ts">
import { ref } from 'vue';
import type { StationType } from '@/types/station'
import { t } from '@/locales';
import { StationMode, StationStatus } from '@/constants/station'
import { formatDate } from '@/utils/formatDate'
import { getUnitPrice } from '@/utils/getUnitPrice'

const modalOpen = ref(false)

const station = ref<StationType | null>(null)

const handleClose = () => {
  modalOpen.value = false
}

// 暴露打开方法
const open = (data: StationType) => {
  modalOpen.value = true
  station.value = data
}

defineExpose({ open })
</script>

<template>
  <a-modal
    v-model:open="modalOpen"
    width="750px"
    @cancel="handleClose"
  >
    <div class="flex flex-col space-y-4">
      <div class="flex flex-col w-full justify-center items-center space-y-2">
        <span class="text-3xl primary">{{ station?.name }}</span>
        <span class="text-xl text-secondary">{{ station?.description }}</span>
      </div>
      <div class="flex w-full items-center justify-center">
        <div
          class="flex h-full items-center"
          :style="{
            color: station?.slot?.status?.status !== undefined
              ? StationStatus[station.slot.status.status].color
              : '',
          }"
        >
          <component
            :is="StationStatus[station?.slot.status.status].icon"
            v-if="station?.slot?.status.status !== undefined"
            class="text-xl mr-2"
          />
          <span class="text-xl whitespace-nowrap">
            {{
              station?.slot?.status?.status !== undefined
                ? StationStatus[station.slot.status.status].label
                : ''
            }}
          </span>
        </div>
        <div v-if="station?.slot.status.status === 0 || station?.slot.status.status === 1" class="ml-auto">
          <span>
            <span class="primary">{{ station?.slot.queue.length }}</span>
            <span class="text-primary"> / {{ station?.maxQueueLength }}</span>
          </span>
        </div>
      </div>

      <div class="flex flex-col w-full space-y-2">
        <span class="text-primary">{{ t('stationCard.id') }} :
          <span class="primary">{{ station?.id }}</span>
        </span>
        <span class="text-primary">{{ t('stationCard.modeTitle') }} :
          <span class="primary">
            {{
              station?.mode !== undefined
                ? StationMode[station.mode].label
                : ''
            }}
          </span>
        </span>
        <span class="text-primary">{{ t('stationCard.power') }} :
          <span class="primary">{{ station?.power }}</span>
        </span>
      </div>

      <div class="flex w-full space-x-2">
        <div class="flex flex-1 flex-col space-y-4">
          <div class="flex flex-col w-full space-y-2">
            <span class="text-primary text-2xl">{{ t('stationCard.feetitle') }}</span>
            <span class="text-primary">{{ t('stationCard.serviceFee') }} :
              <span class="primary">{{ station?.serviceFee }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
            </span>
            <span class="text-primary">{{ t('stationCard.price.title') }} ({{ t('stationCard.price.tips') }}) :
              <span class="primary">
                {{
                  station ? getUnitPrice(station) : '-'
                }} {{ t('unit.currency') }}/{{ t('unit.degree') }}
              </span>
            </span>
            <span class="text-primary">{{ t('stationCard.price.peak') }} :
              <span class="primary">{{ station?.peakPrice }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
            </span>
            <span class="text-primary">{{ t('stationCard.price.normal') }} :
              <span class="primary">{{ station?.normalPrice }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
            </span>
            <span class="text-primary">{{ t('stationCard.price.valley') }} :
              <span class="primary">{{ station?.valleyPrice }} {{ t('unit.currency') }}/{{ t('unit.degree') }}</span>
            </span>
          </div>
          <div class="flex flex-col w-full space-y-2">
            <span class="text-primary text-2xl">{{ t('stationCard.slot.title') }}</span>
            <span class="text-primary">{{ t('stationCard.slot.currentChargeCount') }} :
              <span class="primary">{{ station?.slot.status.currentChargeCount }} {{ t('unit.times') }}</span>
            </span>
            <span class="text-primary">{{ t('stationCard.slot.currentChargeTime') }} :
              <span class="primary">{{ station?.slot.status.currentChargeTime }} {{ t('unit.time') }}</span>
            </span>
            <span class="text-primary">{{ t('stationCard.slot.currentChargeAmount') }} :
              <span class="primary">{{ station?.slot.status.currentChargeAmount }} {{ t('unit.degree') }}</span>
            </span>
          </div>
        </div>
        <div class="flex flex-1 flex-col space-y-2">
          <span class="text-primary text-2xl">{{ t('stationCard.report.title') }}
            <span class="text-secondary text-sm ml-2">
              {{ station?.queriedAt ? formatDate(station.queriedAt) : '-' }}
            </span>
          </span>
          <span class="text-primary">{{ t('stationCard.report.totalChargeCount') }} :
            <span class="primary">{{ station?.report.totalChargeCount }} {{ t('unit.times') }}</span>
          </span>
          <span class="text-primary">{{ t('stationCard.report.totalChargeTime') }} :
            <span class="primary">{{ station?.report.totalChargeTime }} {{ t('unit.time') }}</span>
          </span>
          <span class="text-primary">{{ t('stationCard.report.totalChargeAmount') }} :
            <span class="primary">{{ station?.report.totalChargeAmount }} {{ t('unit.degree') }}</span>
          </span>
          <span class="text-primary">{{ t('stationCard.report.totalChargeFee') }} :
            <span class="primary">{{ station?.report.totalChargeFee }} {{ t('unit.currency') }}</span>
          </span>
          <span class="text-primary">{{ t('stationCard.report.totalServiceFee') }} :
            <span class="primary">{{ station?.report.totalServiceFee }} {{ t('unit.currency') }}</span>
          </span>
          <span class="text-primary">{{ t('stationCard.report.totalFee') }} :
            <span class="primary">{{ station?.report.totalFee }} {{ t('unit.currency') }}</span>
          </span>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex w-full items-center justify-center">
        <button
          class="flex items-center px-4 py-2 border-button"
          @click="handleClose"
        >
          {{ t('stationCard.button.close') }}
        </button>
      </div>
    </template>
  </a-modal>
</template>
