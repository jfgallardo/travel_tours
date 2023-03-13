<template>
  <div>
    <div class="lg:container lg:mx-auto lg:px-40 lg:py-20">
      <div
        class="pb-8 bg-blue-700 lg:h-96 flex flex-col justify-center px-14 space-y-3 pt-16 text-left"
      >
        <div class="text-white font-bold text-6xl md:text-8xl">
          <p v-html="t('miles.title')"></p>
        </div>
        <div class="text-white font-light text-lg">
          {{ t('miles.subtitle') }}
        </div>
        <div>
          <button
            class="bg-white text-blue-600 text-2xl font-semibold py-2 px-4"
          >
            {{ t('miles.button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.bg-blue-700{
  background-image: url("../../assets/img/logo1.svg");
  background-repeat: no-repeat;
  background-position: right;
}
</style>
