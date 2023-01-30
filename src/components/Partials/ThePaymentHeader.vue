<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div class="w-full flex items-center justify-evenly">
      <p class="font-medium text-xl">CHECKOUT</p>
      <div class="flex items-center space-x-3">
        <p>{{title}}</p>
        <div
          class="inline-flex items-center justify-center overflow-hidden rounded-full"
        >
          <svg class="w-10 h-10">
            <circle
              class="text-gray-300"
              stroke-width="3"
              stroke="currentColor"
              fill="transparent"
              r="15"
              cx="20"
              cy="20"
            />
            <circle
              class="text-blue-700"
              stroke-width="3"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - (percent / 100) * circumference"
              stroke-linecap="round"
              stroke="currentColor"
              fill="transparent"
              r="15"
              cx="20"
              cy="20"
            />
          </svg>
          <span class="absolute text-xs">{{ auth.currentStepPayment + 1 }}/5</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ArrowLeft from "@/components/Icons/ArrowLeft.vue";

const auth = useAuthStore();

const title = computed(() => {
  if (auth.currentStepPayment === 0) {
    return 'Com Pagar';
  } else if (auth.currentStepPayment === 1) {
    return 'Detalhes';
  } else if (auth.currentStepPayment === 2) {
    return 'Detalhes';
  }else if (auth.currentStepPayment === 3) {
    return 'Endereço de cobrança';
  }else if (auth.currentStepPayment === 4) {
    return 'Endereço de cobrança';
  }
  return 'Informações de acesso';
});

const circumference = computed(() => {
  return 20 * 2 * Math.PI;
});

const percent = computed(() => {
  return Math.round((auth.currentStepPayment / 5) * 100);
});
</script>

<style scoped></style>
