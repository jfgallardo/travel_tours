<template>
  <div>
    <div class="flex flex-col space-y-5 justify-center text-center h-96">
      <div class="font-bold md:text-9xl text-7xl">MR TRAVEL & TOURS</div>
      <div class="text-5xl">{{ t('hero.subtitle') }}</div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
