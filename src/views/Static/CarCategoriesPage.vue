<template>
  <div>
    <div class="container mx-auto px-4 pt-5 pb-16 space-y-10">
      <div class="flex items-center justify-center space-x-3">
        <div class="w-32 border"></div>
        <h1 class="text-blue-700 text-3xl font-light">
          {{ t('pageCarCategories.title1') }}
        </h1>
        <div class="w-32 border"></div>
      </div>

      <div class="flex items-center space-x-10">
        <TariffMarket
          header="MOVIDA"
          color="bg-blue-800"
          :price="129"
          :hundred="90"
          group="Grupo AX"
        />
        <TariffMarket
          header="UNIDAS"
          color="bg-blue-700"
          :price="129"
          :hundred="90"
          group="Grupo AM"
        />
        <TariffMarket
          header="LOCALIZA"
          color="bg-blue-600"
          :price="152"
          :hundred="22"
          group="Grupo A"
        />
      </div>

      <div class="flex items-center justify-center space-x-3">
        <div class="w-32 border"></div>
        <h1 class="text-blue-700 text-3xl font-light">
          {{ t('pageCarCategories.title2') }}
        </h1>
        <div class="w-32 border"></div>
      </div>

      <div class="flex items-center justify-evenly">
        <div
          class="bg-gradient-to-r from-blue-700 to-cyan-400 h-80 w-80 flex justify-center items-center"
        >
          <p class="text-white text-3xl">
            {{ t('pageCarCategories.national') }}
          </p>
        </div>
        <div
          class="bg-gradient-to-r from-cyan-400 to-blue-700 h-80 w-80 flex justify-center items-center"
        >
          <p class="text-white text-3xl">
            {{ t('pageCarCategories.international') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TariffMarket from '@/components/Static/TariffMarket.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<style></style>
