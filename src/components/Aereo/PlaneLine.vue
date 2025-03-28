<template>
  <div class="flex flex-col text-sm">
    <div class="flex items-center space-x-3">
      <img
        v-if="Conexao"
        class="h-8 w-8"
        src="@/assets/ico/icons8-the-scheduling-a-flight-of-the-planned-route-48.png"
      />
      <img
        v-else
        class="h-8 w-8"
        src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
      />
      <div class="flex items-center space-x-10">
        <p class="font-medium text-lg">
          {{ horaSaida }} <span class="text-gray-500">{{ dayPeriodIda }}</span>
        </p>
        <div>
          <ul>
            <li>{{ Origem.Descricao }}</li>
            <li>{{ dateStringSaida }}</li>
            <li>{{ CiaMandatoria.Descricao }} - {{ Numero }}</li>
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
            <li>{{ Destino.Descricao }}</li>
            <li>{{ dateStringChegada }}</li>
            <li>{{ CiaMandatoria.Descricao }} - {{ Numero }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="Escalas" class="mt-4">
      <h1
        class="bg-blue-600 text-white text-center py-1 cursor-pointer"
        @click="openEscala = !openEscala"
      >
        Este vuelo presenta
        <span>{{
          Escalas.length > 1 ? 'las sgtes escalas' : 'la sgte escala'
        }}</span>
      </h1>
      <Transition>
        <div v-if="openEscala">
          <div
            v-for="item in escalasFiltered"
            :key="item.Id"
            class="flex flex-col space-y-1 items-stretch mt-3 px-3 py-1 bg-gray-50 border-l-4 border-gray-300 font-light"
          >
            <p>
              <span class="font-medium">Areopuerto: </span>{{ item.Descricao }}
            </p>
            <p>
              <span class="font-medium">Fecha de Llegada: </span>
              {{ item.DataChegada }}
            </p>
            <p>
              <span class="font-medium">Fecha de Salida: </span>
              {{ item.DataSaida }}
            </p>
            <p>
              <span class="font-medium">Duracion: </span> {{ item.Duracao }}
            </p>
            <p>
              <span class="font-medium">Hora de Llegada: </span>
              {{ item.HoraChegada }}
            </p>
            <p>
              <span class="font-medium">Hora de Salida: </span>
              {{ item.HoraSaida }}
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import moment from 'moment/min/moment-with-locales';
import { useDateFormatter } from "@/composables/dateFormatter";

const openEscala = ref(false);

const props = defineProps({
  DataSaida: {
    type: String,
    default: '',
  },
  DataChegada: {
    type: String,
    default: '',
  },
  Origem: {
    type: Object,
    default: () => {},
  },
  Destino: {
    type: Object,
    default: () => {},
  },
  Numero: {
    type: [Number, String],
  },
  CiaMandatoria: {
    type: Object,
    default: () => {},
  },
  Escalas: {
    type: Array,
    default: () => [],
  },
  Conexao: {
    type: Boolean,
    default: false,
  },
});

const dayPeriodIda = computed(() => {
  return filterDayPeriod(props.DataSaida);
});

const dayPeriodVolta = computed(() => {
  return filterDayPeriod(props.DataChegada);
});

const horaSaida = computed(() => {
  return filterHours(props.DataSaida);
});
const horaChegada = computed(() => {
  return filterHours(props.DataChegada);
});

const dateStringSaida = computed(() => {
  return useDateFormatter(props.DataSaida);
});

const dateStringChegada = computed(() => {
  return useDateFormatter(props.DataChegada);
});

const escalasFiltered = computed(() => {
  if (!props.Escalas) return [];

  return props.Escalas.map((escala) => {
    return {
      Descricao: escala.Aeroporto.Descricao,
      DataChegada: useDateFormatter(escala.DataChegada),
      DataSaida: useDateFormatter(escala.DataSaida),
      Duracao: escala.Duracao,
      HoraChegada: formatHour(escala.HoraChegada),
      HoraSaida: formatHour(escala.HoraSaida),
    };
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

const formatHour = (item) => {
  const hour = item.slice(0, 2);
  const min = item.slice(2);

  return `${hour}h : ${min}min `;
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
