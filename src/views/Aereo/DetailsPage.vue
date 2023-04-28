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
                v-if="typeFlight === 'V'"
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
                typeFlight === 'I'
                  ? 'Vuelo de Ida'
                  : typeFlight === 'V'
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
            <PlaneLine v-bind="item" :cia-mandatoria="ciaMandatoria" />
          </template>
        </div>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2 flex justify-center items-center"
      >
        <div class="flex items-center justify-between space-x-3.5">
          <div>
            <span>{{ initVoo.Origem }}&nbsp;&nbsp;</span>
            <span class="font-bold">{{ horaSaida }} {{ dayPeriodIda }}</span>
          </div>
          <div>{{ paradas }}</div>
          <div>
            <span class="font-bold"
              >{{ horaChegada }} {{ dayPeriodVolta }}</span
            >
            <span>&nbsp;&nbsp;{{ endVoo.Destino }}</span>
          </div>
        </div>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2 flex justify-around items-center"
      >
        <span>DURAÇAO TOTAL</span>
        <span class="font-bold">{{ duration }}</span>
      </div>
      <div
        v-if="false"
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 flex justify-around items-center"
      >
        <span>QTD. MILHAS</span>
        <span class="font-bold">7.000</span>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2 flex justify-around items-center"
      >
        <span>CLASE</span>
        <span class="font-bold">{{
          tarifas?.[0]?.Classe ?? initVoo.ClasseStr
        }}</span>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2 flex justify-around items-center"
      >
        <span>AEROLINEA</span>
        <span class="font-bold">{{ ciaMandatoria }}</span>
      </div>
      <div
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 lg:col-span-2 flex justify-around items-center"
      >
        <div
          v-if="baggage.length > 0"
          class="flex flex-col items-start space-y-1.5"
        >
          <template v-for="tar in baggage" :key="tar.Tipo">
            <div v-if="tar.Quantidade > 0" class="flex items-center space-x-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-blue-700"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium"> {{ tar.TextoBagagem }} </span>
            </div>
          </template>
        </div>
        <template v-else>
          <div>
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
        </template>
        <!--        <template v-if="tarifas[0].BagagensInclusas[0].Bagagem > 0">
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
          <span> {{ tarifas[0].BagagensInclusas[0].Bagagem }} BAGAGEM </span>
          <span>
            {{ tarifas[0].BagagensInclusas[0].Quantidade }} BAGAGEM DE MÃO
          </span>
        </template>
        <template v-else>
          <div
            v-if="tarifas[0].BagagensInclusas[0].Quantidade > 0"
            class="flex w-full items-center justify-around"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 text-blue-700"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span>
              {{ tarifas[0].BagagensInclusas[0].Quantidade }} BAGAGEM DE MÃO
            </span>
          </div>
          <div v-else>
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
        </template>-->
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
          <!--          <p>{{ offersCompany }}</p>-->
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
import { ref, computed, onMounted } from 'vue';
import QrcodeVue from 'qrcode.vue';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';
import moment from 'moment/min/moment-with-locales';
import { useI18n } from 'vue-i18n';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
//import { useWoobaStore } from '@/stores/wooba';

onMounted(() => {
  if (props.id) {
    value.value = `${window.location.protocol}//${window.location.host}/precheckout/${props.id}`;
  }
});

defineEmits(['closeDetails']);

//Todo props()
const props = defineProps({
  flights: {
    type: Array,
    default: () => [],
  },
  ofertasDesde: {
    type: Array,
    default: () => [],
  },
  ciaMandatoria: {
    type: String,
    default: '',
  },
  preco: {
    type: [Number, String],
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  typeFlight: {
    required: true,
    type: String,
    default: '',
  },
  platform: {
    type: [String, Number],
    default: '',
  },
  tarifas: {
    type: Array,
    default: () => [],
  },
  baggage: {
    type: Array,
    default: () => [],
  },
});

//Todo variables()
const value = ref('');
//const flights = inject('flights');
//const ofertasDesde = inject('ofertasDesde');
//const ciaMandatoria = inject('ciaMandatoria');
//const preco = inject('preco');
//const id = inject('id');
const searchOptions = useSearchOptionsVooStore();
const { locale } = useI18n();
//const woobaStore = useWoobaStore();

//Todo computed()
const initVoo = computed(() => {
  return props.flights[0];
});
const endVoo = computed(() => {
  const longitud = props.flights.length;
  return props.flights[longitud - 1];
});
const dayPeriodIda = computed(() => {
  return filterDayPeriod(initVoo.value.Chegada);
});
const dayPeriodVolta = computed(() => {
  return filterDayPeriod(endVoo.value.Chegada);
});
const horaSaida = computed(() => {
  return filterHours(initVoo.value.Saida);
});
const horaChegada = computed(() => {
  return filterHours(endVoo.value.Chegada);
});
/*const offersCompany = computed(() => {
  let companies = props.ofertasDesde.filter((item) => {
    if (item.company === props.ciaMandatoria) {
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
});*/
const valorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.preco,
  });
});

//Todo functions()
const tipoTarifa = computed(() => {
  if (props.platform === 1) {
    if (props.tarifas)
      return `${props.tarifas[0].Classe} ( ${props.tarifas[0].Tipo} )`;
    return initVoo.value.ClasseStr;
  }
  return `${initVoo.value.BaseTarifaria[0].Familia} ( ${initVoo.value.BaseTarifaria[0].Codigo} )`;
});

const paradas = computed(() => {
  const cantVoo = props.flights.length - 1;
  let escalas = 0;

  props.flights.map((item) => {
    if (item.Escalas) {
      escalas += item.Escalas.length;
    }
  });
  return `${cantVoo + escalas} Parada(s)`;
});

const dateVoo = computed(() => {
  return props.typeFlight === 'I'
    ? formatDate(searchOptions.getDateIdaFormatter)
    : props.typeFlight === 'V'
    ? formatDate(searchOptions.getDateVoltaFormatter)
    : dateVooArray();
});
const dateVooArray = () => {
  return props.flights.flatMap((o) => formatDate(o.Chegada)).join('; ');
};
const duration = computed(() => {
  const x = moment(initVoo.value.Saida);
  const y = moment(endVoo.value.Chegada);
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
