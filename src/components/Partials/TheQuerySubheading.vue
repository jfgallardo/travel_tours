<template>
  <div class="flex items-center">
    <div>
      <ArrowLeft class="cursor-pointer mx-3" @click="$router.go(-1)" />
    </div>
    <!--grid grid-cols-9 grid-flow-row w-full h-full-->
    <div class="flex overflow-x-auto xl:justify-between xl:w-full">
      <SelectSimple
        :loading="woobaStore.loading"
        :options="bags"
        :placeholder="$t('querySubHeading.bagagem')"
        @select-value="filters.baggage = $event"
      >
        <template v-if="filters.baggage.value === 0" #selectedSpace>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 xl:h-6 xl:w-6"
          >
            <path
              d="M12 19C14.2091 19 16 17.2091 16 15C16 12.7909 14.2091 11 12 11C9.79086 11 8 12.7909 8 15C8 17.2091 9.79086 19 12 19Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.07 16.11L10.95 14"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.05 14.02L10.93 16.14"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8C3.73 8 3.03 9.99 3.3 12.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
        <template v-else #selectedSpace>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 xl:h-6 xl:w-6"
          >
            <path
              d="M12 19C14.2091 19 16 17.2091 16 15C16 12.7909 14.2091 11 12 11C9.79086 11 8 12.7909 8 15C8 17.2091 9.79086 19 12 19Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.44 15L11.09 15.65C11.28 15.84 11.59 15.85 11.78 15.66L13.56 14.02"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8C3.73 8 3.03 9.99 3.3 12.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </SelectSimple>

      <SelectSimple
        :loading="woobaStore.loading"
        :placeholder="$t('querySubHeading.compania')"
      >
        <FilterCompanies
          v-model="filters.flightCompanies"
          :companies="woobaStore.companies"
        />
      </SelectSimple>

      <SelectSimple
        :loading="woobaStore.loading"
        :placeholder="$t('querySubHeading.areopuertos')"
      >
        <template v-if="filters.airports.length > 0" #showSelected>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 lg:h-6 lg:w-6"
          >
            <path
              d="M9.02999 21.69L11.36 19.73C11.71 19.43 12.29 19.43 12.64 19.73L14.97 21.69C15.51 21.96 16.17 21.69 16.37 21.11L16.81 19.78C16.92 19.46 16.81 18.99 16.57 18.75L14.3 16.47C14.13 16.31 14 15.99 14 15.76V12.91C14 12.49 14.31 12.29 14.7 12.45L19.61 14.57C20.38 14.9 21.01 14.49 21.01 13.65V12.36C21.01 11.69 20.51 10.92 19.89 10.66L14.3 8.25001C14.14 8.18001 14 7.97001 14 7.79001V4.79001C14 3.85001 13.31 2.74001 12.47 2.31001C12.17 2.16001 11.82 2.16001 11.52 2.31001C10.68 2.74001 9.98999 3.86001 9.98999 4.80001V7.80001C9.98999 7.98001 9.84999 8.19001 9.68999 8.26001L4.10999 10.67C3.48999 10.92 2.98999 11.69 2.98999 12.36V13.65C2.98999 14.49 3.61999 14.9 4.38999 14.57L9.29999 12.45C9.67999 12.28 9.99999 12.49 9.99999 12.91V15.76C9.99999 15.99 9.86999 16.31 9.70999 16.47L7.43999 18.75C7.19999 18.99 7.08999 19.45 7.19999 19.78L7.63999 21.11C7.81999 21.69 8.47999 21.97 9.02999 21.69Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
        <FilterAirport
          v-model="filters.airports"
          :airports="woobaStore.airportsFilter"
        />
      </SelectSimple>

      <SelectSimple
        :loading="woobaStore.loading"
        :placeholder="$t('querySubHeading.llegada')"
      >
        <template v-if="t_llegada" #showSelected>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 lg:h-6 lg:w-6"
          >
            <path
              d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z"
              fill="#292D32"
            />
            <path
              d="M12 22.75C6.76 22.75 2.5 18.49 2.5 13.25C2.5 8.01 6.76 3.75 12 3.75C17.24 3.75 21.5 8.01 21.5 13.25C21.5 13.66 21.16 14 20.75 14C20.34 14 20 13.66 20 13.25C20 8.84 16.41 5.25 12 5.25C7.59 5.25 4 8.84 4 13.25C4 17.66 7.59 21.25 12 21.25C12.41 21.25 12.75 21.59 12.75 22C12.75 22.41 12.41 22.75 12 22.75Z"
              fill="#292D32"
            />
            <path
              d="M15 2.75H9C8.59 2.75 8.25 2.41 8.25 2C8.25 1.59 8.59 1.25 9 1.25H15C15.41 1.25 15.75 1.59 15.75 2C15.75 2.41 15.41 2.75 15 2.75Z"
              fill="#292D32"
            />
            <path
              d="M16.1504 22.0208C15.8004 22.0208 15.4804 21.9408 15.1904 21.7708C14.5304 21.3908 14.1504 20.6208 14.1504 19.6608V17.3508C14.1504 16.3908 14.5304 15.6208 15.1904 15.2408C15.8504 14.8608 16.7004 14.9208 17.5304 15.3908L19.5304 16.5508C20.3604 17.0308 20.8404 17.7408 20.8404 18.5008C20.8404 19.2608 20.3604 19.9708 19.5304 20.4508L17.5304 21.6108C17.0704 21.8808 16.6004 22.0208 16.1504 22.0208ZM16.1604 16.4808C16.0804 16.4808 16.0004 16.5008 15.9404 16.5308C15.7604 16.6308 15.6504 16.9408 15.6504 17.3408V19.6508C15.6504 20.0508 15.7604 20.3608 15.9404 20.4608C16.1204 20.5608 16.4404 20.5108 16.7804 20.3108L18.7804 19.1508C19.1304 18.9508 19.3404 18.7008 19.3404 18.5008C19.3404 18.3008 19.1304 18.0508 18.7804 17.8508L16.7804 16.6908C16.5504 16.5508 16.3304 16.4808 16.1604 16.4808Z"
              fill="#292D32"
            />
          </svg>
        </template>
        <FilterDepartureTime
          :times="t_llegada"
          @clear="t_llegada = null"
          @time="t_llegada = $event"
        />
      </SelectSimple>

      <SelectSimple
        :loading="woobaStore.loading"
        :placeholder="$t('querySubHeading.partida')"
      >
        <template v-if="t_partida" #showSelected>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 lg:h-6 lg:w-6"
          >
            <path
              d="M12 22.75C6.76 22.75 2.5 18.49 2.5 13.25C2.5 8.01 6.76 3.75 12 3.75C17.24 3.75 21.5 8.01 21.5 13.25C21.5 18.49 17.24 22.75 12 22.75ZM12 5.25C7.59 5.25 4 8.84 4 13.25C4 17.66 7.59 21.25 12 21.25C16.41 21.25 20 17.66 20 13.25C20 8.84 16.41 5.25 12 5.25Z"
              fill="#292D32"
            />
            <path
              d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z"
              fill="#292D32"
            />
            <path
              d="M15 2.75H9C8.59 2.75 8.25 2.41 8.25 2C8.25 1.59 8.59 1.25 9 1.25H15C15.41 1.25 15.75 1.59 15.75 2C15.75 2.41 15.41 2.75 15 2.75Z"
              fill="#292D32"
            />
          </svg>
        </template>
        <FilterDepartureTime
          :times="t_partida"
          @clear="t_partida = null"
          @time="t_partida = $event"
        />
      </SelectSimple>

      <SimpleStackedCheck
        :loading="woobaStore.loading"
        :options="connection"
        :placeholder="$t('querySubHeading.paradas')"
        @select-value="filters.stops = $event"
      >
        <template v-if="filters.stops" #selectedSpace>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 xl:h-6 xl:w-6"
          >
            <path
              d="M2.06999 4.59988C2.86999 1.13988 8.07999 1.13988 8.86999 4.59988C9.33999 6.62988 8.04999 8.34988 6.92999 9.41988C6.10999 10.1999 4.81999 10.1899 3.99999 9.41988C2.88999 8.34988 1.59999 6.62988 2.06999 4.59988Z"
              stroke="#292D32"
              stroke-width="1.5"
            />
            <path
              d="M15.07 16.5999C15.87 13.1399 21.11 13.1399 21.91 16.5999C22.38 18.6299 21.09 20.3499 19.96 21.4199C19.14 22.1999 17.84 22.1899 17.02 21.4199C15.89 20.3499 14.6 18.6299 15.07 16.5999Z"
              stroke="#292D32"
              stroke-width="1.5"
            />
            <path
              d="M12 5H14.68C16.53 5 17.39 7.29 16 8.51L8.01001 15.5C6.62001 16.71 7.48001 19 9.32001 19H12"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.48622 5.5H5.49777"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.4862 17.5H18.4978"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </SimpleStackedCheck>

      <SelectSimple
        :loading="woobaStore.loading"
        :options="classes"
        :placeholder="$t('querySubHeading.precio')"
      >
        <template v-if="filters.priceRange" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span> {{ maxPriceFormatter }} </span>
          </div>
        </template>
        <FilterPrice
          :min-price="woobaStore.priceGeral.minPrice"
          :max-price="woobaStore.priceGeral.maxPrice"
          @price="filters.priceRange = $event"
        />
      </SelectSimple>

      <SelectSimple
        :loading="woobaStore.loading"
        :placeholder="$t('querySubHeading.duracion')"
      >
        <template v-if="filters.hoursTravel" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span
              >{{
                $t('querySubHeading.duracionHrs', {
                  duration: filters.hoursTravel,
                })
              }}
            </span>
          </div>
        </template>
        <FilterDuration
          v-model="filters.hoursTravel"
          :max="woobaStore.travelTime.longerTime"
          :min="woobaStore.travelTime.lessTime"
        />
      </SelectSimple>

      <SelectSimple
        :loading="woobaStore.loading"
        :options="classes"
        :placeholder="$t('querySubHeading.clase')"
        @select-value="filters.travelClass = $event"
      >
        <template v-if="filters.travelClass.name !== ''" #selectedSpace>
          <div class="flex items-center justify-around w-full">
            <span class="text-sm"> {{ filters.travelClass.name }}</span>
          </div>
        </template>
      </SelectSimple>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import ArrowLeft from '@/components/Icons/ArrowLeft.vue';
import SelectSimple from '@/components/FormUI/TheSelectSimple.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useWoobaStore } from '@/stores/wooba';
import FilterDepartureTime from '@/components/Filters/FilterDepartureTime.vue';
import FilterDuration from '@/components/Filters/FilterDuration.vue';
import FilterPrice from '@/components/Filters/FilterPrice.vue';
import FilterAirport from '@/components/Filters/FilterAirport.vue';
import FilterCompanies from '@/components/Filters/FilterCompanies.vue';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import { useFiltersStore } from '@/stores/filters';
import SimpleStackedCheck from '@/components/FormUI/SimpleStackedCheck.vue';

const searchOptionsVoo = useSearchOptionsVooStore();
const woobaStore = useWoobaStore();
const filters = useFiltersStore();

const t_llegada = ref(null);
const t_partida = ref(null);

/*const minPriceFormatter = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: woobaStore.priceGeral.minPrice
  });
})*/
const maxPriceFormatter = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: filters.priceRange,
  });
});

watch(
  () => woobaStore.companies,
  (state) => {
    if (state) {
      filters.flightCompanies = state.map((o) => {
        return o.CodigoIata;
      });
    }
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
    return [{ name: 'Apenas com babagem', value: 1 }];
  }
  return [
    { name: 'Com babagem', value: 1 },
    { name: 'Sim babagem', value: 0 },
  ];
});

const connection = computed(() => {
  return [
    { name: 'Directo', value: 0 },
    { name: '1 Parada', value: 1 },
    { name: '2 o más Paradas', value: 2 },
  ];
});

const classes = [
  {
    name: 'Econômica',
    value: 'Y',
  },
  {
    name: 'Econômica Premium',
    value: 'W',
  },
  {
    name: 'Executiva',
    value: 'C',
  },
  {
    name: 'Primeira Classe',
    value: 'F',
  },
  {
    name: 'Econômica + Premium',
    value: 'P',
  },
];
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
