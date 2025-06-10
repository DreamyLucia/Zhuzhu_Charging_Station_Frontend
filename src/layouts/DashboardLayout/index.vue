<script setup lang="ts">
import Siderbar from '@/components/Siderbar/index.vue';
</script>

<template>
  <div class="w-full h-full normal-bg flex px-4 py-2">
    <Siderbar class="w-[25%]" />
    <div class="h-full w-[75%]">
      <slot />
    </div>
  </div>
</template>
