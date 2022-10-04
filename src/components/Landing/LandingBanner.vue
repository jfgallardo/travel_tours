<template>
  <div class="banner">
    <div class="h-full flex items-center justify-center relative">
      <div
        class="absolute bottom-5 text-center md:flex md:items-center md:space-x-10"
      >
        <p
          class="font-bold text-7xl md:text-6xl text-white pb-5"
          v-html="t('banner.title')"
        ></p>

        <button class="bg-white font-bold px-6 py-3 text-lg">
          {{ t("banner.button") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style scoped>
.banner {
  background: url("@/assets/img/banner.jpg");
  background-size: cover;
  background-position: center center;
  height: 650px;
}
</style>
