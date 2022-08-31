<template>
  <div class="banner">
    <div class="h-full flex items-center justify-center relative">

      <div class="w-full">
        <Footer />
      </div>

      <div class="absolute bottom-5 text-center md:flex md:items-center md:space-x-10">
        <p class="font-bold text-7xl md:text-6xl text-white pb-5" v-html="t('banner.title')"></p>

        <button class="bg-white font-bold px-6 py-3 text-lg">
          {{  t("banner.button")  }}
        </button>
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




<!-- <div class="grid grid-cols-1 grid-rows-2 h-full">
      <Footer/>
      <div class="flex items-end justify-center h-full w-full sm:text-center">
        <div class="flex items-center sm:flex-col space-x-36 sm:space-x-0">
          <div class="font-bold text-7xl sm:text-6xl text-white pb-5">
            <p v-html="t('banner.title')"></p>
          </div>
          <div>
            <button class="bg-white font-bold px-6 py-3 text-lg sm:px-8 sm:py-5 sm:text-2xl">
              {{ t("banner.button") }}
            </button>
          </div>
        </div>
      </div>
    </div> -->



    <!-- -->