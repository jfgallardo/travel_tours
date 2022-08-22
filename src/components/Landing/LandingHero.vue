<template>
  <div>
    <div
      class="flex flex-col space-y-5 items-center justify-center w-full h-96 mx-auto"
    >
      <div class="font-bold text-8xl">MR TRAVEL & TOURS</div>
      <div class="text-4xl">{{ t("hero.subtitle") }}</div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
