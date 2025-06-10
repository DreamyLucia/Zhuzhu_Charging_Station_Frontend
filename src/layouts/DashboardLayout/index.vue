<script setup lang="ts">
import Siderbar from '@/components/Siderbar/index.vue';
import type { UserType } from '@/types/user'

const props = defineProps<{ user: UserType }>()
</script>

<template>
  <div class="flex h-full w-full normal-bg flex px-4 py-4">
    <Siderbar :user="props.user" class="w-[15%] mr-4" />
    <div class="flex flex-1 h-full">
      <slot />
    </div>
  </div>
</template>
