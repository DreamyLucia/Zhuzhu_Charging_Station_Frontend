<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import DashboradLayout from '@/layouts/DashboardLayout/index.vue'
import LoadingWrapper from '@/components/LoadingWrapper/index.vue'
import { getUserInfoApi } from '@/api/user';
import type { UserType } from '@/types/user';
import type { StationType } from '@/types/station';
import { t } from '@/locales';
import { message } from 'ant-design-vue'

const user = ref<UserType>({
  userId: 0,
  username: '',
  roles: [],
  totalChargeCount: 0,
  totalChargeAmount: 0,
  totalChargeDuration: 0,
  totalChargeFee: 0,
  totalServiceFee: 0,
  totalFee: 0,
});

const isLoading = ref(true)

const fetchUserInfo = async () => {
  try {
    user.value = await getUserInfoApi()
  }
  catch (error) {
    message.error(t('message.error.getUserInfoError'))
    console.error('获取用户信息失败:', error)
  }
  finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

onMounted(() => {
  fetchUserInfo();
})
</script>

<template>
  <LoadingWrapper :loading="isLoading" class="w-full h-full normal-bg">
    <DashboradLayout :user="user">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </DashboradLayout>
  </LoadingWrapper>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
</style>
