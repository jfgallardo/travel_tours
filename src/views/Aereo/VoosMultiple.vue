<template>
  <ButtonFilter :loading="woobaStore.loading" />
  <div v-if="woobaStore.loading">
    <SkeletonSearch :show="false"/>
    <SkeletonSearch :show="false"/>
  </div>
  <template v-else>
    <div v-if="showData" class="pb-24">
      <div class="px-8 pt-6 font-semibold">{{filterStore.flyFilters.length}} Resultados </div>
      <TransitionGroup name="list" tag="ul">
        <div v-for="viagem in filterStore.flyFilters" :key="viagem.Key">
          <VoosMultipleRender :viagem="viagem" />
        </div>
      </TransitionGroup>
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
import VoosMultipleRender from "@/components/Aereo/VoosMultipleRender.vue";
import { useFiltersStore } from '@/stores/filters';

const woobaStore = useWoobaStore();
const filterStore = useFiltersStore();

const showData = computed(() => {
  return filterStore.flyFilters.length > 0;
});


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
