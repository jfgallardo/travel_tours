<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:grid-flow-row">
      <div
        class="flex items-center lg:col-span-2 justify-between border border-x-0 border-slate-300 p-3 md:border-t-0"
      >
        <div class="flex items-center justify-around w-full">
          <div class="flex items-center space-x-3.5">
            <div class="border border-gray-400 p-1 rounded-full h-9 w-9">
              <img
                src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
                alt="IconPlane"
              />
            </div>
            <p class="p-1 font-semibold text-sm">
              {{ voos.length ? 'Vuelos de Ida' : 'Vuelo de Ida' }}
            </p>
          </div>
          <div
            class="p-2 bg-gray-200 rounded-full px-2 text-xs font-medium h-8"
          >
            {{ dateVooIda }}
          </div>
        </div>
      </div>
      <div class="border border-t-0 border-x-0 border-slate-300 lg:row-span-5">
        <div class="flex flex-col space-y-4 items-center py-2">
          <template v-for="item in voos" :key="item.Numero">
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
            <span class="font-bold"
              >{{ horaChegada }} {{ dayPeriodVolta }} &nbsp;&nbsp;</span
            >
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
      <div
        v-if="false"
        class="border border-l-0 border-slate-300 py-2 px-6 border-r-0"
      >
        <div class="flex items-center justify-between h-full">
          <span>QTD. MILHAS</span>
          <span class="font-bold">7.000</span>
        </div>
      </div>
      <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
        <div class="flex items-center justify-between h-full">
          <span>CLASE</span>
          <span class="font-bold">{{ initialFlight.ClasseStr }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
        <div class="flex items-center justify-between h-full">
          <span>AEROLINEA</span>
          <span class="font-bold">{{ vooSelected.CiaMandatoria }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
        <!--        <div
          v-if="initialFlight.BagagemInclusa"
          class="flex items-center justify-between h-full"
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
          <span> {{ initialFlight.BagagemQuantidade }} BAGAGEM DE MÃO </span>
        </div>
        <div v-else class="flex items-center justify-between h-full">
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
        </div>-->
        <div
          v-if="vooSelected.Baggage.length"
          class="flex flex-col items-start space-y-1.5"
        >
          <template v-for="tar in vooSelected.Baggage" :key="tar.Tipo">
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
      </div>
      <template
        v-if="vooSelected.VoosVolta && vooSelected.VoosVolta.length === 0"
      >
        <div class="border-t-0 lg:border-l-0 lg:border-r-0 border-slate-300">
          <div class="grid grid-cols-3 grid-rows-1 h-full">
            <div
              class="border-r border-slate-300 flex flex-col items-center justify-center"
            >
              <span class="text-3xl lg:text-xl">Tarifa</span>
              <span>{{ tarifa }}</span>
            </div>
            <div
              class="border-r border-slate-300 flex flex-col items-center justify-center"
            >
              <span class="text-2xl lg:text-xl text-center"
                >Taxas e encargos</span
              >
              <span>{{ valorTotalTaxas }}</span>
            </div>
            <div class="flex flex-col items-center justify-center">
              <span class="text-3xl lg:text-xl">Total</span>
              <span>{{ valorTotal }}</span>
            </div>
          </div>
        </div>
        <div
          class="border-t-0 border-l-0 lg:border-l border-slate-300 border-r-0"
        >
          <div
            v-if="showBuyButton"
            class="flex items-center justify-center h-full p-5"
          >
            <button
              class="bg-blue-700 hover:bg-blue-800 text-white text-center py-3 px-28 lg:px-10 font-bold"
              @click="verifyAccountUser"
            >
              Comprar agora
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
  <Modal v-if="modal" @close="modal = false">
    <template #header>
      <div class="flex items-center space-x-2.5 pr-32">
        <ExclamationTriangleIcon class="h-6 w-6 text-yellow-500" />
        <span>Warning</span>
      </div>
    </template>
    <template #body>
      <div class="w-96 p-4">
        <p class="text-justify">
          Por cuestiones de seguridad necesita hacer login con una cuenta
          registrada para hacer compras en el sitio. Por favor haga login o
          registre una cuenta.
        </p>
      </div>
    </template>
    <template #footer>
      <div>
        <button
          class="float-right text-white font-medium bg-blue-700 hover:bg-blue-800 p-2"
          @click="modal = false"
        >
          Aceptar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';
import { computed, ref } from 'vue';
import moment from 'moment/min/moment-with-locales';
import { useDateFormatter } from '@/composables/dateFormatter';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import i18n from '@/plugins/i18n';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import Modal from '@/components/Partials/TheModal.vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const props = defineProps({
  vooSelected: {
    type: Object,
    default: () => {},
  },
  showBuyButton: {
    type: Boolean,
    default: false,
  },
});

const searchOptions = useSearchOptionsVooStore();
const modal = ref(false);
const router = useRouter();

const voos = computed(() =>
  props.vooSelected.VoosIda.length > 0
    ? props.vooSelected.VoosIda
    : props.vooSelected.Voos
);

const initialFlight = computed(() => {
  return props.vooSelected.VoosIda?.[0] || props.vooSelected.Voos[0];
});

const endFlight = computed(() => {
  const long =
    props.vooSelected.VoosIda?.length || props.vooSelected.Voos.length;
  return (
    props.vooSelected.VoosIda?.[long - 1] || props.vooSelected.Voos[long - 1]
  );
});
const dayPeriodIda = computed(() => {
  return filterDayPeriod(initialFlight.value.Saida);
});
const dayPeriodVolta = computed(() => {
  return filterDayPeriod(endFlight.value.Chegada);
});
const horaSaida = computed(() => {
  return filterHours(initialFlight.value.Saida);
});
const horaChegada = computed(() => {
  return filterHours(endFlight.value.Chegada);
});

const paradas = computed(() => {
  const cantVoo = voos.value.length - 1;
  let escalas = 0;

  voos.value.map((item) => {
    if (item.TempoEspera) {
      escalas += 1;
    }
  });
  return `${cantVoo + escalas} Parada(s)`;
});

const duration = computed(() => {
  const x = moment(initialFlight.value.Saida);
  const y = moment(endFlight.value.Chegada);
  return `${Math.trunc(moment.duration(y.diff(x)).as('hours'))} hrs ${moment
    .duration(y.diff(x))
    .get('minutes')}min`;
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

const tarifa = computed(() => {
  if (props.vooSelected && props.vooSelected.Tarifas) {
    return props.vooSelected.Tarifas[0]?.Tipo || '';
  }
  return '';
});

const valorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.vooSelected.ValorTotalComTaxa,
  });
});

const valorTotalTaxas = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.vooSelected.ValorTotalTaxas + props.vooSelected.ValorTxServico,
  });
});

const dateVooIda = computed(() => {
  moment.locale(
    i18n.global.locale.value === 'br' ? 'pt-br' : i18n.global.locale.value
  );
  return moment(initialFlight.value.Saida).format('dddd D MMM YYYY');
});

const verifyAccountUser = () => {
  const token = Cookies.get('token');
  if (!token) {
    modal.value = true;
  } else {
    router.push({ path: 'checkout' });
  }
};
</script>

<style scoped></style>
