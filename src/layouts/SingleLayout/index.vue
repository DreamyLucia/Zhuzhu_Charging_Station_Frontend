<script setup lang="ts">
import { useRouter } from 'vue-router';
import { t } from '@/locales';

const router = useRouter();

const gotoHome = () => {
  router.push({ name: 'Dashboard' });
};
</script>

<template>
  <a-layout style="height: 100vh;" class="overflow-auto normal-bg">
    <div class="flex justify-start items-center my-4 gap-2 mx-4">
      <img src="@/assets/logo.png" alt="logo" class="h-10 cursor-pointer rounded-[10px]" @click="gotoHome">
      <span class="text-2xl font-bold primary cursor-pointer" @click="gotoHome">{{ t('productName') }}</span>
    </div>
    <slot name="content" />
  </a-layout>
</template>

<style>
@use '@/style/custom-theme' as *;
</style>
