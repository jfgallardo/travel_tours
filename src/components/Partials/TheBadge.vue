<template>
  <div class="relative">
    <slot></slot>
    <div
      class="text-xs -mr-5 -mt-5 bg-gray-200 opacity-90 rounded-full text-black font-bold absolute py-1 px-2 top-0 left-0"
    >
      <span> {{ t('components.badge-text') }}</span>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style></style>
