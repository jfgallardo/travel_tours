<template>
  <div class="w-full border-l py-5">
    <div class="flex flex-row items-center justify-evenly">
      <div>
        <img
          class="h-12 w-16"
          src="data:image/png;base64,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"
          alt=""
        />
        <p class="text-sm text-center">AD-8342</p>
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
            <div class="ml-2 rounded-full ring-2 ring-blue-700 h-1 w-1"></div>
          </div>
          <p class="text-gray-900 font-medium">{{ Origem }}</p>
        </div>
      </div>

      <div>
        <div class="flex flex-col items-center space-y-2">
          <p class="text-gray-700">
            <span class="text-gray-400">Duration: </span>
            <span class="font-medium text-sm">{{ TempoTotal }}</span>
          </p>
          <div class="border-2 border-gray-400 rounded-full p-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.02999 21.69L11.36 19.73C11.71 19.43 12.29 19.43 12.64 19.73L14.97 21.69C15.51 21.96 16.17 21.69 16.37 21.11L16.81 19.78C16.92 19.46 16.81 18.99 16.57 18.75L14.3 16.47C14.13 16.31 14 15.99 14 15.76V12.91C14 12.49 14.31 12.29 14.7 12.45L19.61 14.57C20.38 14.9 21.01 14.49 21.01 13.65V12.36C21.01 11.69 20.51 10.92 19.89 10.66L14.3 8.25001C14.14 8.18001 14 7.97001 14 7.79001V4.79001C14 3.85001 13.31 2.74001 12.47 2.31001C12.17 2.16001 11.82 2.16001 11.52 2.31001C10.68 2.74001 9.98999 3.86001 9.98999 4.80001V7.80001C9.98999 7.98001 9.84999 8.19001 9.68999 8.26001L4.10999 10.67C3.48999 10.92 2.98999 11.69 2.98999 12.36V13.65C2.98999 14.49 3.61999 14.9 4.38999 14.57L9.29999 12.45C9.67999 12.28 9.99999 12.49 9.99999 12.91V15.76C9.99999 15.99 9.86999 16.31 9.70999 16.47L7.43999 18.75C7.19999 18.99 7.08999 19.45 7.19999 19.78L7.63999 21.11C7.81999 21.69 8.47999 21.97 9.02999 21.69Z"
                stroke="blue"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p class="text-gray-400">Directo</p>
        </div>
      </div>

      <div>
        <div class="flex flex-col space-y-2">
          <p class="text-gray-900 font-medium">{{ filterWeekdayChegada }}</p>
          <div class="flex items-center">
            <div class="mr-2 -ml-4 rounded-full bg-blue-700 h-2 w-2"></div>
            <p class="text-2xl">
              <span class="font-semibold">{{ filterHoursChegada }}</span>
              <span class="text-gray-400 font-medium ml-1">{{
                filterDayPeriodChegada
              }}</span>
            </p>
          </div>
          <p class="text-gray-700 font-medium">{{ Destino }}</p>
        </div>
      </div>

      <div>
        <button class="text-blue-700 hover:text-blue-800 font-semibold text-sm">
          Detalhes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import FlightInformation from '@/components/FlightQuery/FlightInformation.vue';
import FlightTime from '@/components/FlightQuery/FlightTime.vue';
import FlightNumber from '@/components/FlightQuery/FlightNumber.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const props = defineProps({
  Origem: {
    type: String,
  },
  Destino: {
    type: String,
  },
  Saida: {
    type: String,
  },
  Chegada: {
    type: String,
  },
  TempoTotal: {
    type: String,
  },
});

const filterHours = computed(() => {
  const dateLocal = new Date(props.Saida);
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const filterWeekday = computed(() => {
  const dateLocal = new Date(props.Saida);
  const options = { weekday: 'long' };

  return dateLocal.toLocaleDateString(locale.value, options);
});

const filterDayPeriod = computed(() => {
  const dateLocal = new Date(props.Saida);
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const filterHoursChegada = computed(() => {
  const dateLocal = new Date(props.Chegada);
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const filterWeekdayChegada = computed(() => {
  const dateLocal = new Date(props.Chegada);
  const options = { weekday: 'long' };

  return dateLocal.toLocaleDateString(locale.value, options);
});

const filterDayPeriodChegada = computed(() => {
  const dateLocal = new Date(props.Chegada);
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});
</script>

<style scoped></style>

<!-- <div class="flex items-center justify-around">
      <FlightNumber />
      <FlightInformation weekday="Friday" :iata="Origem" :flightTime="Saida" :output="true" />
      <FlightTime duration="" :directFlight="true" />
      <FlightInformation weekday="Saturday" :iata="Destino" :flightTime="Chegada" :output="false" />
      <div class="flex items-center">
        <button class="text-blue-700 hover:text-blue-800 font-semibold text-sm">
          Detalhes
        </button>
      </div>
    </div> -->
