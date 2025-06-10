<script setup lang="ts">
import type { OrderType } from '@/types/order';
import type { OrderDetailModalProps } from '@/types/orderDetailModalType'
import { onUnmounted, ref, watch } from 'vue';
import Cookies from 'js-cookie';
import { message } from 'ant-design-vue'

const modalOpen = ref(false)
const ws = ref<WebSocket | null>(null)

const orderDetail = ref<OrderType | null>(null)
const isLoading = ref(false)
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
        orderDetail.value = msg.data || null
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

// 暴露打开方法
const open = (p: OrderDetailModalProps) => {
  params.value = p
  initWS()
  modalOpen.value = true
}

defineExpose({ open })

onUnmounted(() => {
  closeWS()
})
</script>

<template>
  <a-modal v-model:open="modalOpen" title="订单详情" />
</template>
