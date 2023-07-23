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
                <span class="font-medium text-sm">{{ timeTotal }}</span>
              </p>
              <div>
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
              :preco="precoTotal"
              :platform="viagem.Platform"
              :tarifas="viagem.FareGroup"
              :baggage="viagem.Baggage"
              :time-total="timeTotal"
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

const precoTotal = computed(() => {
  return props.viagem.FareGroup.priceWithTax;
});

const initial_flight = computed(() => {
  return props.viagem.Voos[0];
});

const final_flight = computed(() => {
  const l = props.viagem.Voos.length;
  return l > 0 ? props.viagem.Voos[l - 1] : [];
});

const filter_weekday_initial = computed(() => {
  const dateLocal = new Date(initial_flight.value.departureDate);
  const options = { weekday: 'long' };
  return dateLocal.toLocaleDateString(locale.value, options);
});

const filter_weekday_final = computed(() => {
  const dateLocal = new Date(final_flight.value.arrivalDate);
  const options = { weekday: 'long' };

  return dateLocal.toLocaleDateString(locale.value, options);
});

const filter_day_period_initial = computed(() => {
  const dateLocal = new Date(initial_flight.value.departureDate);
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const filter_day_period_final = computed(() => {
  const dateLocal = new Date(final_flight.value.arrivalDate);
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const filter_hours_initial = computed(() => {
  const dateLocal = new Date(initial_flight.value.departureDate);
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const filter_hours_final = computed(() => {
  const dateLocal = new Date(final_flight.value.arrivalDate);
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const stops = computed(() => {
  let paradas = [];
  props.viagem.Voos.forEach((element) => {
    if (element.departure !== props.viagem.Origem) {
      paradas.push(element.departure);
    }
  });
  return paradas.length > 0 ? `Parada: ${paradas.join(', ')}` : 'Direto';
});

const timeTotal = computed(() => {
  const hours = Math.floor(props.viagem.TempoTotal / 60);
  const remainingMinutes = props.viagem.TempoTotal % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = remainingMinutes.toString().padStart(2, '0');

  return `${hoursString}h:${minutesString}min`;
});
</script>
