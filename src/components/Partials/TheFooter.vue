<template>
  <div class="flex items-end justify-center h-full w-full">
    <div class="bg-white h-10 w-full">
      <ul class="flex h-full items-center justify-around text-sm">
        <li>{{ t("banner.quem-somos") }}</li>
        <li>{{ t("banner.privacidade") }}</li>
        <li>{{ t("banner.termos") }}</li>
        <li>{{ t("banner.viageiros") }}</li>
        <li>{{ t("banner.duvidas") }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
