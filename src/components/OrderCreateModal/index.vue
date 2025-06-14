<script setup lang="ts">
import { StationMode } from '@/constants/station'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { t } from '@/locales'

const emit = defineEmits<{
  (e: 'create', payload: { mode: number; chargeAmount: number }): void
}>()

const modalOpen = ref(false)

const mode = ref<number>(0)
const chargeAmount = ref<number>(0)

const handleClose = () => {
  mode.value = 0
  chargeAmount.value = 0
  modalOpen.value = false
}

const handleConfirm = () => {
  if (chargeAmount.value === null || chargeAmount.value <= 0) {
    message.error(t('message.error.inalidChargeAmount'))
    return
  }

  emit('create', {
    mode: mode.value,
    chargeAmount: chargeAmount.value,
  })

  mode.value = 0
  chargeAmount.value = 0

  modalOpen.value = false
}

// 暴露打开方法
const open = () => {
  modalOpen.value = true
}

defineExpose({ open })
</script>

<template>
  <a-modal
    v-model:open="modalOpen"
    title="创建订单"
    @cancel="handleClose"
  >
    <div class="flex flex-col">
      <div class="flex justify-between items-center my-6">
        <span class="text-primary">{{ t('order.mode') }}</span>
        <a-select v-model:value="mode" style="width: 200px">
          <a-select-option
            v-for="item in StationMode"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="flex justify-between items-center mb-6">
        <span class="text-primary">{{ t('order.chargeAmount') }} ({{ t('unit.degree') }})</span>
        <a-input v-model:value="chargeAmount" style="width: 200px" />
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end space-x-2">
        <button
          class="flex items-center px-4 py-2 border-button space-x-2"
          @click="handleClose"
        >
          {{ t('order.button.close') }}
        </button>
        <button
          class="flex items-center px-4 py-2 normal-button space-x-2"
          @click="handleConfirm"
        >
          {{ t('order.button.confirm') }}
        </button>
      </div>
    </template>
  </a-modal>
</template>
