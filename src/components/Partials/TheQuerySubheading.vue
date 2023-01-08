<template>
  <div class="flex items-center">
    <div>
      <ArrowLeft class="cursor-pointer mx-3" @click="$router.go(-1)" />
    </div>
<!--grid grid-cols-9 grid-flow-row w-full h-full-->
    <div class="flex overflow-x-auto xl:justify-between xl:w-full">
      <SelectSimple :loading="woobaStore.loading" :options="bags" placeholder="Bagagem" @select-value="filters.baggage = $event">
        <template v-if="filters.baggage.value === 0" #selectedSpace>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 xl:h-6 xl:w-6">
            <path d="M12 19C14.2091 19 16 17.2091 16 15C16 12.7909 14.2091 11 12 11C9.79086 11 8 12.7909 8 15C8 17.2091 9.79086 19 12 19Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.07 16.11L10.95 14" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.05 14.02L10.93 16.14" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8C3.73 8 3.03 9.99 3.3 12.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        <template v-else #selectedSpace>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 xl:h-6 xl:w-6">
          <path d="M12 19C14.2091 19 16 17.2091 16 15C16 12.7909 14.2091 11 12 11C9.79086 11 8 12.7909 8 15C8 17.2091 9.79086 19 12 19Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.44 15L11.09 15.65C11.28 15.84 11.59 15.85 11.78 15.66L13.56 14.02" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8C3.73 8 3.03 9.99 3.3 12.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </template>
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" placeholder="Compania">
        <FilterCompanies
          v-model="filters.flightCompanies" :companies="woobaStore.companies" />
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" placeholder="Areopuertos">
        <template v-if="filters.airports.length > 0" #showSelected>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
            <path d="M9.02999 21.69L11.36 19.73C11.71 19.43 12.29 19.43 12.64 19.73L14.97 21.69C15.51 21.96 16.17 21.69 16.37 21.11L16.81 19.78C16.92 19.46 16.81 18.99 16.57 18.75L14.3 16.47C14.13 16.31 14 15.99 14 15.76V12.91C14 12.49 14.31 12.29 14.7 12.45L19.61 14.57C20.38 14.9 21.01 14.49 21.01 13.65V12.36C21.01 11.69 20.51 10.92 19.89 10.66L14.3 8.25001C14.14 8.18001 14 7.97001 14 7.79001V4.79001C14 3.85001 13.31 2.74001 12.47 2.31001C12.17 2.16001 11.82 2.16001 11.52 2.31001C10.68 2.74001 9.98999 3.86001 9.98999 4.80001V7.80001C9.98999 7.98001 9.84999 8.19001 9.68999 8.26001L4.10999 10.67C3.48999 10.92 2.98999 11.69 2.98999 12.36V13.65C2.98999 14.49 3.61999 14.9 4.38999 14.57L9.29999 12.45C9.67999 12.28 9.99999 12.49 9.99999 12.91V15.76C9.99999 15.99 9.86999 16.31 9.70999 16.47L7.43999 18.75C7.19999 18.99 7.08999 19.45 7.19999 19.78L7.63999 21.11C7.81999 21.69 8.47999 21.97 9.02999 21.69Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        <FilterAirport
          v-model="filters.airports"
          :airports="woobaStore.airportsFilter"/>
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
import { useFiltersStore } from "@/stores/filters";

const searchOptionsVoo = useSearchOptionsVooStore();
const woobaStore = useWoobaStore();
const filters = useFiltersStore();

const t_llegada = ref(null);
const t_partida = ref(null);
//FILTERS
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
    filters.flightCompanies = state.map((o) => {
      return o.CodigoIata;
    });
  },
  { deep: true }
);

watch(
  () => woobaStore.airportsFilter,
  (state) => {
    filters.airports = state;
  },
  { deep: true }
);

const bags = computed(() => {
  if (searchOptionsVoo.onlyBaggage) {
    return [{ name: "Apenas com babagem", value: 1 }];
  }
  return [
    { name: "Apenas com babagem", value: 1 },
    { name: "Apenas sim babagem", value: 0 }
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
