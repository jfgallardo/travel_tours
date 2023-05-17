<template>
  <div class="w-full">
    <div class="flex items-center">
      <div class="w-full py-5">
        <div class="flex flex-row items-center justify-between px-10">
          <div class="flex flex-col items-center space-y-3">
            <span class="text-xl">
              {{ viagem.CiaMandatoria }}
            </span>
          </div>

          <div>
            <div class="flex flex-col space-y-2">
              <p class="text-gray-700 font-medium">
                {{ filter_weekday_initial }}
              </p>
              <div class="flex items-center relative">
                <p class="text-2xl">
                  <span class="font-semibold">{{ filter_hours_initial }}</span>
                  <span class="text-gray-400 font-medium ml-1">{{
                    filter_day_period_initial
                  }}</span>
                </p>
                <div
                  class="ml-2 rounded-full ring-2 ring-blue-700 h-1 w-1"
                ></div>
              </div>

              <p class="text-gray-900 font-medium cursor-default">
                <span>{{ initial_flight.Origem }}</span>
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-col items-center space-y-2">
              <p class="text-gray-700">
                <span class="text-gray-400">Duration: </span>
                <span class="font-medium text-sm">{{ viagem.TempoTotal }}</span>
              </p>
              <div>
                <!--                <img
                  v-if="initial_flight.Segmento === 'I'"
                  class="h-8 w-8"
                  src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
                />-->
                <img
                  class="h-8 w-8"
                  src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                />
              </div>
              <p class="text-gray-400 cursor-default">
                {{ stops }}
              </p>
            </div>
          </div>

          <div>
            <div class="flex flex-col space-y-2">
              <p class="text-gray-900 font-medium">
                {{ filter_weekday_final }}
              </p>
              <div class="flex items-center">
                <div class="mr-2 -ml-4 rounded-full bg-blue-700 h-2 w-2"></div>
                <p class="text-2xl">
                  <span class="font-semibold">{{ filter_hours_final }}</span>
                  <span class="text-gray-400 font-medium ml-1">{{
                    filter_day_period_final
                  }}</span>
                </p>
              </div>
              <p class="text-gray-700 font-medium cursor-default">
                {{ final_flight.Destino }}
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
            <DetailsPage
              :id="viagem.Key"
              :type-flight="typeFlight"
              :flights="viagem.Voos"
              :cia-mandatoria="viagem.CiaMandatoria"
              :preco="viagem.Preco"
              :platform="viagem.Platform"
              :tarifas="viagem.Tarifas"
              :baggage="viagem.Baggage"
              @close-details="detalhes = false"
            />
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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Modal from '@/components/Partials/TheModal.vue';
import DetailsPage from '@/views/Aereo/DetailsPage.vue';
import { PhotoIcon } from '@heroicons/vue/24/solid';

const { locale } = useI18n();
const detalhes = ref(false);

const props = defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
  typeFlight: {
    required: true,
    type: String,
    default: '',
  },
});

const initial_flight = computed(() => {
  return props.viagem.Voos[0];
});

const final_flight = computed(() => {
  const l = props.viagem.Voos.length;
  return l > 0 ? props.viagem.Voos[l - 1] : [];
});

const filter_weekday_initial = computed(() => {
  const dateLocal = new Date(initial_flight.value.Saida);
  const options = { weekday: 'long' };
  return dateLocal.toLocaleDateString(locale.value, options);
});

const filter_weekday_final = computed(() => {
  const dateLocal = new Date(final_flight.value.Chegada);
  const options = { weekday: 'long' };

  return dateLocal.toLocaleDateString(locale.value, options);
});

const filter_day_period_initial = computed(() => {
  const dateLocal = new Date(initial_flight.value.Saida);
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const filter_day_period_final = computed(() => {
  const dateLocal = new Date(final_flight.value.Chegada);
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const filter_hours_initial = computed(() => {
  const dateLocal = new Date(initial_flight.value.Saida);
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const filter_hours_final = computed(() => {
  const dateLocal = new Date(final_flight.value.Chegada);
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const duration = computed(() => {
  let minutes_flag = 0;
  props.viagem.Voos.forEach((element) => {
    minutes_flag += parseInt(element.Duracao);
  });

  let hours = Math.floor(minutes_flag / 60);
  let minutes = minutes_flag % 60;

  return `${hours}h : ${minutes}min`;
});

const stops = computed(() => {
  let paradas = [];
  props.viagem.Voos.forEach((element) => {
    if (element.Origem !== props.viagem.Origem) {
      paradas.push(element.Origem);
    }
  });
  return paradas.length > 0 ? `Parada: ${paradas.join(', ')}` : 'Direto';
});

const flight_numbers = computed(() => {
  let numbers = [];
  props.viagem.Voos.forEach((element) => {
    numbers.push(element.Numero);
  });
  return numbers;
});

/*
* {
    "Numero": "G3-1409",
    "Saida": "2023-04-18T06:15:00",
    "Chegada": "2023-04-18T08:00:00",
    "Origem": "BSB",
    "Destino": "GRU",
    "Duracao": 105,
    "Tempo": "01:45",
    "TempoEspera": null,
    "Classe": 0,
    "ClasseStr": "Economica"
  }
* */
</script>
