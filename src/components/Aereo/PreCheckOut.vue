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
              Viernes, 9 Sept, 2022
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
              Viernes, 9 Sept, 2022
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
import moment from 'moment';

const props = defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
});

const vooIdaI = computed(() => {
  return initVoo(props.viagem.VoosIda);
});
const vooVoltaI = computed(() => {
  return initVoo(props.viagem.VoosVolta);
});
const vooIdaE = computed(() => {
  return endVoo(props.viagem.VoosIda);
});
const vooVoltaE = computed(() => {
  return endVoo(props.viagem.VoosVolta);
});

const dayPeriodIda = computed(() => {
  return filterDayPeriod(vooIdaI.value.DataSaida);
});
const dayPeriodVolta = computed(() => {
  return filterDayPeriod(vooIdaE.value.DataChegada);
});
const horaSaida = computed(() => {
  return filterHours(vooIdaI.value.DataSaida);
});
const horaChegada = computed(() => {
  return filterHours(vooIdaE.value.DataChegada);
});
const paradas = computed(() => {
  const cantVoo = props.viagem.VoosIda.length - 1;
  let escalas = 0;

  props.viagem.VoosIda.map((item) => {
    if (item.Escalas) {
      escalas += item.Escalas.length;
    }
  });

  return `${cantVoo + escalas} Paradas`;
});

const dayPeriodIdaE = computed(() => {
  return filterDayPeriod(vooVoltaI.value.DataSaida);
});
const dayPeriodVoltaE = computed(() => {
  return filterDayPeriod(vooVoltaE.value.DataChegada);
});
const horaSaidaE = computed(() => {
  return filterHours(vooVoltaI.value.DataSaida);
});
const horaChegadaE = computed(() => {
  return filterHours(vooVoltaE.value.DataChegada);
});
const paradasE = computed(() => {
  const cantVoo = props.viagem.VoosVolta.length - 1;
  let escalas = 0;

  props.viagem.VoosVolta.map((item) => {
    if (item.Escalas) {
      escalas += item.Escalas.length;
    }
  });
  return `${cantVoo + escalas} Paradas`;
});

const initVoo = (vooArray) => {
  return vooArray[0];
};
const endVoo = (vooArray) => {
  let longitude = vooArray.length;
  return vooArray[longitude - 1];
};

/*const offersCompany = computed(() => {
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
});*/

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
  props.viagem.VoosVolta.forEach((element) => {
    hours_flag += parseInt(element.Duracao.split(':')[0]);
    minutes_flag += parseInt(element.Duracao.split(':')[1]);
  });

  let hours = Math.floor(minutes_flag / 60);
  let minutes = minutes_flag % 60;

  return `${hours_flag + hours}h : ${minutes}min`;
});

const tipoTarifa = computed(() => {
  let tarifa = [];
  props.viagem.forEach((element) => {
    if (!tarifa.find((o) => o === element.Familia)) {
      tarifa.push(element.Familia);
    }
  });
  return tarifa.join(', ');
});

/*const paradas = computed(() => {
  const cantVoo = flights.length - 1;
  let escalas = 0;

  props.viagem.VoosVolta.map((item) => {
    if (item.Escalas) {
      escalas += item.Escalas.length;
    }
  });

  return `${cantVoo + escalas} Paradas`;
});*/
</script>
<style scoped></style>
