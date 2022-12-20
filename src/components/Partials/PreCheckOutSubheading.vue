<template>
  <div class="grid grid-cols-3">
    <div class="flex items-center px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />

      <p class="font-semibold px-3">Veja outras opçoes de voos</p>
    </div>
    <div class="flex self-center place-self-end">
      <ClockOffers />
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from '@/components/Icons/ArrowLeft.vue';
import ClockOffers from "@/components/Purchase/ClockOffers.vue";
</script>
