<script setup lang="ts">
import type { OrderType } from '@/types/order';
import type { OrderDetailModalProps } from '@/types/orderDetailModalType'
import { OrderStatus } from '@/constants/order'
import { StationMode } from '@/constants/station'
import { onUnmounted, ref } from 'vue';
import Cookies from 'js-cookie';
import { message } from 'ant-design-vue'
import LoadingWrapper from '@/components/LoadingWrapper/index.vue'
import { t } from '@/locales';
import { displayValue } from '@/utils/display'
import { formatDate } from '@/utils/formatDate'

const emit = defineEmits(['close']);

const modalOpen = ref(false)
const ws = ref<WebSocket | null>(null)

const orderDetail = ref<OrderType | null>(null)
const isLoading = ref(true)
const params = ref<OrderDetailModalProps>({})

const closeWS = () => {
  if (ws.value) {
    ws.value.close()
    ws.value = null
  }
}

const initWS = () => {
  ws.value = new WebSocket('ws://localhost:8080/ws/orders')
  ws.value.onopen = () => {
    isLoading.value = true
    const token = Cookies.get('access_token')
    if (params.value.id) {
      // 查询订单
      ws.value!.send(JSON.stringify({
        type: 'query',
        token,
        data: { orderId: params.value.id },
      }))
    }
    else {
      // 新建订单
      ws.value!.send(JSON.stringify({
        type: 'upsert',
        token,
        data: {
          mode: params.value.mode,
          chargeAmount: params.value.chargeAmount,
        },
      }))
    }
  }
  ws.value.onmessage = (evt) => {
    isLoading.value = false
    try {
      const msg = JSON.parse(evt.data)
      if (msg.code === 200) {
        // 成功: 可能是订单详情，或推送的信息
        if (msg.data.id)
          orderDetail.value = msg.data
      }
      else {
        message.error(msg.msg)
      }
    }
    catch (e) {
      console.error("解析websocket消息失败", e)
    }
  }
  ws.value.onerror = () => {
    isLoading.value = false
    message.error("WebSocket 连接失败")
  }
  ws.value.onclose = () => {
    isLoading.value = false
  }
}

const handleCancel = () => {
  if (!ws.value || !orderDetail.value) {
    message.error('WebSocket未连接或订单详情为空');
    return;
  }
  ws.value.send(JSON.stringify({
    type: 'cancel',
    data: {
      orderId: orderDetail.value.id,
    },
  }));
};

const handleFinish = () => {
  if (!ws.value || !orderDetail.value) {
    message.error('WebSocket未连接或订单详情为空');
    return;
  }
  ws.value.send(JSON.stringify({
    type: 'finish',
    data: {
      orderId: orderDetail.value.id,
    },
  }));
};

const calculateProgress = (numerator: number, denominator: number) => {
  if (denominator === 0)
    return 100.00

  let percentage = (numerator / denominator) * 100;
  percentage = Math.min(Math.max(percentage, 0), 100); // 限制在0%到100%之间
  return percentage.toFixed(2); // 限制两位小数
}

const handleClose = () => {
  modalOpen.value = false
  emit('close')
}

// 暴露打开方法
const open = (p: OrderDetailModalProps) => {
  params.value = p
  isLoading.value = true
  initWS()
  modalOpen.value = true
}

defineExpose({ open })

onUnmounted(() => {
  closeWS()
})
</script>

<template>
  <a-modal
    v-model:open="modalOpen"
    :title="t('order.title')"
    @cancel="handleClose"
  >
    <LoadingWrapper :loading="isLoading" class="flex flex-col w-full h-full space-y-2">
      <div class="flex w-full">
        <span class="text-primary">{{ t('order.id') }} :
          <span class="primary">{{ orderDetail?.id }}</span>
        </span>
        <span class="text-primary ml-auto">
          {{
            orderDetail && orderDetail.status !== undefined && OrderStatus[orderDetail.status]
              ? OrderStatus[orderDetail.status].label
              : ''
          }}
        </span>
      </div>
      <div class="flex w-full">
        <span class="text-primary">{{ t('order.stationId') }} :
          <span class="primary">{{ orderDetail?.chargingStationId }}</span>
        </span>
      </div>
      <div class="flex w-full">
        <span class="text-primary">{{ t('order.mode') }} :
          <span class="primary">
            {{
              orderDetail && orderDetail.mode !== undefined && StationMode[orderDetail.mode]
                ? StationMode[orderDetail.mode].label
                : ''
            }}
          </span>
        </span>
      </div>
      <div v-if="orderDetail?.status === 1" class="progress_bar_container">
        <div class="progress_bar" :style="{ width: `${calculateProgress(orderDetail?.actualCharge, orderDetail?.chargeAmount)}%` }" />
        <div class="progress_bar_label">
          {{ calculateProgress(orderDetail?.actualCharge, orderDetail?.chargeAmount) }}%
        </div>
      </div>
      <div v-if="orderDetail?.status === 0 || orderDetail?.status === 1" class="flex flex-col w-full space-y-2">
        <div class="flex w-full justify-between">
          <span class="text-primary">{{ t('order.chargeDuration') }} :
            <span class="primary">{{ displayValue(orderDetail?.chargeDuration) }} {{ t('unit.time') }}</span>
          </span>
          <span class="text-primary">{{ t('order.actualCharge') }} / {{ t('order.chargeAmount') }} :
            <span class="primary">{{ displayValue(orderDetail?.actualCharge) }} {{ t('unit.degree') }} / {{ orderDetail?.chargeAmount }} {{ t('unit.degree') }}</span>
          </span>
        </div>
        <div class="flex w-full">
          <span class="text-primary">{{ t('order.startTime') }} :
            <span class="primary">{{ formatDate(displayValue(orderDetail?.startTime)) }}</span>
          </span>
        </div>
        <div class="flex w-full">
          <span class="text-primary">{{ t('order.stopTime') }} :
            <span class="primary">{{ formatDate(displayValue(orderDetail?.stopTime)) }}</span>
          </span>
        </div>
        <div class="flex flex-col space-y-2 justify-between">
          <span class="text-primary">{{ t('order.chargeFee') }} :
            <span class="primary">{{ displayValue(orderDetail?.chargeFee) }} {{ t('unit.currency') }}</span>
          </span>
        </div>
        <div class="flex w-full">
          <span class="text-primary">{{ t('order.serviceFee') }} :
            <span class="primary">{{ displayValue(orderDetail?.serviceFee) }} {{ t('unit.currency') }}</span>
          </span>
        </div>
        <div class="flex w-full">
          <span class="text-primary">{{ t('order.totalFee') }} :
            <span class="primary">{{ displayValue(orderDetail?.totalFee) }} {{ t('unit.currency') }}</span>
          </span>
        </div>
      </div>
    </LoadingWrapper>
    <template #footer>
      <div class="flex">
        <button
          v-if="orderDetail && orderDetail.status === 1"
          class="flex items-center px-4 py-2 border-button space-x-2"
          @click="handleFinish"
        >
          {{ t('order.button.finish') }}
        </button>
        <button
          v-if="orderDetail && orderDetail.status === 2 || orderDetail && orderDetail.status === 3"
          class="flex items-center px-4 py-2 border-button space-x-2"
          @click="handleCancel"
        >
          {{ t('order.button.cancel') }}
        </button>
        <button
          class="flex items-center px-4 py-2 border-button space-x-2 ml-auto"
          @click="handleClose"
        >
          {{ t('order.button.close') }}
        </button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
.progress_bar_container {
  position: relative;
  width: 100%;
  height: 20px;
  background: #464649;
  border-radius: 10px;
}

.progress_bar {
  height: 100%;
  background: linear-gradient(90deg, #A74EF4 0%, #773BEC 100%);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.progress_bar_label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #FFFFFF;
  font-weight: bold;
  z-index: 1;
}
</style>
