<template>
  <div class="flex items-center">
    <div>
      <ArrowLeft class="cursor-pointer mx-3" @click="$router.go(-1)" />
    </div>
<!--grid grid-cols-9 grid-flow-row w-full h-full-->
    <div class="flex overflow-x-auto xl:justify-between xl:w-full">
      <SelectSimple :loading="woobaStore.loading" :options="bags" placeholder="Bagagem">
        <template #iconResponsive>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </template>
      </SelectSimple>
      <SelectSimple :loading="woobaStore.loading" placeholder="Compania">
        <FilterCompanies
          :companies="woobaStore.companies" :values="selectCompanies"
          @set-companies="selectCompanies = $event" />
      </SelectSimple>
      <SelectSimple :loading="woobaStore.loading" placeholder="Areopuertos">
        <FilterAirport
          :airports="woobaStore.airportsFilter"
          :values="selectAirports"
          @set-airports="selectAirports = $event" />
      </SelectSimple>
      <SelectSimple :loading="woobaStore.loading" placeholder="Llegada">
        <template v-if="t_llegada" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span v-if="t_llegada.initTime">Ida - {{ t_llegada.initTime }}</span>
            <span v-if="t_llegada.endTime"> Volta - {{ t_llegada.endTime }}</span>
          </div>
        </template>
        <FilterDepartureTime :times="t_llegada" @clear="t_llegada=null" @time="t_llegada=$event" />
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" placeholder="Partida">
        <template v-if="t_partida" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span v-if="t_partida.initTime">Ida - {{ t_partida.initTime }}</span>
            <span v-if="t_partida.endTime"> Volta - {{ t_partida.endTime }}</span>
          </div>
        </template>
        <FilterDepartureTime :times="t_partida" @clear="t_partida=null" @time="t_partida=$event" />
      </SelectSimple>
      <SelectSimple :loading="woobaStore.loading" :options="connection" placeholder="Paradas" />
      <SelectSimple :loading="woobaStore.loading" :options="classes" placeholder="Precio">
        <template v-if="price" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span> {{ minPriceFormatter }} - {{ maxPriceFormatter }} </span>
          </div>
        </template>
        <FilterPrice :min-price="woobaStore.priceGeral.minPrice" :max-price="woobaStore.priceGeral.maxPrice" @price="price = $event"/>
      </SelectSimple>



      <SelectSimple :loading="woobaStore.loading" placeholder="Duracion">
        <template v-if="duration" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span>Duracion {{ duration }}hrs </span>
          </div>
        </template>
        <FilterDuration
          v-model="duration"
          :max="woobaStore.travelTime.longerTime"
          :min="woobaStore.travelTime.lessTime" />
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" :options="classes" placeholder="Clase" />



    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import ArrowLeft from "@/components/Icons/ArrowLeft.vue";
import SelectSimple from "@/components/FormUI/TheSelectSimple.vue";
import { useSearchOptionsVooStore } from "@/stores/searchOptionsVoo";
import { useWoobaStore } from "@/stores/wooba";
import FilterDepartureTime from "@/components/Filters/FilterDepartureTime.vue";
import FilterDuration from "@/components/Filters/FilterDuration.vue";
import FilterPrice from "@/components/Filters/FilterPrice.vue";
import FilterAirport from "@/components/Filters/FilterAirport.vue";
import FilterCompanies from "@/components/Filters/FilterCompanies.vue";
import { useCurrencyFormatter } from "@/composables/currencyFormatter";

const searchOptionsVoo = useSearchOptionsVooStore();
const woobaStore = useWoobaStore();

const t_llegada = ref(null);
const t_partida = ref(null);
//FILTERS
const selectAirports = ref([]);
const selectCompanies = ref([]);
const price = ref('')
const duration = ref("");


const minPriceFormatter = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: woobaStore.priceGeral.minPrice
  });
})
const maxPriceFormatter = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: price.value
  });
})

watch(
  () => woobaStore.companies,
  (state) => {
    selectCompanies.value = state.map((o) => {
      return o.CodigoIata;
    });
  },
  { deep: true }
);

watch(
  () => woobaStore.airportsFilter,
  (state) => {
    selectAirports.value = state;
  },
  { deep: true }
);

const bags = computed(() => {
  if (searchOptionsVoo.onlyBaggage) {
    return [{ name: "Apenas com babagem", value: "1" }];
  }
  return [
    { name: "Com babagem", value: "1" },
    { name: "Sim babagem", value: "2" }
  ];
});

const connection = computed(() => {
  return [
    { name: "Directo", value: "D" },
    { name: "1 Parada", value: "O" },
    { name: "2 o más Paradas", value: "M" }
  ];
});

const classes = [
  {
    name: "Econômica",
    value: "Y"
  },
  {
    name: "Econômica Premium",
    value: "W"
  },
  {
    name: "Executiva",
    value: "C"
  },
  {
    name: "Primeira Classe",
    value: "F"
  },
  {
    name: "Econômica + Premium",
    value: "P"
  }
];

</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
