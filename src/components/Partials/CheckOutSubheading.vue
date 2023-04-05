<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div class="w-full flex justify-center">
      <p class="font-semibold">
        Agora falta pouco! Preencha seus dados e garanta sua compra
      </p>
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from '@/components/Icons/ArrowLeft.vue';
</script>
