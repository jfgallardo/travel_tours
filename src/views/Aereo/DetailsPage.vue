<template>
  <div>
    <div class="grid grid-cols-2 grid-flow-row">
      <div class="col-span-2 flex items-center justify-between border border-slate-300 p-3">
        <div class="flex items-center space-x-5">
          <div class="border border-gray-400 p-1 rounded-full h-9 w-9">
            <img
                v-if="initVoo.Segmento === 'V'"
                src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                alt="IconPlane"/>
            <img
                v-else
                src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
                alt="IconPlane"/>
          </div>
          <p class="p-1 font-semibold text-sm">{{ initVoo.Segmento === 'I' ? 'Vuelo de Ida' : 'Vuelo de Volta' }}</p>
          <div
              class="p-2 bg-gray-200 rounded-full px-2 text-xs font-medium h-8"
          >
            {{ dateVoo }}
          </div>
        </div>
      </div>
      <div class="row-span-5 border border-t-0 border-slate-300">
        <div class="flex flex-col space-y-4 items-center py-2">
          <template v-for="item in flights" :key="item.Numero">
            <PlaneLine v-bind="item" />
          </template>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center justify-around h-full">
          <div>
            <span>{{ initVoo.Origem.CodigoIata }}&nbsp;&nbsp;</span>
            <span class="font-bold">{{ horaSaida }} {{ dayPeriodIda }}</span>
          </div>
          <div>{{ paradas }}</div>
          <div>
            <span class="font-bold">{{ horaChegada }} {{ dayPeriodVolta }}</span>
            <span>&nbsp;&nbsp;{{ endVoo.Destino.CodigoIata }}</span>
          </div>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>DURAÇAO TOTAL</span>
          <span class="font-bold">{{ duration }}</span>
        </div>
      </div>
<!--      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>QTD. MILHAS</span>
          <span class="font-bold">7.000</span>
        </div>
      </div>-->
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>CLASE</span>
          <span class="font-bold">{{ initVoo.Cabine }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>AEROLINEA</span>
          <span class="font-bold">{{ ciaMandatoria.Descricao }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div v-if="initVoo.BagagemInclusa" class="flex items-center h-full space-x-3.5 pl-14">
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
          <span> {{initVoo.BagagemQuantidade}} BAGAGEM DE MÃO </span>
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
          <div class="border-r border-slate-300 flex flex-col items-center justify-center px-2">
            <span class="text-2xl">1 Oferta Desde</span>
            <span>{{ offersCompany }}</span>
          </div>
          <div class="border-r border-slate-300 flex flex-col items-center justify-center">
            <span class="text-2xl">Tipo de Tarifa</span>
            <span>{{ tipoTarifa }}</span>
          </div>
          <div class="flex flex-col items-center justify-center">
            <span class="text-3xl">Total</span>
            <span>{{ valorTotal }}</span>
          </div>
        </div>
      </div>
      <div class="border border-t-0 border-l-0 border-slate-300">
        <div class="grid grid-cols-2 h-full p-5 place-items-center">
          <div>
            <qrcode-vue :value="value"></qrcode-vue>
          </div>
          <div class="">
            <button
                class="bg-blue-700 hover:bg-blue-800 text-white py-4 px-12 font-semibold"
                @click="$emit('closeDetails')"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onUpdated, inject, computed } from 'vue';
import QrcodeVue from 'qrcode.vue';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';
import moment from 'moment/min/moment-with-locales';
import {useI18n} from 'vue-i18n';
import {useSearchOptionsVooStore} from "@/stores/searchOptionsVoo";

onUpdated(() => {
  value.value = `${window.location.protocol}//${window.location.host}/`;
});

const value = ref('');
const flights = inject('flights');
const ofertasDesde = inject('ofertasDesde');
const ciaMandatoria = inject('ciaMandatoria');
const valorTotalComTaxa = inject('valorTotalComTaxa');
const searchOptions = useSearchOptionsVooStore();
const { locale } = useI18n();

const initVoo = computed(() => {
  return flights[0];
});

const endVoo = computed(() => {
  const longitud = flights.length;
  return flights[longitud - 1];
});

const dayPeriodIda = computed(() => {
  return filterDayPeriod(initVoo.value.DataSaida);
});

const dayPeriodVolta = computed(() => {
  return filterDayPeriod(endVoo.value.DataChegada);
});

const horaSaida = computed(() => {
  return filterHours(initVoo.value.DataSaida);
});
const horaChegada = computed(() => {
  return filterHours(endVoo.value.DataChegada);
});

const offersCompany = computed(() => {
  let companies = ofertasDesde.filter((item) => {
    if (item.company === ciaMandatoria.CodigoIata) {
      return item;
    }
  });
  let offers = companies[0].offers;
  if (companies.length === 1) {
    return offers;
  } else {
    companies.forEach((e) => {
      if (e.offers < offers) {
        offers = e.offers;
      }
    });
  }
  return currencyFormatter({
    currency: 'BRL',
    value: offers,
  });
});

const valorTotal = computed(() => {
  return currencyFormatter({
    currency: 'BRL',
    value: valorTotalComTaxa,
  });
});

const currencyFormatter = ({ currency, value }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency,
  });
  return formatter.format(value);
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

const duracao = computed(() => {
  let minutes_flag = 0;
  let hours_flag = 0;
  flights.forEach((element) => {
    hours_flag += parseInt(element.Duracao.split(':')[0]);
    minutes_flag += parseInt(element.Duracao.split(':')[1]);
  });

  let hours = Math.floor(minutes_flag / 60);
  let minutes = minutes_flag % 60;

  return `${hours_flag + hours}h : ${minutes}min`;
});

const tipoTarifa = computed(() => {
  let tarifa = [];
  flights.forEach((element) => {
    if (!tarifa.find((o) => o === element.Familia)) {
      tarifa.push(element.Familia);
    }
  });
  return tarifa.join(', ');
});

const paradas = computed(() => {
  const cantVoo = flights.length - 1;
  let escalas = 0;

  flights.map((item) => {
    if (item.Escalas) {
      escalas += item.Escalas.length;
    }
  });
  return `${cantVoo + escalas} Parada(s)`;
});

const dateVoo = computed(() => {
  return initVoo.value.Segmento === "I" ? formatDate(searchOptions.getDateIdaFormatter) : formatDate(searchOptions.getDateVoltaFormatter)
});

const duration = computed(() => {
  const saida = moment(initVoo.value.DataSaida)
  const llegada = moment(endVoo.value.DataChegada)
  return `${moment.duration(llegada.diff(saida)).get('hours')}hrs ${moment.duration(llegada.diff(saida)).get('minutes')}min`
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
</script>
<style></style>
