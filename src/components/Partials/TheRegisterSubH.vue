<template>
  <div class="grid grid-cols-3 place-items-center row-span-2">
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
      <p class="font-medium text-2xl">{{ title }}</p>
    </div>

    <div class="flex items-center space-x-3">
      <div
        x-data="scrollProgress"
        class="inline-flex items-center justify-center overflow-hidden rounded-full"
      >
        <svg class="w-12 h-12">
          <circle
            class="text-gray-300"
            stroke-width="3"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="25"
            cy="25"
          />
          <circle
            class="text-blue-700"
            stroke-width="3"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="circumference - (percent / 100) * circumference"
            stroke-linecap="round"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="25"
            cy="25"
          />
        </svg>
        <span class="absolute">{{ authStore.currentStep + 1 }}/4</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const title = computed(() => {
  if (authStore.currentStep === 0) {
    return 'Dados cadastrais';
  } else if (authStore.currentStep === 1) {
    return 'Endereço';
  } else if (authStore.currentStep === 2) {
    return 'Contato';
  }
  return 'Informações de acesso';
});

const circumference = computed(() => {
  return 20 * 2 * Math.PI;
});

const percent = computed(() => {
  return Math.round((authStore.currentStep / 3) * 100);
});
</script>

<style scoped></style>
