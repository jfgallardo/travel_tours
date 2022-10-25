<template>
  <Loader v-if="moblixStore.loading" />

  <div v-else class="pr-5">
    <div class="py-5">
      <ButtonFilter />
    </div>

    <div>
      <span class="font-bold">{{ resultCount }} Resultados</span>
    </div>

    <div>
      <div class="flex flex-row mt-2 space-x-2">
        <div class="basis-9/12 border border-gray-300">
          <div class="border-b py-2">
            <span class="px-4 font-medium"
              >{{ moblixStore.outboundFlights.length }} Vuelos de Ida</span
            >
          </div>

          <div>
            <div>
              <RenderFlights
                :flights="moblixStore.outboundFlights"
                @selectVoo="vooDetalhesOutboundFlights"
              />
            </div>
          </div>
        </div>
        <div class="basis-3/12 border border-gray-300">
          <FlightDetalhes :vooDetalhes="vooDetalhesOutbound" />
        </div>
      </div>

      <div class="flex flex-row space-x-2">
        <div class="basis-9/12 border border-t-0 border-gray-300">
          <div class="border-b py-2">
            <span class="px-4 font-medium"
              >{{ moblixStore.returnFlights.length }} Vuelos de Vuelta</span
            >
          </div>

          <div>
            <div>
              <RenderFlights
                :flights="moblixStore.returnFlights"
                @selectVoo="vooDetalhesReturnFlights"
              />
            </div>
          </div>
        </div>
        <div class="basis-3/12 border border-gray-300">
          <FlightDetalhes :vooDetalhes="vooDetalhesReturn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonFilter from '@/components/FlightQuery/ButtonFilter.vue';
import FlightDetalhes from '@/components/FlightQuery/FlightDetalhes.vue';
import RenderFlights from '@/components/FlightQuery/RenderFlights.vue';
import Loader from '@/components/Partials/LoaderSearch.vue';
import { useMoblixStore } from '@/stores/moblix';
import { onUnmounted, onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const moblixStore = useMoblixStore();
const route = useRoute();

onMounted(() => {
  search();
});

let vooDetalhesReturn = ref(null);
let vooDetalhesOutbound = ref(null);

const resultCount = computed(() => {
  return moblixStore.outboundFlights.length + moblixStore.returnFlights.length;
});

onUnmounted(() => moblixStore.clear());

const search = () => {
  let payload = {
    Origem: route.params.source,
    Destino: route.params.destiny,
    Ida: route.params.departure_date,
    Volta: route.params.return_date,
    Adultos: route.query.adults,
    Criancas: route.query.childs,
    Bebes: route.query.bebes,
    Companhia: route.query.company,
  };
  moblixStore.consultaAereo(payload);
};

const vooDetalhesReturnFlights = (fligth) => {
  vooDetalhesReturn.value = fligth;
};

const vooDetalhesOutboundFlights = (fligth) => {
  vooDetalhesOutbound.value = fligth;
};
</script>

<style scoped></style>
