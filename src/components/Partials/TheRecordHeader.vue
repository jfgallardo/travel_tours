<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div class="w-full flex items-center justify-evenly">
      <p class="font-medium text-xl">CHECKOUT</p>
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from '@/components/Icons/ArrowLeft.vue';
</script>

<style scoped></style>
