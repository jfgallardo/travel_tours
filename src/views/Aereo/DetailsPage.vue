<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-5 lg:grid-flow-row">
      <div
        class="flex items-center lg:col-span-5 justify-between border border-slate-300 p-3"
      >
        <div
          class="flex flex-col lg:flex-row space-y-2 lg:space-y-0 items-center lg:space-x-5"
        >
          <div class="flex items-center space-x-2">
            <div class="border border-gray-400 p-1 rounded-full h-9 w-9">
              <img
                v-if="initVoo.Segmento === 'V'"
                src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                alt="IconPlane"
              />
              <img
                v-else
                src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
                alt="IconPlane"
              />
            </div>
            <p class="p-1 font-semibold text-sm">
              {{
                initVoo.Segmento === 'I'
                  ? 'Vuelo de Ida'
                  : initVoo.Segmento === 'V'
                  ? 'Vuelo de Volta'
                  : 'Viajes por Trechos'
              }}
            </p>
          </div>
          <div class="p-2 bg-gray-200 rounded-full text-xs font-medium h-8">
            {{ dateVoo }}
          </div>
        </div>
      </div>
      <div
        class="border border-t-0 border-slate-300 lg:row-span-5 lg:col-span-3"
      >
        <div class="flex flex-col space-y-4 items-center py-2">
          <template v-for="item in flights" :key="item.Numero">
            <PlaneLine v-bind="item" />
          </template>
        </div>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2"
      >
        <div class="flex items-center justify-between space-x-3.5">
          <div>
            <span>{{ initVoo.Origem.CodigoIata }}&nbsp;&nbsp;</span>
            <span class="font-bold">{{ horaSaida }} {{ dayPeriodIda }}</span>
          </div>
          <div>{{ paradas }}</div>
          <div>
            <span class="font-bold"
              >{{ horaChegada }} {{ dayPeriodVolta }}</span
            >
            <span>&nbsp;&nbsp;{{ endVoo.Destino.CodigoIata }}</span>
          </div>
        </div>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2"
      >
        <div class="flex items-center justify-between">
          <span>DURAÇAO TOTAL</span>
          <span class="font-bold">{{ duration }}</span>
        </div>
      </div>
      <div
        v-if="false"
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6"
      >
        <div class="flex items-center h-full space-x-3.5 pl-14">
          <span>QTD. MILHAS</span>
          <span class="font-bold">7.000</span>
        </div>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2"
      >
        <div class="flex items-center justify-between">
          <span>CLASE</span>
          <span class="font-bold">{{ initVoo.Cabine }}</span>
        </div>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2"
      >
        <div class="flex items-center justify-between">
          <span>AEROLINEA</span>
          <span class="font-bold">{{ ciaMandatoria.Descricao }}</span>
        </div>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2"
      >
        <div
          v-if="initVoo.BagagemInclusa"
          class="flex items-center justify-between"
        >
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
          <span> {{ initVoo.BagagemQuantidade }} BAGAGEM DE MÃO </span>
        </div>
        <div v-else class="flex items-center justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>

          <span>NO BAGAGEM</span>
        </div>
      </div>
    </div>
    <div class="lg:grid lg:grid-cols-5 lg:grid-flow-row">
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:py-0 lg:px-0 lg:border-b-0 h-full lg:px-2 lg:py-8"
      >
        <div
          class="flex items-center justify-between lg:flex-col lg:justify-center"
        >
          <p class="text-2xl text-center">1 Oferta Desde</p>
          <p>{{ offersCompany }}</p>
        </div>
      </div>

      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:py-0 lg:px-0 lg:border-b-0 h-full lg:px-2 lg:py-8"
      >
        <div
          class="flex items-center justify-between lg:flex-col lg:justify-center"
        >
          <span class="text-2xl">Tipo de Tarifa</span>
          <span>{{ tipoTarifa }}</span>
        </div>
      </div>

      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:py-0 lg:px-0 lg:border-b-0 lg:border-l lg:border-l-white h-full lg:pr-2 lg:pl-0.5 lg:py-8"
      >
        <div
          class="flex items-center justify-between lg:flex-col lg:justify-center"
        >
          <span class="text-2xl">Total</span>
          <span>{{ valorTotal }}</span>
        </div>
      </div>

      <div
        class="border border-y-0 border-l-0 border-slate-300 py-4 px-6 lg:py-0 lg:px-0 lg:border-b-0 lg:border-r-0 h-full lg:py-2"
      >
        <div
          class="flex items-center justify-center lg:flex-col lg:justify-center"
        >
          <qrcode-vue :size="110" :value="value"></qrcode-vue>
        </div>
      </div>

      <div
        class="py-4 px-6 lg:py-0 lg:px-0 lg:border-b-0 h-full lg:place-self-center"
      >
        <div
          class="flex items-center justify-center lg:flex-col lg:justify-center lg:pt-8 lg:pr-4"
        >
          <button
            class="bg-blue-700 hover:bg-blue-800 text-white py-4 px-36 lg:px-14 font-bold"
            @click="$emit('closeDetails')"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import QrcodeVue from 'qrcode.vue';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';
import moment from 'moment/min/moment-with-locales';
import { useI18n } from 'vue-i18n';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
//import { useWoobaStore } from '@/stores/wooba';

onMounted(() => {
  if (id) {
    value.value = `${window.location.protocol}//${window.location.host}/precheckout/${id}`;
  }
});

defineEmits(['closeDetails']);

//Todo variables()
const value = ref('');
const flights = inject('flights');
const ofertasDesde = inject('ofertasDesde');
const ciaMandatoria = inject('ciaMandatoria');
const preco = inject('preco');
const id = inject('id');
const searchOptions = useSearchOptionsVooStore();
const { locale } = useI18n();
//const woobaStore = useWoobaStore();

//Todo computed()
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
    return useCurrencyFormatter({
      currency: 'BRL',
      value: offers,
    });
  } else {
    companies.forEach((e) => {
      if (e.offers < offers) {
        offers = e.offers;
      }
    });
  }
  return useCurrencyFormatter({
    currency: 'BRL',
    value: offers,
  });
});
const valorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: preco.Total,
  });
});

//Todo functions()
const tipoTarifa = computed(() => {
  return `${initVoo.value.BaseTarifaria[0].Familia} ( ${initVoo.value.BaseTarifaria[0].Codigo} )`;
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
  return initVoo.value.Segmento === 'I'
    ? formatDate(searchOptions.getDateIdaFormatter)
    : initVoo.value.Segmento === 'V'
    ? formatDate(searchOptions.getDateVoltaFormatter)
    : dateVooArray();
});
const dateVooArray = () => {
  return flights.flatMap((o) => formatDate(o.DataSaida)).join('; ')
}
const duration = computed(() => {
  const x = moment(initVoo.value.DataSaida);
  const y = moment(endVoo.value.DataChegada);
  return `${Math.trunc(moment.duration(y.diff(x)).as('hours'))} hrs ${moment
    .duration(y.diff(x))
    .get('minutes')}min`;
});
const filterDayPeriod = (date) => {
  const dateLocal = new Date(moment(date));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
};
const filterHours = (date) => {
  const dateLocal = new Date(moment(date));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
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
