<script setup lang="ts">
import { t } from '@/locales';
import { getUserInfoApi } from '@/api/user';
import { logoutApi } from '@/api/login';
import type { UserType } from '@/types/user';
import { message } from 'ant-design-vue'
import {
  AppstoreOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons-vue';
import DigitalDisplay from '@/components/DigitalDisplay/index.vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ user: UserType }>()
const router = useRouter();
const isAdmin = props.user.roles.includes('ROLE_ADMIN')

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
        action: () => message.success(t('message.success.adminPanel')),
      }
    : null,
  {
    icon: SettingOutlined,
    title: t('dashboardSiderbar.button.settings'),
    action: () => message.success(t('message.success.settings')),
  },
].filter(Boolean); // 过滤掉 null

const digitalList = [
  {
    title: t('dashboardSiderbar.digitalTitle.totalDuration'),
    number: props.user.totalChargeDuration,
    unit: t('unit.time'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalCount'),
    number: props.user.totalChargeCount,
    unit: t('unit.times'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalFee'),
    number: props.user.totalChargeFee,
    unit: t('unit.currency'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalServiceFee'),
    number: props.user.totalServiceFee,
    unit: t('unit.currency'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalAmount'),
    number: props.user.totalChargeAmount,
    unit: t('unit.degree'),
  },
  {
    title: t('dashboardSiderbar.digitalTitle.totalCost'),
    number: props.user.totalFee,
    unit: t('unit.currency'),
  },
]

const handlelogout = async () => {
  await logoutApi()
  message.success(t('message.success.logout'))
}
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
        <div class="flex h-full px-2 ml-auto items-center justify-center logout-area" @click="handlelogout">
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
</style>
