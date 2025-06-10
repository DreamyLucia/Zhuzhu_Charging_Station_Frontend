<script setup lang="ts">
import { t } from '@/locales';
import { getUserInfoApi } from '@/api/user';
import type { User } from '@/types/user';
import { onMounted, ref } from 'vue';
import { message } from 'ant-design-vue'

const user = ref<User | null>(null)

const fetchUserInfo = async () => {
  try {
    user.value = await getUserInfoApi()
  }
  catch (error) {
    message.error('获取用户信息失败')
    console.error('获取用户信息失败:', error)
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <div class="w-full h-full">
    <!-- 头部 -->
    <div class="flex items-center gap-3 cursor-pointer justify-center">
      <div class="h-12 w-12">
        <img src="@/assets/logo.png" alt="Logo" class="h-full w-full object-contain">
      </div>
      <span class="text-3xl font-bold ml-2 primary">{{ t('productName') }}</span>
    </div>

    <!-- 主体 -->
  </div>
</template>
