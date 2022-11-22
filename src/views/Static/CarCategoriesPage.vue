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

      <div
        class="flex flex-col md:flex-row items-center md:space-x-10 md:space-y-0 space-y-5"
      >
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
      <div class="flex items-center space-x-5 justify-center">
        <LocalizaCompany />
        <MovidaCompany />
        <UnidasCompany />
      </div>

      <div class="flex items-center justify-center space-x-3">
        <div class="w-32 border"></div>
        <h1 class="text-blue-700 text-3xl font-light">
          COMPANHIAS INTERNACIONAIS
        </h1>
        <div class="w-32 border"></div>
      </div>
      <div class="flex items-center space-x-5 justify-center">
        <AvisCompany />
        <DollarCompany />
        <HertzCompany />
      </div>
      <div class="flex items-center space-x-5 justify-center">
        <EuropCarCompany />
        <AlamoCompany />
      </div>
    </div>
  </div>
</template>
<script setup>
import TariffMarket from '@/components/Static/TariffMarket.vue';
import { useI18n } from 'vue-i18n';
import LocalizaCompany from '@/components/Static/LocalizaCompany.vue';
import MovidaCompany from '@/components/Static/MovidaCompany.vue';
import UnidasCompany from '@/components/Static/UnidasCompany.vue';
import AvisCompany from '@/components/Static/AvisCompany.vue';
import DollarCompany from '@/components/Static/DollarCompany.vue';
import EuropCarCompany from '@/components/Static/EuropCarCompany.vue';
import AlamoCompany from '@/components/Static/AlamoCompany.vue';
import HertzCompany from '@/components/Static/HertzCompany.vue';

const { t } = useI18n();
</script>
<style scoped></style>
