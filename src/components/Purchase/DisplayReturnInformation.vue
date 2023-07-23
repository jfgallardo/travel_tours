<template>
  <div>
    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:grid-flow-row">
      <div
        class="flex items-center lg:col-span-2 justify-between border border-x-0 border-t-0 border-slate-300 p-3"
      >
        <div class="flex items-center justify-around w-full">
          <div class="flex items-center space-x-3.5">
            <div class="border border-gray-400 p-1 rounded-full h-9 w-9">
              <img
                src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                alt="IconPlane"
              />
            </div>
            <p class="p-1 font-semibold text-sm">Vuelo de Volta</p>
          </div>
          <div
            class="p-2 bg-gray-200 rounded-full px-2 text-xs font-medium h-8"
          >
            {{ dateVooVolta }}
          </div>
        </div>
      </div>
      <div class="border border-t-0 border-x-0 border-slate-300 lg:row-span-5">
        <div class="flex flex-col space-y-4 items-center py-2">
          <template v-for="item in voos" :key="item.flightNumber">
            <PlaneLine v-bind="item" />
          </template>
        </div>
      </div>
      <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
        <div class="flex items-center justify-between space-x-3.5 h-full">
          <div class="lg:flex lg:flex-col lg:items-center lg:text-center">
            <span>{{ vooSelected.Origem }} &nbsp;&nbsp;</span>
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
        class="border border-t-0 border-l-0 border-slate-300 py-2 px-6 border-r-0"
      >
        <div class="flex items-center justify-between h-full">
          <span>QTD. MILHAS</span>
          <span class="font-bold">7.000</span>
        </div>
      </div>
      <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
        <div class="flex items-center justify-between h-full">
          <span>CLASE</span>
          <span class="font-bold">{{
            initialFlight.seatClass.description
          }}</span>
        </div>
      </div>
      <div class="border border-t-0 border-slate-300 py-2 px-6 border-r-0">
        <div class="flex items-center justify-between h-full">
          <span>AEROLINEA</span>
          <span class="font-bold">{{ vooSelected.CiaMandatoria }}</span>
        </div>
      </div>
      <div
        class="border border-t-0 border-slate-300 py-2 px-6 border-r-0 flex items-center w-full"
      >
        <div
          v-if="vooSelected.Baggage && vooSelected.Baggage.isIncluded"
          class="w-full"
        >
          <div class="flex items-center w-full justify-between">
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
            <span class="font-medium"> {{ vooSelected.Baggage.texto }} </span>
          </div>
        </div>
        <template v-else>
          <div class="flex w-full h-full items-center justify-between">
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

      <div
        class="border border-t-0 lg:border-l-0 lg:border-r-0 border-slate-300"
      >
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
        class="border border-t-0 border-l-0 lg:border-l border-slate-300 border-r-0"
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
import { computed, ref } from 'vue';
import moment from 'moment/min/moment-with-locales';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import Modal from '@/components/Partials/TheModal.vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import i18n from '@/plugins/i18n';

const modal = ref(false);
const router = useRouter();

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

const voos = computed(() =>
  props.vooSelected.VoosVolta.length > 0
    ? props.vooSelected.VoosVolta
    : props.vooSelected.Voos
);

const initialFlight = computed(() => {
  return props.vooSelected.VoosVolta?.[0] || props.vooSelected.Voos[0];
});

const endFlight = computed(() => {
  const long =
    props.vooSelected.VoosVolta?.length || props.vooSelected.Voos.length;
  return (
    props.vooSelected.VoosVolta?.[long - 1] || props.vooSelected.Voos[long - 1]
  );
});
const dayPeriodIda = computed(() => {
  return filterDayPeriod(initialFlight.value.departureDate);
});
const dayPeriodVolta = computed(() => {
  return filterDayPeriod(endFlight.value.arrivalDate);
});
const horaSaida = computed(() => {
  return filterHours(initialFlight.value.departureDate);
});
const horaChegada = computed(() => {
  return filterHours(endFlight.value.arrivalDate);
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
  const hours = Math.floor(props.vooSelected.TempoTotal / 60);
  const remainingMinutes = props.vooSelected.TempoTotal % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = remainingMinutes.toString().padStart(2, '0');

  return `${hoursString}h:${minutesString}min`;
});

const tarifa = computed(() => {
  if (props.vooSelected && props.vooSelected.FareGroup) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: props.vooSelected.FareGroup.priceWithoutTax,
    });
  }
  return '';
});

const valorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.vooSelected.FareGroup.priceWithTax,
  });
});

const valorTotalTaxas = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value:
      props.vooSelected.FareGroup.priceWithTax -
      props.vooSelected.FareGroup.priceWithoutTax,
  });
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

const verifyAccountUser = () => {
  const token = Cookies.get('token');
  if (!token) {
    modal.value = true;
  } else {
    router.push({ path: 'checkout' });
  }
};

const dateVooVolta = computed(() => {
  moment.locale(
    i18n.global.locale.value === 'br' ? 'pt-br' : i18n.global.locale.value
  );
  return moment(initialFlight.value.departureDate).format('dddd D MMM YYYY');
});
</script>

<style scoped></style>
