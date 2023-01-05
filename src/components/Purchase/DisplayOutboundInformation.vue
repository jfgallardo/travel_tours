<template>
<div>
  <div class="flex flex-col lg:grid lg:grid-cols-2 lg:grid-flow-row">
    <div class="flex items-center lg:col-span-2 justify-between border border-x-0 border-slate-300 p-3 md:border-t-0">
      <div class="flex items-center justify-around w-full">
        <div class="flex items-center space-x-3.5">
          <div class="border border-gray-400 p-1 rounded-full h-9 w-9">
            <img
              src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
              alt="IconPlane"/>
          </div>
          <p class="p-1 font-semibold text-sm">Vuelo de Ida</p>
        </div>
        <div
            class="p-2 bg-gray-200 rounded-full px-2 text-xs font-medium h-8"
        >
          {{ dateIda }}
        </div>
      </div>
    </div>
    <div class="border border-t-0 border-x-0 border-slate-300 lg:row-span-5">
      <div class="flex flex-col space-y-4 items-center py-2">
        <template v-for="item in vooSelected.VoosIda" :key="item.Numero">
          <PlaneLine v-bind="item" />
        </template>
      </div>
    </div>
    <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
      <div class="flex items-center justify-between space-x-3.5 h-full">
        <div class="lg:flex lg:flex-col lg:items-center lg:text-center">
          <span>{{ vooSelected.Origem }}&nbsp;&nbsp;</span>
          <span class="font-bold">{{ horaSaida }} {{ dayPeriodIda }}</span>
        </div>
        <div>{{ paradas }}</div>
        <div class="lg:flex lg:flex-col lg:items-center lg:text-center">
          <span class="font-bold">{{ horaChegada }} {{ dayPeriodVolta }} &nbsp;&nbsp;</span>
          <span>{{ vooSelected.Destino }}</span>
        </div>
      </div>
    </div>
    <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
      <div class="flex items-center justify-between h-full">
        <span>DURAÇAO TOTAL</span>
        <span class="font-bold">{{ duration }}</span>
      </div>
    </div>
    <div v-if="false" class="border border-l-0 border-slate-300 py-2 px-6 border-r-0">
      <div class="flex items-center justify-between h-full">
        <span>QTD. MILHAS</span>
        <span class="font-bold">7.000</span>
      </div>
    </div>
    <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
      <div class="flex items-center justify-between h-full">
        <span>CLASE</span>
        <span class="font-bold">{{ initialFlight.Cabine }} ({{initialFlight.BaseTarifaria[0].Classe}})</span>
      </div>
    </div>
    <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
      <div class="flex items-center justify-between h-full">
        <span>AEROLINEA</span>
        <span class="font-bold">{{ vooSelected.CiaMandatoria.Descricao }}</span>
      </div>
    </div>
    <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
      <div v-if="initialFlight.BagagemInclusa" class="flex items-center justify-between h-full">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-4 h-4 text-blue-700"
        >
          <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
          />
        </svg>
        <span> {{initialFlight.BagagemQuantidade}} BAGAGEM DE MÃO </span>
      </div>
      <div v-else class="flex items-center justify-between h-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>

        <span>NO BAGAGEM</span>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import {useSearchOptionsVooStore} from '@/stores/searchOptionsVoo';
import PlaneLine from "@/components/Aereo/PlaneLine.vue";
import {computed} from "vue";
import moment from 'moment/min/moment-with-locales';
import { useDateFormatter } from "@/composables/dateFormatter";

const props = defineProps({
  vooSelected: {
    type: Object,
    default: () => {},
  }
})

const searchOptions = useSearchOptionsVooStore();

const initialFlight = computed(() => {
  return  props.vooSelected.VoosIda[0]
})
const endFlight = computed(() => {
  const long = props.vooSelected.VoosIda.length
  return props.vooSelected.VoosIda[long - 1]
})
const dayPeriodIda = computed(() => {
  return filterDayPeriod(initialFlight.value.DataSaida);
});
const dayPeriodVolta = computed(() => {
  return filterDayPeriod(endFlight.value.DataChegada);
});
const horaSaida = computed(() => {
  return filterHours(initialFlight.value.DataSaida);
});
const horaChegada = computed(() => {
  return filterHours(endFlight.value.DataChegada);
});
const dateIda = computed(() => {
  return useDateFormatter(searchOptions.getDateIdaFormatter);
});
const paradas = computed(() => {
  let escalas = props.vooSelected.VoosIda.length - 1;

  props.vooSelected.VoosIda.map((item) => {
    if (item.Escalas) {
      escalas += item.Escalas.length;
    }
  });
  return `${escalas} ${escalas > 1 ? 'Paradas' : 'Parada'}`;
});
const duration = computed(() => {
  const x = moment(initialFlight.value.DataSaida)
  const y = moment(endFlight.value.DataChegada)
  return `${Math.trunc(moment.duration(y.diff(x)).as('hours'))} hrs ${moment.duration(y.diff(x)).get('minutes')}min`
});

const filterHours = (date) => {
  const dateLocal = new Date(moment(date));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
const filterDayPeriod = (date) => {
  const dateLocal = new Date(moment(date));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
};
</script>

<style scoped>

</style>