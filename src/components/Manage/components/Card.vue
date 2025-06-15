<script setup lang="ts">
import { ref } from 'vue'
import type { StationType } from '@/types/station'
import { StationMode, StationStatus } from '@/constants/station'
import { t } from '@/locales';
import { message } from 'ant-design-vue'
import {
  DeleteOutlined,
  PoweroffOutlined,
  QuestionCircleOutlined,
  SecurityScanOutlined,
  ThunderboltOutlined,
  ToolOutlined,
} from '@ant-design/icons-vue';
import StationDetailModal from '@/components/StationDetailModal/index.vue'
import StationDeleteModal from '@/components/StationDeleteModal/index.vue'
import { breakStationApi, fixStationApi, openStationApi, shutStationApi } from '@/api/station'

const props = defineProps<{
  station: StationType
}>()

const emit = defineEmits(['reload']);

const stationDetailModalRef = ref<InstanceType<typeof StationDetailModal> | null>(null)
const stationDeleteModalRef = ref<InstanceType<typeof StationDeleteModal> | null>(null)

const statusObj = StationStatus[props.station.slot.status.status]
const statusLabel = statusObj.label
const statusColor = statusObj.color
const statusIcon = statusObj.icon

const modeObj = StationMode[props.station.mode]
const modeLabel = modeObj.label

const buttons = [
  {
    icon: QuestionCircleOutlined,
    title: t('manageContainer.button.detail'),
    action: () => stationDetailModalRef.value?.open(props.station),
  },
  /*
  {
    icon: ToolOutlined,
    title: t('manageContainer.button.change'),
    action: () => fetchAllStationInfo(),
  },
  */
  {
    icon: DeleteOutlined,
    title: t('manageContainer.button.delete'),
    action: () => stationDeleteModalRef.value?.open(props.station),
  },
]

const handleDelete = () => {
  emit('reload')
}

const handleOpen = async () => {
  try {
    await openStationApi(props.station.id)
    emit('reload')
    message.success(t('message.success.openStation'))
  }
  catch (error) {
    message.error(t('message.error.openStationError'))
    console.error("开启充电桩失败:", error)
  }
}

const handleShut = async () => {
  try {
    await shutStationApi(props.station.id)
    emit('reload')
    message.success(t('message.success.shutStation'))
  }
  catch (error) {
    message.error(t('message.error.shutStationError'))
    console.error("关闭充电桩失败:", error)
  }
}

const handleFix = async () => {
  try {
    await fixStationApi(props.station.id)
    emit('reload')
    message.success(t('message.success.fixStation'))
  }
  catch (error) {
    message.error(t('message.error.fixStationError'))
    console.error("维修充电桩失败:", error)
  }
}

const handleBreak = async () => {
  try {
    await breakStationApi(props.station.id)
    emit('reload')
    message.success(t('message.success.breakStation'))
  }
  catch (error) {
    message.error(t('message.error.breakStationError'))
    console.error("损坏充电桩失败:", error)
  }
}
</script>

<template>
  <StationDetailModal ref="stationDetailModalRef" />
  <StationDeleteModal ref="stationDeleteModalRef" @delete="handleDelete" />
  <div class="flex box-bg rounded-[10px] px-4 py-2 space-y-2">
    <div class="flex flex-col flex-1 border-right pr-4">
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
    </div>
    <div class="flex items-center justify-center space-x-2 mx-4">
      <button
        v-if="station.slot.status.status === 2"
        class="flex items-center px-4 py-2 border-button space-x-2"
        @click="handleOpen"
      >
        <PoweroffOutlined />
        <span>{{ t('manageContainer.button.open') }}</span>
      </button>
      <button
        v-else
        class="flex items-center px-4 py-2 border-button space-x-2"
        @click="handleShut"
      >
        <PoweroffOutlined />
        <span>{{ t('manageContainer.button.shut') }}</span>
      </button>
      <button
        v-if="station.slot.status.status === 3"
        class="flex items-center px-4 py-2 border-button space-x-2"
        @click="handleFix"
      >
        <SecurityScanOutlined />
        <span>{{ t('manageContainer.button.fix') }}</span>
      </button>
      <button
        v-else
        class="flex items-center px-4 py-2 border-button space-x-2"
        @click="handleBreak"
      >
        <ThunderboltOutlined />
        <span>{{ t('manageContainer.button.break') }}</span>
      </button>
      <button
        v-for="(btn, index) in buttons"
        :key="`buuton-${index}`"
        class="flex items-center px-4 py-2 border-button space-x-2"
        @click="btn.action"
      >
        <component :is="btn.icon" />
        <span>{{ btn.title }}</span>
      </button>
    </div>
  </div>
</template>
