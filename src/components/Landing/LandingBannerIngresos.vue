<template>
  <div class="banner">
    <div class="flex flex-col items-center justify-center h-full space-y-10">
      <div class="text-white font-bold text-8xl md:text-7xl">
        {{ t("banner-ingresos.title") }}
      </div>
      <div>
        <button class="font-semibold bg-white px-4 py-2 hover:bg-gray-200">
          {{ t("banner-ingresos.button") }}
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
  background: url("@/assets/img/ingresos.jpg");
  background-size: cover;
  background-position: center center;
  height: 650px;
}
</style>
