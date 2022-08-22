<template>
  <div class="banner">
    <div class="grid grid-cols-1 grid-rows-2 h-full">
      <Footer />
      <div class="flex items-end justify-center h-full w-full">
        <div class="flex items-center space-x-36">
          <div class="font-bold text-7xl text-white pb-5">
            <p v-html="t('banner.title')"></p>
          </div>
          <div>
            <button class="bg-white font-bold px-6 py-3 text-lg">
              {{ t("banner.button") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import Footer from "@/components/Partials/TheFooter.vue";
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
