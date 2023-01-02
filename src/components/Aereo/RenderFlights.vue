<template>
  <div>
      <div class="border-l-0 py-5 md:px-3">
        <div class="flex justify-center items-center space-x-8 sm:space-x-20 lg:space-x-10 2xl:justify-around">
          <teleport v-if="width < 768 && !suspense" :to="`#${keyId}Picture`">
            <div class="flex items-center space-x-3 ">
              <img :src="initVoo.Icone" />
              <p class="text-sm text-center">{{ FlightCodeString }}</p>
            </div>
          </teleport>
          <div v-else class="flex flex-col items-center space-y-3 w-32">
            <img :src="initVoo.Icone" />
            <p class="text-sm text-center">{{ FlightCodeString }}</p>
          </div>

          <div>
            <div class="flex flex-col space-y-2">
              <p class="text-gray-700 font-medium">{{ filterWeekday }}</p>
              <div class="flex items-center relative">
                <p class="text-lg sm:text-xl">
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
              <div class="text-gray-700 flex flex-col 2xl:flex-row 2xl:space-x-2.5 items-center">
                <p class="text-gray-400">Duration: </p>
                <p class="font-medium text-sm md:w-20">{{ Duracao }}</p>
              </div>
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
                {{ Conexao ? Parada : 'Direto' }}
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
                <p class="text-lg sm:text-xl">
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

          <teleport v-if="width < 768 && !suspense" :to="`#${keyId}`">
            <button
              class="text-blue-700 hover:text-blue-800 font-semibold text-sm"
              @click="detalhes = true"
            >
              Detalhes
            </button>
          </teleport>
          <div  v-else>
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
</template>

<script setup>
import { ref, computed, provide, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Modal from '@/components/Partials/TheModal.vue';
import DetailsPage from '@/views/Aereo/DetailsPage.vue';
import moment from 'moment';
import { useWindowSize } from '@vueuse/core';

const { locale } = useI18n();
const { width } = useWindowSize()
const detalhes = ref(false);
const suspense = ref(true)


onMounted(() => {
  suspense.value = false
})


const props = defineProps({
  flights: {
    type: Array,
    default: () => [],
  },
  keyId: {
    type: String,
  }
});

provide('flights', props.flights);

const initVoo = computed(() => {
  return props.flights[0];
});

const endVoo = computed(() => {
  const longitud = props.flights.length;
  return props.flights[longitud - 1];
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

const Conexao = computed(() => {
  return props.flights.length > 1;
});

const Duracao = computed(() => {
  const x = moment(initVoo.value.DataSaida)
  const y = moment(endVoo.value.DataChegada)
  return `${Math.trunc(moment.duration(y.diff(x)).as('hours'))} hrs ${moment.duration(y.diff(x)).get('minutes')}min`
});

const Parada = computed(() => {
  let paradas = [];
  props.flights.forEach((element) => {
    if (element.Conexao) {
      paradas.push(element.Origem.CodigoIata);
    }
  });
  if (paradas.length === 0) {
    const long = props.flights.length;
    paradas.push(props.flights[long - 1].Origem.CodigoIata);
  }
  return `Parada: ${paradas.join(', ')}`;
});
</script>

<style></style>
