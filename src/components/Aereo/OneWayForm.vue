<template>
  <div>
    <div class="mt-5 flex flex-col space-y-1">
      <div class="px-4">
        <AutoComplete
          label="De"
          :value="origem.string"
          @input="
            (e) => {
              origem.string = e;
            }
          "
          @select="
            (s) => {
              origem.iata = s;
            }
          "
        />
      </div>
      <div class="flex justify-center px-4">
        <div
          class="flex items-center justify-center cursor-pointer w-10"
          @click="changeDestinations"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-700 -mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>

      <div class="px-4">
        <AutoComplete
          label="Para"
          :value="destino.string"
          @input="
            (e) => {
              destino.string = e;
            }
          "
          @select="
            (s) => {
              destino.iata = s;
            }
          "
        />
      </div>

      <div class="grid pt-4 px-4">
        <DateInput
          v-model="departureDate"
          label="Ida"
          :minDateShow="new Date()"
        />
      </div>

      <div class="px-4 pb-4">
        <Select
          class="pt-4"
          label="Clases de cabina"
          :selected="cabine"
          :options="options"
          @selectValue="
            (e) => {
              cabine = e;
            }
          "
        />
      </div>

      <div class="px-4">
        <Dropddown label="Pasajeros">
          <template v-slot:selected>
            <div
              class="flex justify-evenly pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 bg-white border focus:outline-none text-sm"
            >
              <span>{{ numberAdults }} Adultos</span>
              <span>{{ numberChilds }} Criancas</span>
              <span>{{ numberBebes }} Bebes</span>
            </div>
          </template>
          <template v-slot:dropdown>
            <div class="flex items-center space-x-10 px-4">
              <ManageItems
                subtitle="+16 anos"
                v-model="numberAdults"
                @takeOff="takeOffAdults()"
                @addUp="addUpfAdults()"
                label="Adultos"
              />

              <ManageItems
                subtitle="4-15 anos"
                v-model="numberChilds"
                @takeOff="takeOffChilds()"
                @addUp="addUpfChilds()"
                label="Adolescentes"
              />

              <ManageItems
                subtitle="1-3 anos"
                v-model="numberBebes"
                @takeOff="takeOffBebes()"
                @addUp="addUpfBebes()"
                label="Ninos"
              />
            </div>

            <div class="divide-x"></div>
          </template>
        </Dropddown>
      </div>

      <div class="px-4">
        <Check class="pt-4" label="Adicionar areopuertos cercanos" />
        <Check label="Apenas vuelos directos" />
        <Check label="Para estudiantes" />
      </div>

      <div>
        <button
          class="bg-blue-700 hover:bg-blue-800 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400 disabled:cursor-wait"
          :disabled="moblixStore.loading"
          @click="consultar()"
        >
          <span>Buscar pasaje</span>
          <div
            v-if="moblixStore.loading"
            class="absolute right-10 animate-spin h-6 w-6 border-0 border-t-2 border-white rounded-full"
          ></div>
          <ArrowRight v-else fillColor="white" class="absolute right-10" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMoblixStore } from '@/stores/moblix';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Select from '@/components/FormUI/TheSelect.vue';
import Check from '@/components/FormUI/CheckInput.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import Toastify from 'toastify-js';

const moblixStore = useMoblixStore();
const router = useRouter();
const route = useRoute();

const origem = reactive({
  string: '',
  iata: '',
});

const destino = reactive({
  string: '',
  iata: '',
});

const departureDate = ref('');

const cabine = ref({ name: 'Todas', value: -1 });

const numberAdults = ref(1);
const numberChilds = ref(0);
const numberBebes = ref(0);

const takeOffAdults = () => {
  if (numberAdults.value > 1) {
    numberAdults.value--;
  }
};
const addUpfAdults = () => {
  if (numberAdults.value < 8) {
    numberAdults.value++;
  }
};

const takeOffChilds = () => {
  if (numberChilds.value > 0) {
    numberChilds.value--;
  }
};
const addUpfChilds = () => {
  if (numberChilds.value < 8) {
    numberChilds.value++;
  }
};

const takeOffBebes = () => {
  if (numberBebes.value > 0) {
    numberBebes.value--;
  }
};
const addUpfBebes = () => {
  if (numberBebes.value < 8) {
    numberBebes.value++;
  }
};

const changeDestinations = () => {
  let temporaryString = origem.string;
  let temporaryIata = origem.iata;

  origem.string = destino.string;
  origem.iata = destino.iata;

  destino.string = temporaryString;
  destino.iata = temporaryIata;
};

const options = [
  { name: 'Econômica', value: 0 },
  { name: 'Executiva', value: 2 },
  { name: 'Primeira Classe', value: 1 },
  { name: 'Todas', value: -1 },
];

const formatterDateS = (date) => {
  let dateParts = date.split('/');
  return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
};

const consultar = () => {
  let payload = {
    Origem: origem.iata,
    Destino: destino.iata,
    Ida: formatterDateS(departureDate.value),
    Volta: '0001-01-01',
    Adultos: numberAdults.value,
    Criancas: numberChilds.value,
    Bebes: numberBebes.value,
    Companhia: 1,
    Cabine: cabine.value.value,
  };

  if (!payload.Origem || !payload.Destino || !payload.Ida) {
    Toastify({
      text: 'Por favor, verifique, existen campos vacios o incorrectos',
      duration: 3000,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right,  #ff0000, #ff6666)',
      },
    }).showToast();
    return;
  }

  if (route.name === 'AereoFlightQuery') {
    router
      .push({
        name: 'AereoFlightQuery',
        params: {
          source: origem.iata,
          destiny: destino.iata,
          departure_date: formatterDateS(departureDate.value),
          return_date: '0001-01-01',
        },
        query: {
          adults: numberAdults.value,
          childs: numberChilds.value,
          bebes: numberBebes.value,
          company: 1,
        },
      })
      .then(() => {
        moblixStore.consultaAereo(payload);
      });
  } else {
    router.push({
      name: 'AereoFlightQuery',
      params: {
        source: origem.iata,
        destiny: destino.iata,
        departure_date: formatterDateS(departureDate.value),
        return_date: '0001-01-01',
      },
      query: {
        adults: numberAdults.value,
        childs: numberChilds.value,
        bebes: numberBebes.value,
        company: 1,
      },
    });
  }
};
</script>
<style scoped></style>
