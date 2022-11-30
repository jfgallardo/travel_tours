<template>
  <div class="w-full">
    <div class="flex items-center">
      <div class="w-full border-l py-5">
        <div class="flex flex-row items-center justify-between px-10">
          <div class="flex flex-col items-center space-y-3 w-32">
            <img :src="initVoo.Icone" alt="Icone" />
            <p class="text-sm text-center">{{ FlightCodeString }}</p>
          </div>

          <div>
            <div class="flex flex-col space-y-2">
              <p class="text-gray-700 font-medium">{{ filterWeekday }}</p>
              <div class="flex items-center relative">
                <p class="text-2xl">
                  <span class="font-semibold">{{ filterHours }}</span>
                  <span class="text-gray-400 font-medium ml-1">{{
                    filterDayPeriod
                  }}</span>
                </p>
                <div
                  class="ml-2 rounded-full ring-2 ring-blue-700 h-1 w-1"
                ></div>
              </div>

              <p class="text-gray-900 font-medium cursor-default">
                <span>{{ initVoo.Origem.CodigoIata }}</span>
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-col items-center space-y-2">
              <p class="text-gray-700">
                <span class="text-gray-400">Duration: </span>
                <span class="font-medium text-sm">{{ Duracao }}</span>
              </p>
              <div>
                <img
                  v-if="initVoo.Segmento === 'I'"
                  class="h-8 w-8"
                  src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
                />
                <img
                  v-else
                  class="h-8 w-8"
                  src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                />
              </div>
              <p class="text-gray-400 cursor-default">
                {{ Parada }}
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-col space-y-2">
              <p class="text-gray-900 font-medium">
                {{ filterWeekdayChegada }}
              </p>
              <div class="flex items-center">
                <div class="mr-2 -ml-4 rounded-full bg-blue-700 h-2 w-2"></div>
                <p class="text-2xl">
                  <span class="font-semibold">{{ filterHoursChegada }}</span>
                  <span class="text-gray-400 font-medium ml-1">{{
                    filterDayPeriodChegada
                  }}</span>
                </p>
              </div>
              <p class="text-gray-700 font-medium cursor-default">
                {{ endVoo.Destino.CodigoIata }}
              </p>
            </div>
          </div>

          <div>
            <button
              class="text-blue-700 hover:text-blue-800 font-semibold text-sm"
              @click="detalhes = true"
            >
              Detalhes
            </button>
          </div>
        </div>

        <Modal v-if="detalhes" @close="detalhes = false">
          <template #body>
            <DetailsPage @closeDetails="detalhes = false" />
          </template>
          <template #header>
            <span>Detalhes</span>
          </template>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import { useI18n } from 'vue-i18n';
import Modal from '@/components/Partials/TheModal.vue';
import DetailsPage from '@/views/Aereo/DetailsPage.vue';
import moment from 'moment';

const { locale } = useI18n();
const detalhes = ref(false);

const props = defineProps({
  Voos: {
    type: Array,
    default: () => [],
  },
  Destino: {
    type: String,
    default: '',
  },
  Origem: {
    type: String,
    default: '',
  },
  CiaMandatoria: {
    type: Object,
    default: () => {},
  },
  OfertasDesde: {
    type: Array,
    default: () => [],
  },
  ValorTotalComTaxa: {
    type: [Number, String],
  },
});

provide('flights', props.Voos);
provide('ofertasDesde', props.OfertasDesde);
provide('ciaMandatoria', props.CiaMandatoria);
provide('valorTotalComTaxa', props.ValorTotalComTaxa);

const initVoo = computed(() => {
  return props.Voos[0];
});

const endVoo = computed(() => {
  const longitud = props.Voos.length;
  return props.Voos[longitud - 1];
});

const filterHours = computed(() => {
  const dateLocal = new Date(moment(initVoo.value.DataSaida));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const filterWeekday = computed(() => {
  const dateLocal = new Date(moment(initVoo.value.DataSaida));
  const options = { weekday: 'long' };

  return dateLocal.toLocaleDateString(locale.value, options);
});

const filterDayPeriod = computed(() => {
  const dateLocal = new Date(moment(initVoo.value.DataSaida));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const filterHoursChegada = computed(() => {
  const dateLocal = new Date(moment(endVoo.value.DataChegada));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const filterWeekdayChegada = computed(() => {
  const dateLocal = new Date(moment(endVoo.value.DataChegada));
  const options = { weekday: 'long' };

  return dateLocal.toLocaleDateString(locale.value, options);
});

const filterDayPeriodChegada = computed(() => {
  const dateLocal = new Date(moment(endVoo.value.DataChegada));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const FlightCodeString = computed(() => {
  return initVoo.value.CiaMandatoria.Descricao;
});

const Duracao = computed(() => {
  let minutes_flag = 0;
  let hours_flag = 0;
  props.Voos.forEach((element) => {
    hours_flag += parseInt(element.Duracao.split(':')[0]);
    minutes_flag += parseInt(element.Duracao.split(':')[1]);
  });

  let hours = Math.floor(minutes_flag / 60);
  let minutes = minutes_flag % 60;

  return `${hours_flag + hours}h : ${minutes}min`;
});

const Parada = computed(() => {
  let paradas = [];
  props.Voos.forEach((element) => {
    if (element.Origem.CodigoIata != props.Origem) {
      paradas.push(element.Origem.CodigoIata);
    }
  });
  return paradas.length > 0 ? `Parada: ${paradas.join(', ')}` : 'Direto';
});
</script>

<style></style>
