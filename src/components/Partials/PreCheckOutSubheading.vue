<template>
  <div class="flex items-center justify-between lg:grid lg:grid-cols-3">
    <div class="flex items-center lg:px-3">
      <ArrowLeft class="cursor-pointer ml-2.5" @click="$router.go(-1)" />
      <p class="font-semibold px-3 text-center">Veja outras opçoes de voos</p>
    </div>
    <div class="flex self-center place-self-end pr-8">
      <ClockOffers small />
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from '@/components/Icons/ArrowLeft.vue';
import ClockOffers from '@/components/Purchase/ClockOffers.vue';
</script>
