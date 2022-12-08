<template>
  <div>
    <div class="grid grid-cols-2 grid-flow-row">
      <div class="col-span-2 flex items-center justify-between border border-slate-300 p-3">
        <div class="flex items-center space-x-5">
          <div class="border border-gray-400 p-1 rounded-full h-9 w-9">
            <img
                src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                alt="IconPlane"/>
          </div>
          <p class="p-1 font-semibold text-sm">Vuelo de Volta</p>
          <div
              class="p-2 bg-gray-200 rounded-full px-2 text-xs font-medium h-8"
          >
            {{ dateVolta }}
          </div>
        </div>
      </div>
      <div class="row-span-6 border border-t-0 border-slate-300">
        <div class="flex flex-col space-y-4 items-center py-2">
          <template v-for="item in vooSelected.VoosVolta" :key="item.Numero">
            <PlaneLine v-bind="item" />
          </template>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center justify-around h-full">
          <div>
            <span>{{ vooSelected.Destino }}</span>
            <span class="font-bold">{{ horaSaida }} {{ dayPeriodIda }}</span>
          </div>
          <div>{{ paradas }}</div>
          <div>
            <span class="font-bold">{{ horaChegada }} {{ dayPeriodVolta }}</span>
            <span>{{ vooSelected.Origem }}</span>
          </div>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>DURAÇAO TOTAL</span>
          <span class="font-bold">{{ duration }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>QTD. MILHAS</span>
          <span class="font-bold">7.000</span>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>CLASE</span>
          <span class="font-bold">{{ initialFlight.Cabine }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>AEROLINEA</span>
          <span class="font-bold">{{ vooSelected.CiaMandatoria.Descricao }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div v-if="initialFlight.BagagemInclusa" class="flex items-center h-full space-x-3.5 pl-14">
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
        <div v-else class="flex items-center h-full space-x-3.5 pl-14">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>

          <span>NO BAGAGEM</span>
        </div>
      </div>
      <div class="border border-t-0 border-slate-300">
        <div class="grid grid-cols-3 grid-rows-1 h-full">
          <div class="border-r border-slate-300 flex flex-col items-center justify-center">
            <span class="text-3xl">Tarifa</span>
            <span>{{tarifa}}</span>
          </div>
          <div class="border-r border-slate-300 flex flex-col items-center justify-center">
            <span class="text-2xl">Taxas e encargos</span>
            <span>{{ valorTotalTaxas }}</span>
          </div>
          <div class="flex flex-col items-center justify-center">
            <span class="text-3xl">Total</span>
            <span>{{ valorTotal }}</span>
          </div>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center justify-center h-full p-5">
          <button class="bg-blue-700 hover:bg-blue-800 text-white py-2.5 px-16">Comprar Agora</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import moment from 'moment/min/moment-with-locales';
import { useI18n } from 'vue-i18n';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import PlaneLine from "@/components/Aereo/PlaneLine.vue";

const { locale } = useI18n();
const searchOptions = useSearchOptionsVooStore();

const props = defineProps({
  vooSelected: {
    type: Object,
    default: () => {},
  }
})

const initialFlight = computed(() => {
  return  props.vooSelected.VoosVolta[0]
})
const endFlight = computed(() => {
  const long = props.vooSelected.VoosVolta.length
  return props.vooSelected.VoosVolta[long - 1]
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
const dateVolta = computed(() => {
  return formatDate(searchOptions.getDateIdaFormatter);
});
const paradas = computed(() => {
  let escalas = props.vooSelected.VoosVolta.length - 1;

  props.vooSelected.VoosVolta.map((item) => {
    if (item.Escalas) {
      escalas += item.Escalas.length;
    }
  });
  return `${escalas} ${escalas > 1 ? 'Paradas' : 'Parada'}`;
});
const duration = computed(() => {
  const saida = moment(initialFlight.value.DataSaida)
  const llegada = moment(endFlight.value.DataChegada)
  return `${moment.duration(llegada.diff(saida)).get('hours')}hrs ${moment.duration(llegada.diff(saida)).get('minutes')}min`
});
const valorTotal = computed(() => {
  return currencyFormatter({
    currency: 'BRL',
    value: props.vooSelected.ValorTotal,
  });
});
const valorTotalTaxas = computed(() => {
  return currencyFormatter({
    currency: 'BRL',
    value: props.vooSelected.ValorTotalTaxas,
  });
});
const tarifa = computed(() => {
  const t = props.vooSelected.ValorTotal - props.vooSelected.ValorTotalTaxas
  return currencyFormatter({
    currency: 'BRL',
    value: t,
  });
});

const formatDate = (date) => {
  if (locale.value === 'br') {
    moment.locale('pt-br');
  } else {
    moment.locale(locale.value);
  }
  return upperC(moment(date).format('dddd D MMM YYYY'));
};
const upperC = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
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
const currencyFormatter = ({ currency, value }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency,
  });
  return formatter.format(value);
};
</script>

<style scoped>

</style>