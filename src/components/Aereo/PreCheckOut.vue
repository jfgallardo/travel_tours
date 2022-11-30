<template>
  <div class="mx-auto p-8">
    <div>
      <div class="flex space-x-10">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex item-center space-x-3">
            <div class="border border-gray-400 h-fit p-1 rounded-full">
              <img
                class="h-7 w-7"
                src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
              />
            </div>
            <p class="p-1 font-semibold text-sm">Vuelo de Ida</p>
            <div
              class="p-2 bg-gray-200 rounded-full px-2 text-xs font-medium h-8"
            >
              {{ dateIda }}
            </div>
          </div>
          <template v-for="item in viagem.VoosIda" :key="item.Numero">
            <PlaneLine v-bind="item" />
          </template>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div class="flex item-center space-x-3">
            <div class="border border-gray-400 h-fit p-1 rounded-full">
              <img
                class="h-7 w-7"
                src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
              />
            </div>
            <p class="p-1 font-semibold text-sm">Vuelo de Volta</p>
            <div
              class="p-2 bg-gray-200 rounded-full px-2 text-xs font-medium h-8"
            >
              {{ dateVolta }}
            </div>
          </div>
          <template v-for="item in viagem.VoosVolta" :key="item.Numero">
            <PlaneLine v-bind="item" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';
import moment from 'moment/min/moment-with-locales';
import { useI18n } from 'vue-i18n';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';

defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
});
const { locale } = useI18n();
const searchOptions = useSearchOptionsVooStore();

const dateIda = computed(() => {
  return formatDate(searchOptions.getDateIdaFormatter);
});
const dateVolta = computed(() => {
  return formatDate(searchOptions.getDateVoltaFormatter);
});

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
