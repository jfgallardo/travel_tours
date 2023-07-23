<template>
  <div class="pb-24">
    <ButtonFilter :loading="vooStore.loading" />
    <div v-if="vooStore.loading">
      <SkeletonSearch />
      <SkeletonSearch />
    </div>

    <template v-else>
      <template v-if="showData">
        <template v-if="vooStore.Ida.length > 0 && vooStore.Volta.length === 0">
          <div class="flex flex-col px-8">
            <LazyList
              :objetos="filterStore.flyFilters.Ida"
              :cantidad-visible="5"
              current-tab="IdaVoltaFlex"
              type-flight="I"
            />
          </div>
        </template>
        <template
          v-else-if="vooStore.Ida.length > 0 && vooStore.Volta.length > 0"
        >
          <div :class="containerClasses">
            <div
              class="flex flex-col justify-between"
              :class="areSelectedButton ? 'w-full px-4' : 'px-8'"
            >
              <LazyList
                :objetos="filterStore.flyFilters.Ida"
                :cantidad-visible="5"
                current-tab="IdaVoltaNoFlex"
                type-flight="I"
                @he-selected="areSelected"
              />

              <LazyList
                :objetos="filterStore.flyFilters.Volta"
                :cantidad-visible="5"
                current-tab="IdaVoltaNoFlex"
                type-flight="V"
                @he-selected="areSelected"
              />
            </div>
            <div
              v-if="areSelectedButton"
              class="w-2/5 border border-gray-300 relative"
            >
              <FlightDetalhesManual />
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="grid px-4 pt-28 bg-white place-content-center">
          <div class="text-center">
            <h1 class="font-black text-gray-200 text-9xl">404</h1>
            <p
              class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Ops!
            </p>
            <p class="mt-4 text-gray-500">{{ $t('voosIdaVolta.pesquisar') }}</p>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import ButtonFilter from '@/components/Aereo/ButtonFilter.vue';
import { useVooStore } from '@/stores/voo';
import SkeletonSearch from '@/components/Partials/SkeletonSearch.vue';
import { computed, ref } from 'vue';
import { useFiltersStore } from '@/stores/filters';
import LazyList from '@/components/Partials/LazyList.vue';
import Cookies from 'js-cookie';
import FlightDetalhesManual from '@/components/Aereo/FlightDetalhesManual.vue';

const vooStore = useVooStore();
const filterStore = useFiltersStore();
const areSelectedButton = ref(false);

const showData = computed(() => {
  return Object.keys(filterStore.flyFilters).length > 0;
});

const areSelected = () => {
  const i = Cookies.get('I') ? JSON.parse(Cookies.get('I')) : null;
  const v = Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;
  areSelectedButton.value = !!(i && v);
};

const containerClasses = computed(() => {
  return {
    'flex flex-col xl:flex-row 2xl:items-stretch space-x-3 w-full h-full mx-auto':
      isRowLayout.value,
    'pr-8 pl-4': isRowLayout.value,
  };
});

const isRowLayout = computed(() => {
  return areSelectedButton.value;
});
</script>

<style scoped></style>
