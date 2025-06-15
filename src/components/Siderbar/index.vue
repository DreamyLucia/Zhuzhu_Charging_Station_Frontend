<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { t } from '@/locales';
import { getUserInfoApi } from '@/api/user';
import { logoutApi } from '@/api/login';
import type { UserType } from '@/types/user';
import type { OrderType } from '@/types/order';
import { message } from 'ant-design-vue'
import {
  AppstoreOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons-vue';
import DigitalDisplay from '@/components/DigitalDisplay/index.vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { getOrdersApi } from '@/api/order'

const props = defineProps<{ user: UserType }>()
const router = useRouter();
const isAdmin = props.user.roles.includes('ROLE_ADMIN')
const appStore = useAppStore()
const orders = ref<OrderType[]>([])

// 计算统计数据的计算属性
const totalChargeDuration = computed(() =>
  orders.value.reduce((acc: number, order: OrderType) => acc + (order.chargeDuration || 0), 0),
)

const totalChargeCount = computed(() => orders.value.length)

const totalChargeFee = computed(() =>
  orders.value.reduce((acc: number, order: OrderType) => acc + (order.chargeFee || 0), 0),
)

const totalServiceFee = computed(() =>
  orders.value.reduce((acc: number, order: OrderType) => acc + (order.serviceFee || 0), 0),
)

const totalChargeAmount = computed(() =>
  orders.value.reduce((acc: number, order: OrderType) => acc + (order.actualCharge || 0), 0),
)

const totalFee = computed(() =>
  orders.value.reduce((acc: number, order: OrderType) => acc + (order.totalFee || 0), 0),
)

const fetchOrders = async () => {
  try {
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
}

const buttons = [
  {
    icon: AppstoreOutlined,
    title: t('dashboardSiderbar.button.chargePanel'),
    action: () => router.push({ name: 'Home' }),
  },
  {
    icon: UnorderedListOutlined,
    title: t('dashboardSiderbar.button.allOrders'),
    action: () => router.push({ name: 'OrdersPage' }),
  },
  isAdmin
    ? {
        icon: InfoCircleOutlined,
        title: t('dashboardSiderbar.button.adminPanel'),
        action: () => router.push({ name: 'ManagePage' }),
      }
    : null,
].filter(Boolean); // 过滤掉 null

const digitalList = computed(() => [
  {
    title: t('dashboardSiderbar.digitalTitle.totalDuration'),
    number: totalChargeDuration.value,
    unit: t('unit.time'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalCount'),
    number: totalChargeCount.value,
    unit: t('unit.times'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalFee'),
    number: totalChargeFee.value,
    unit: t('unit.currency'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalServiceFee'),
    number: totalServiceFee.value,
    unit: t('unit.currency'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalAmount'),
    number: totalChargeAmount.value,
    unit: t('unit.degree'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalCost'),
    number: totalFee.value,
    unit: t('unit.currency'),
  },
])

const toggleTheme = () => {
  appStore.setDarkMode(!appStore.isDarkMode)
}

const handlelogout = async () => {
  await logoutApi()
  message.success(t('message.success.logout'))
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- 头部 -->
    <div class="flex items-center gap-3 cursor-pointer justify-center">
      <div class="h-12 w-12">
        <img src="@/assets/logo.png" alt="Logo" class="h-full w-full rounded-[10px]">
      </div>
      <span class="text-3xl font-bold ml-2 primary">{{ t('productName') }}</span>
    </div>

    <!-- 统计 -->
    <div class="mt-4 flex flex-1 w-full justify-center items-center">
      <div class="w-full grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-2">
        <DigitalDisplay
          v-for="(item, idx) in digitalList"
          :key="idx"
          :header="item.title"
          :number="item.number"
          :unit="item.unit"
        />
      </div>
    </div>

    <!-- 按钮 -->
    <div class="flex flex-col w-full mt-auto px-4 space-y-2">
      <button
        v-for="(btn, index) in buttons"
        :key="`buuton-${index}`"
        class="flex-1 flex items-center px-2 py-4 no-bg-button space-x-2"
        @click="btn?.action"
      >
        <component :is="btn?.icon" />
        <span class="text-sm">{{ btn?.title }}</span>
      </button>
    </div>

    <!-- 用户信息 -->
    <div class="flex w-full px-4">
      <div class="flex gap-3 w-full items-center">
        <div class="flex flex-1 gap-3 p-4 no-bg-button">
          <div class="h-8 w-8 cursor-pointer">
            <img src="@/assets/img/userImg.jpg" alt="UserImg" class="h-full w-full rounded-full">
          </div>
          <span class="text-xl font-bold ml-2 text-primary text-ellipsis-single-line">{{ props.user.username }}</span>
        </div>
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="theme-toggle ml-auto" @click="toggleTheme">
          <g clip-path="url(#clip0_86_308)">
            <path d="M8.00033 0.666748V2.00008M8.00033 14.0001V15.3334M2.81366 2.81341L3.76033 3.76008M12.2403 12.2401L13.187 13.1867M0.666992 8.00008H2.00033M14.0003 8.00008H15.3337M2.81366 13.1867L3.76033 12.2401M12.2403 3.76008L13.187 2.81341M11.3337 8.00008C11.3337 9.84103 9.84127 11.3334 8.00033 11.3334C6.15938 11.3334 4.66699 9.84103 4.66699 8.00008C4.66699 6.15913 6.15938 4.66675 8.00033 4.66675C9.84127 4.66675 11.3337 6.15913 11.3337 8.00008Z" stroke="var(--normal-layout-text-secondary-color)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_86_308">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div class="flex h-full px-2 ml-2 items-center justify-center logout-area" @click="handlelogout">
          <LogoutOutlined class="text-xl text-red-500 logout-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
.logout-area {
  pointer-events: auto;

  .logout-icon {
    transition: all 0.2s ease;
  }

  &:hover {
    .logout-icon {
      scale: 1.2;
      font-weight: bold;
    }
  }
}

.theme-toggle {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
