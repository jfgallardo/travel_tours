<template>
  <div class="flex items-center justify-around">
    <div>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7 bg-gray-200 rounded-full p-1 cursor-pointer"
          @click="$router.go(-1)"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
    </div>

    <div>
      <p class="font-medium text-xl">CHECKOUT</p>
    </div>

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
        <span class="absolute text-xs">{{ userStore.currentStepPayment + 1 }}/5</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const title = computed(() => {
  if (userStore.currentStepPayment === 0) {
    return 'Com Pagar';
  } else if (userStore.currentStepPayment === 1) {
    return 'Detalhes';
  } else if (userStore.currentStepPayment === 2) {
    return 'Detalhes';
  }else if (userStore.currentStepPayment === 3) {
    return 'Endereço de cobrança';
  }else if (userStore.currentStepPayment === 4) {
    return 'Endereço de cobrança';
  }
  return 'Informações de acesso';
});

const circumference = computed(() => {
  return 20 * 2 * Math.PI;
});

const percent = computed(() => {
  return Math.round((userStore.currentStepPayment / 5) * 100);
});
</script>

<style scoped></style>
