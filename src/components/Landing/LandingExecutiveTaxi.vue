<template>
  <div>
    <HeroImage>
      <template #image>
        <img src="@/assets/img/car.jpg" class="h-full w-full object-cover" />
      </template>
      <template #title>
        {{ t('hero-taxi.title') }}
      </template>
      <template #subtitle>
        {{ t('hero-taxi.subtitle') }}
      </template>
      <template #button>
        <button
          class="bg-blue-700 text-white py-2 px-6 hover:bg-blue-800"
          @click="cotarTaxi"
        >
          {{ t('hero-taxi.button') }}
        </button>
      </template>
    </HeroImage>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import HeroImage from '@/components/Partials/TheHeroImage.vue';

const { t } = useI18n();

const cotarTaxi = () => {
  const link = document.createElement('a');
  const message = `https://api.whatsapp.com/send?phone=5585981708574&text=${t(
    'hero-taxi.wtsapp'
  )}`;
  link.setAttribute('href', message);
  link.setAttribute('target', '_blank');
  link.click();
};
</script>
