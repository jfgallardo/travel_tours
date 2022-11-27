<template>
  <div class="pb-20">
    <div class="py-5">
      <ButtonFilter :loading="woobaStore.loading" />
    </div>
    <div v-if="woobaStore.loading">
      <SkeletonSearch />
      <SkeletonSearch />
    </div>
    <div v-else>
      <template v-if="!woobaStore.returnFlights">
        <div v-for="viagem in dataViagems" :key="viagem.Key">
          <IdaVoltaFlex :viagem="viagem" />
          <br />
        </div>
        <div class="flex justify-center">
          <button class="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 disabled:bg-blue-400 disabled:opacity-50" @click="displayResults" :disabled="disableBottom">
            <span>Exibir mais resultados</span>
            <svg v-if="loadData" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-spin">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </button>
        </div>
      </template>
      <template v-else>
        <IdaVoltaNoFlex />
      </template>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted, ref, computed } from 'vue';
import ButtonFilter from '@/components/Aereo/ButtonFilter.vue';
import SkeletonSearch from '@/components/Partials/SkeletonSearch.vue';
import { useWoobaStore } from '@/stores/wooba';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import IdaVoltaFlex from '@/components/Aereo/IdaVoltaFlexRender.vue';
import IdaVoltaNoFlex from '@/components/Aereo/IdaVoltaNoFlexRender.vue';

onMounted(() => {
  search();
});
onUnmounted(() => {
  woobaStore.clear()
});

const woobaStore = useWoobaStore();
const searchOptionsVoo = useSearchOptionsVooStore();

let dataViagems = ref([]);
let interval = ref(null);
let loadData = ref(false);
let numberRef = ref(0)

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
  woobaStore.consultaOrigemDestino(payload).then(() => {
    dataViagems.value = chunkArray(woobaStore.outboundFlights, 5)[
      numberRef.value
    ];
  });
};

const formatterDateS = (date) => {
  let dateParts = date.split('/');
  return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
};

const chunkArray = (array, chunkSize) => {
  let chunckedArrays = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunckedArrays.push(chunk);
  }
  return chunckedArrays;
}

const displayResults = () => {
  loadData.value = true;
  interval.value = setInterval(() => {
    //dataViagems.value.push() chunkArray(woobaStore.outboundFlights, 5 + i)[i];
    numberRef.value++
    chunkArray(woobaStore.outboundFlights, 5)[numberRef.value].map((item) => {
      dataViagems.value.push(item);
    })
    loadData.value = false;
    clearInterval(interval.value);
  }, 2000);
};

const disableBottom = computed(() => {
  return dataViagems.value.length === woobaStore.outboundFlights.length
})
</script>

<style scoped></style>
