<template>
  <div>
    <div class="bg-white py-3 invisible md:visible">
      <ul class="grid grid-cols-6 grid-rows-1 justify-items-center text-sm">
        <li>© 2022 Mr Travel & Tours, Inc.</li>
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
