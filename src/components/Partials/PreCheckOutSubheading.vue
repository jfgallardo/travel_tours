<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div>
      <p class="font-semibold">Veja outras opçoes de voos</p>
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from '@/components/Icons/ArrowLeft.vue';
</script>
