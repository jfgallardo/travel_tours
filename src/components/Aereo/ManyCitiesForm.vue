<template>
  <div class="mt-5">
    <div class="flex flex-col space-y-5">
      <div class="flex items-center justify-between space-x-5 px-4">
        <Select
          class="w-1/2"
          label="Clases de cabina"
          :selected="cabine"
          :options="options"
          @selectValue="
            (e) => {
              cabine = e;
            }
          "
        />
        <Dropddown label="Pasajeros" class="w-1/2">
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

      <div class="flex flex-col space-y-2 px-4">
        <template v-for="(trecho, index) in multiplosTrechos" :key="index">
          <div class="flex space-x-1">
            <AutoComplete
              label="De"
              :value="trecho.origem.string"
              @input="
                (e) => {
                  trecho.origem.string = e;
                }
              "
              @select="
                (s) => {
                  trecho.origem.iata = s;
                }
              "
            />

            <AutoComplete
              label="Para"
              :value="trecho.destino.string"
              @input="
                (e) => {
                  trecho.destino.string = e;
                }
              "
              @select="
                (s) => {
                  trecho.destino.iata = s;
                }
              "
            />

            <DateInput
              v-model="trecho.departureDate"
              label="Ida"
              :minDateShow="new Date()"
            />
          </div>
        </template>
      </div>

      <div class="flex space-x-2">
        <button
          class="bg-gray-400 hover:bg-gray-500 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400"
          @click="addV"
        >
          <span>Adicionar otro vuelo</span>
        </button>
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
import { ref } from 'vue';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import Select from '@/components/FormUI/TheSelect.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import { useMoblixStore } from '@/stores/moblix';
import Toastify from 'toastify-js';


const cabine = ref({ name: 'Todas', value: -1 });
const moblixStore = useMoblixStore();

const multiplosTrechos = ref([
  {
    departureDate: '',
    destino: {
      string: '',
      iata: '',
    },
    origem: {
      string: '',
      iata: '',
    },
  },
  {
    departureDate: '',
    destino: {
      string: '',
      iata: '',
    },
    origem: {
      string: '',
      iata: '',
    },
  },
]);

const options = [
  { name: 'Econômica', value: 0 },
  { name: 'Executiva', value: 2 },
  { name: 'Primeira Classe', value: 1 },
  { name: 'Todas', value: -1 },
];

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

const addV = () => {
  if (multiplosTrechos.value.length < 5) {
    multiplosTrechos.value.push({
      departureDate: '',
      destino: {
        string: '',
        iata: '',
      },
      origem: {
        string: '',
        iata: '',
      },
    });
  } else {
    Toastify({
      text: 'Você só pode adicionar até 5 voos',
      duration: 3000,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right,  #0564fc, #5b92eb)',
      },
      onClick: function () {},
    }).showToast();
  }
};
</script>

<style scoped></style>
