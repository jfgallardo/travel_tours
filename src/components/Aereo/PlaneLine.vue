<template>
  <div class="flex flex-col text-sm">
    <div class="flex items-center space-x-3">
      <img
        class="h-8 w-8"
        src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
      />
      <div class="flex items-center space-x-10">
        <p class="font-medium text-lg">
          {{ horaSaida }} <span class="text-gray-500">{{ dayPeriodIda }}</span>
        </p>
        <div>
          <ul>
            <li>{{ departure }}</li>
            <li>{{ dateStringSaida }}</li>
            <li>{{ flightNumber }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="-mt-8 -mb-12">
      <svg>
        <line
          x1="18"
          y1="10"
          x2="18"
          y2="130"
          stroke-width="2"
          stroke="#b3b3cc"
          stroke-dasharray="6,9"
        />
      </svg>
    </div>

    <div class="flex items-center space-x-3">
      <img
        class="h-8 w-8"
        src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
      />
      <div class="flex items-center space-x-10">
        <p class="font-medium text-lg">
          {{ horaChegada }}
          <span class="text-gray-500">{{ dayPeriodVolta }}</span>
        </p>
        <div>
          <ul>
            <li>{{ arrival }}</li>
            <li>{{ dateStringChegada }}</li>
            <li>{{ flightNumber }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import moment from 'moment/min/moment-with-locales';
import { useDateFormatter } from '@/composables/dateFormatter';

const props = defineProps({
  departureDate: {
    type: String,
    default: '',
  },
  arrivalDate: {
    type: String,
    default: '',
  },
  departure: {
    type: String,
    default: () => {},
  },
  arrival: {
    type: String,
    default: () => {},
  },
  flightNumber: {
    type: [Number, String],
    default: ''
  },
});

const dayPeriodIda = computed(() => {
  return filterDayPeriod(props.departureDate);
});

const dayPeriodVolta = computed(() => {
  return filterDayPeriod(props.arrivalDate);
});

const horaSaida = computed(() => {
  return filterHours(props.departureDate);
});
const horaChegada = computed(() => {
  return filterHours(props.arrivalDate);
});

const dateStringSaida = computed(() => {
  return useDateFormatter(props.departureDate);
});

const dateStringChegada = computed(() => {
  return useDateFormatter(props.arrivalDate);
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

</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
