<script setup lang="ts">
import { StationMode } from '@/constants/station'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { t } from '@/locales'
import { deleteStationApi } from '@/api/station'
import type { StationType } from '@/types/station'

const emit = defineEmits(['delete']);

const station = ref<StationType | null>(null)

const modalOpen = ref(false)

const handleClose = () => {
  modalOpen.value = false
}

const handleDelete = async () => {
  try {
    await deleteStationApi(station!.value!.id)
    emit('delete')
    message.success(t('message.success.deleteStation'))
  }
  catch (error) {
    message.error(t('message.error.deleteStationError'))
    console.error("删除充电桩失败:", error)
  }
  finally {
    modalOpen.value = false
  }
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
    @cancel="handleClose"
  >
    <span span="text-xl text-primary">
      {{ t('manageContainer.deleteModal.check1') }}
      <span class="primary">{{ station?.id }}</span>
      {{ t('manageContainer.deleteModal.check2') }}
      <span class="primary">{{ station?.name }} ?</span>
    </span>
    <template #footer>
      <div class="flex justify-between items-center">
        <button
          class="flex items-center px-4 py-2 border-button space-x-2"
          @click="handleClose"
        >
          {{ t('manageContainer.button.cancel') }}
        </button>
        <button
          class="flex items-center px-4 py-2 normal-button space-x-2"
          @click="handleDelete"
        >
          {{ t('manageContainer.button.delete') }}
        </button>
      </div>
    </template>
  </a-modal>
</template>
