<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { OrderType } from '@/types/order';
import type { OrderDetailModalProps } from '@/types/orderDetailModalType'
import {
  PlusCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue';
import { t } from '@/locales';
import { message } from 'ant-design-vue'
import { getOrdersApi } from '@/api/order'
import LoadingWrapper from '@/components/LoadingWrapper/index.vue'
import OrderDetailModal from '@/components/OrderDetailModal/index.vue'
import OrderCreateModal from '@/components/OrderCreateModal/index.vue'
import { formatDate } from '@/utils/formatDate'
import { displayValue } from '@/utils/display'
import { StationMode } from '@/constants/station'
import { OrderStatus } from '@/constants/order'

const orders = ref<OrderType[]>([])
const isLoading = ref(true)
const detailModalRef = ref<InstanceType<typeof OrderDetailModal> | null>(null)
const createModalRef = ref<InstanceType<typeof OrderCreateModal> | null>(null)

let queriedAt = new Date()

const fetchOrders = async () => {
  try {
    isLoading.value = true
    const result = await getOrdersApi()
    // 按 recordTime 降序排序（大的/晚的在前）
    orders.value = result.sort(
      (a: OrderType, b: OrderType) => new Date(b.recordTime).getTime() - new Date(a.recordTime).getTime(),
    )
  }
  catch (error) {
    message.error(t('message.error.getOrderError'))
    console.error('获取订单信息失败:', error)
  }
  finally {
    isLoading.value = false
    queriedAt = new Date()
  }
}

const getCurrentTime = (now: Date) => {
  const hours = String(now.getHours()).padStart(2, '0'); // 获取小时并补零
  const minutes = String(now.getMinutes()).padStart(2, '0'); // 获取分钟并补零
  const seconds = String(now.getSeconds()).padStart(2, '0'); // 获取秒并补零
  return `${hours}:${minutes}:${seconds}`; // 返回格式化的时间字符串
}

const columns = [
  { title: t('order.id'), dataIndex: 'id', key: 'id', align: 'center', customRender: ({ text }: { text: string }) => displayValue(text), width: 180, ellipsis: true },
  { title: '用户ID', dataIndex: 'userId', key: 'userId', align: 'center', customRender: ({ text }: { text: string }) => displayValue(text) },
  { title: t('order.recordTime'), dataIndex: 'recordTime', key: 'recordTime', align: 'center', customRender: ({ text }: { text: string }) => displayValue(formatDate(text)), width: 230, ellipsis: true },
  { title: t('order.mode'), dataIndex: 'mode', key: 'mode', align: 'center', customRender: ({ text }: { text: string }) => StationMode[parseInt(displayValue(text))].label },
  { title: `${t('order.chargeAmount')} (${t('unit.degree')})`, dataIndex: 'chargeAmount', key: 'chargeAmount', align: 'center', customRender: ({ text }: { text: number }) => displayValue(text), width: 180, ellipsis: true },
  { title: `${t('order.actualCharge')} (${t('unit.degree')})`, dataIndex: 'actualCharge', key: 'actualCharge', align: 'center', customRender: ({ text }: { text: number }) => displayValue(text), width: 150, ellipsis: true },
  { title: t('order.statusTitle'), dataIndex: 'status', key: 'status', align: 'center', customRender: ({ text }: { text: string }) => OrderStatus[parseInt(displayValue(text))].label },
  { title: `${t('order.chargeDuration')} (${t('unit.time')})`, dataIndex: 'chargeDuration', key: 'chargeDuration', align: 'center', customRender: ({ text }: { text: number }) => displayValue(text) },
  { title: `${t('order.chargeFee')} (${t('unit.currency')})`, dataIndex: 'chargeFee', key: 'chargeFee', align: 'center', customRender: ({ text }: { text: number }) => displayValue(text) },
  { title: `${t('order.serviceFee')} (${t('unit.currency')})`, dataIndex: 'serviceFee', key: 'serviceFee', align: 'center', customRender: ({ text }: { text: number }) => displayValue(text) },
  { title: `${t('order.totalFee')} (${t('unit.currency')})`, dataIndex: 'totalFee', key: 'totalFee', align: 'center', customRender: ({ text }: { text: number }) => displayValue(text) },
]

const handleRowClick = (record: OrderDetailModalProps) => {
  detailModalRef.value?.open({ id: record.id })
}

// 返回一个对象，事件作为对象的事件回调
const customRow = (record: OrderDetailModalProps) => {
  return {
    onClick: () => handleRowClick(record),
  }
}

const handleCreate = (payload: OrderDetailModalProps) => {
  detailModalRef.value?.open({
    mode: payload.mode,
    chargeAmount: payload.chargeAmount,
  })
}

const buttons = [
  {
    icon: PlusCircleOutlined,
    title: t('stationContainer.button.add'),
    action: () => createModalRef.value?.open(),
  },
  {
    icon: ReloadOutlined,
    title: t('stationContainer.button.reload'),
    action: () => fetchOrders(),
  },
]

onMounted(() => {
  fetchOrders();
})
</script>

<template>
  <OrderDetailModal ref="detailModalRef" @close="fetchOrders" />
  <OrderCreateModal ref="createModalRef" @create="handleCreate" />
  <LoadingWrapper :loading="isLoading" class="w-full h-full">
    <div class="flex flex-col w-full h-full items-center body-bg rounded-[10px]">
      <!-- 订单表格区域 -->
      <div class="flex flex-1">
        <a-table
          :columns="columns"
          :data-source="orders"
          :pagination="false"
          row-key="id"
          :scroll="{ y: 720 }"
          class="h-full cursor-pointer"
          :custom-row="customRow"
        />
      </div>
      <!-- 按钮 -->
      <div class="flex w-full mt-auto px-4 items-center py-4">
        <div class="flex space-x-2 items-center">
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
        <div class="text-secondary ml-auto space-x-2">
          <span>{{ t('ordersContainer.queriedAt') }}</span>
          <span>{{ getCurrentTime(queriedAt) }}</span>
        </div>
      </div>
    </div>
  </LoadingWrapper>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
</style>
