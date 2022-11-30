<template>
  <div class="banner">
    <div
      class="flex flex-col items-center justify-end md:justify-center h-full space-y-8 text-center pb-8"
    >
      <div class="text-white font-bold text-5xl md:text-7xl">
        {{ t('banner-ingresos.title') }}
      </div>
      <div>
        <button
          class="font-semibold bg-white px-4 py-2 hover:bg-gray-200"
          @click="cotarIngresos"
        >
          {{ t('banner-ingresos.button') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const cotarIngresos = () => {
  const link = document.createElement('a');
  const message = `https://api.whatsapp.com/send?phone=5585981708574&text=${t(
    'banner-ingresos.wtsapp'
  )}`;
  link.setAttribute('href', message);
  link.setAttribute('target', '_blank');
  link.click();
};
</script>

<style scoped>
.banner {
  background: url('@/assets/img/ingresos.jpg');
  background-size: cover;
  background-position: center center;
  height: 650px;
}
</style>
