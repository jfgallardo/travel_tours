<template>
  <ButtonFilter :loading="woobaStore.loading" />
  <div v-if="woobaStore.loading">
    <SkeletonSearch />
    <SkeletonSearch />
  </div>
  <template v-else>
    <div v-if="showData" class="pb-24">
      <div class="px-8 pt-6 font-semibold">{{filterStore.flyFilters.length}} Resultados </div>
      <TransitionGroup name="list" tag="ul">
      <div v-for="viagem in filterStore.flyFilters" :key="viagem.Key">
        <IdaVoltaFlex :viagem="viagem" />
      </div>
      </TransitionGroup>

<!--      <div class="flex justify-center pb-24">
        <button
          class="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 disabled:bg-blue-400 disabled:opacity-50"
          :disabled="disableBottom"
          @click="displayResults"
        >
          <span>{{ $t('voosIdaVolta.exibirMaisResultados') }}</span>
          <svg
            v-if="loadData"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 animate-spin"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </button>
      </div>-->
    </div>
    <div v-else>
      <div class="grid px-4 pt-28 bg-white place-content-center">
        <div class="text-center">
          <h1 class="font-black text-gray-200 text-9xl">404</h1>
          <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ops!
          </p>
          <p class="mt-4 text-gray-500">{{$t('voosIdaVolta.pesquisar')}}</p>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import ButtonFilter from '@/components/Aereo/ButtonFilter.vue';
import SkeletonSearch from '@/components/Partials/SkeletonSearch.vue';
import { useWoobaStore } from '@/stores/wooba';
import IdaVoltaFlex from '@/components/Aereo/IdaVoltaFlexRender.vue';
//import IdaVoltaNoFlex from '@/components/Aereo/IdaVoltaNoFlexRender.vue';
import { useFiltersStore } from '@/stores/filters';

const woobaStore = useWoobaStore();
const filterStore = useFiltersStore();

const showData = computed(() => {
  return filterStore.flyFilters.length > 0;
});

/*const displayResults = () => {
  loadData.value = true;
  searchOptionsVoo.quantidadeDeVoos = searchOptionsVoo.quantidadeDeVoos + 10;
  woobaStore.displayMoreResults().then(() => {
    loadData.value = false;
  });
};

const disableBottom = computed(() => {
  return 50 === woobaStore.outboundFlights.length;
});*/


</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
