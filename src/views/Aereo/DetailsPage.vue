<template>
  <div class="mx-auto p-8">
    <div>
      <div class="flex flex-col space-y-8">
        <div class="flex items-start space-x-20">
          <div class="grid grid-cols-1 gap-6 px-8">
            <template v-for="item in flights" :key="item.Numero">
              <PlaneLine v-bind="item" />
            </template>
          </div>
          <div class="flex flex-col space-y-5">
            <div class="flex items-center space-x-4 border-b">
              <p class="text-lg font-light p-1">
                {{ initVoo.Origem.CodigoIata }}
                <span class="font-bold"
                  >{{ horaSaida }} {{ dayPeriodIda }}</span
                >
              </p>
              <p class="text-lg font-light">{{ paradas }}</p>
              <p class="text-lg font-light">
                <span class="font-bold"
                  >{{ horaChegada }} {{ dayPeriodVolta }}</span
                >
                {{ endVoo.Destino.CodigoIata }}
              </p>
            </div>

            <div>
              <p class="text-lg font-light border-b">
                DURACÃO TOTAL <span class="font-bold">{{ duracao }}</span>
              </p>
            </div>

            <!-- <div>
              <p class="text-lg font-light border-b">
                QTD. DE MILHAS <span class="font-bold">7000</span>
              </p>
            </div> -->

            <div>
              <p class="text-lg font-light border-b">
                CLASE <span class="font-bold">{{ initVoo.Cabine }}</span>
              </p>
            </div>

            <div>
              <p class="text-lg font-light border-b">
                AEROLINEA
                <span class="font-bold">{{ ciaMandatoria.Descricao }}</span>
              </p>
            </div>
            <div
              v-for="item in flights"
              :key="item.Id"
              class="text-lg font-light"
            >
              <h1 class="font-medium text-gray-700">
                {{ item.Origem.CodigoIata }} - {{ item.Destino.CodigoIata }}
              </h1>
              <p v-if="item.BagagemInclusa" class="flex items-center space-x-2">
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
                <span>{{ item.BagagemQuantidade }} BAGAGEM </span>
              </p>
              <p v-else>NO BAGAGEM</p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between border-t pt-5">
          <div class="flex items-center justify-between w-full text-center">
            <div>
              <span class="text-lg font-light">1 Oferta Desde</span><br />
              <span class="text-2xl font-medium"> {{ offersCompany }} </span>
            </div>
            <div>
              <span class="text-lg font-light">Tipo de Tarifa</span><br />
              <span class="text-2xl font-medium">{{ tipoTarifa }}</span>
            </div>
            <div>
              <span class="text-lg font-light">Total</span><br />
              <span class="text-2xl font-medium">{{ valorTotalComTaxa }}</span>
            </div>
          </div>

          <div class="flex items-center justify-evenly w-full">
            <div>
              <qrcode-vue :value="value"></qrcode-vue>
            </div>
            <div>
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
  </div>
</template>
<script setup>
import { ref, onUpdated, inject, computed } from 'vue';
import QrcodeVue from 'qrcode.vue';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';
import moment from 'moment';

onUpdated(() => {
  value.value = `${window.location.protocol}//${window.location.host}/`;
});

const value = ref('');
const flights = inject('flights');
const ofertasDesde = inject('ofertasDesde');
const ciaMandatoria = inject('ciaMandatoria');
const valorTotalComTaxa = inject('valorTotalComTaxa');

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

  return offers;
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

  return `${cantVoo + escalas} Paradas`;
});
</script>
<style></style>
