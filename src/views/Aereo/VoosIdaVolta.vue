<template>
  <div class="pb-10">
    <div class="py-5">
      <ButtonFilter :loading="woobaStore.loading" />
    </div>
    <div v-if="woobaStore.loading">
      <SkeletonSearch />
      <SkeletonSearch />
    </div>
    <div v-else>
      <template v-if="!woobaStore.returnFlights">
        <div v-for="viagem in woobaStore.outboundFlights" :key="viagem.Key">
          <IdaVoltaFlex :viagem="viagem" />
          <br />
        </div>
      </template>
      <template v-else>
        <IdaVoltaNoFlex />
      </template>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue';
import ButtonFilter from '@/components/Aereo/ButtonFilter.vue';
import SkeletonSearch from '@/components/Partials/SkeletonSearch.vue';
import { useWoobaStore } from '@/stores/wooba';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import IdaVoltaFlex from '@/components/Aereo/IdaVoltaFlexRender.vue';
import IdaVoltaNoFlex from '@/components/Aereo/IdaVoltaNoFlexRender.vue';

onMounted(() => {
  search();
});
onUnmounted(() => woobaStore.clear());

const woobaStore = useWoobaStore();
const searchOptionsVoo = useSearchOptionsVooStore();

const search = () => {
  let payload = {
    Origem: searchOptionsVoo.origin.iata,
    Destino: searchOptionsVoo.destiny.iata,
    Ida: formatterDateS(searchOptionsVoo.dateOfDeparture),
    Volta: formatterDateS(searchOptionsVoo.dateOfReturn),
    Adultos: searchOptionsVoo.adults,
    Criancas: searchOptionsVoo.teenagers,
    Bebes: searchOptionsVoo.babies,
  };
  woobaStore.consultaOrigemDestino(payload);
};

const formatterDateS = (date) => {
  let dateParts = date.split('/');
  return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
};
</script>

<style scoped></style>
