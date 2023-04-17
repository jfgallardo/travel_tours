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
          <div>SOLO IDA</div>
        </template>
        <template
          v-else-if="vooStore.Ida.length > 0 && vooStore.Volta.length > 0"
        >
          <div class="flex flex-col px-8">
            <div>
              <p class="font-medium">
                {{ $t('idaVoltaFlexRender.vuelosDeIda') }}
              </p>
              <LazyList
                :objetos="filterStore.flyFilters.Ida"
                :cantidad-visible="5"
                current-tab="IdaVoltaNoFlex"
              />
            </div>

            <div>
              <p class="font-medium">
                {{ $t('idaVoltaFlexRender.vuelosDeVuelta') }}
              </p>
              <LazyList
                :objetos="filterStore.flyFilters.Volta"
                :cantidad-visible="5"
                current-tab="IdaVoltaNoFlex"
              />
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
import { computed } from 'vue';
import { useFiltersStore } from '@/stores/filters';
import LazyList from '@/components/Partials/LazyList.vue';

const vooStore = useVooStore();
const filterStore = useFiltersStore();

const showData = computed(() => {
  return Object.keys(filterStore.flyFilters).length > 0;
});

/**
 * 3 posibilidades:
 * 1. Solo ida (p1 y 2) (Ida > 0 y Volta = 0)
 * 2. Ida y vuelta (juntos) (p2) (Luego)
 * 3. Ida y vuelta separados (p1 y p2) (Ida > 0 y Vuelta > 0)
 */
</script>

<style scoped></style>
