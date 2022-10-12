<template>
  <div>
    <div class="mt-5 flex flex-col space-y-1">
      <div class="px-4 mb-3">
        <Dropddown label="Hóspedes">
          <template v-slot:selected>
            <div
              class="flex justify-evenly pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 bg-white border focus:outline-none text-sm"
            >
              <span>{{ lodging }} Hospede</span>
              <span> {{ adults }} Adultos</span>
            </div>
          </template>
          <template v-slot:dropdown>
            <div class="flex items-center space-x-10 px-4">
              <ManageItems
                label="Hospede"
                v-model="lodging"
                @takeOff="takeLodging"
                @addUp="addLodging"
              />
              <ManageItems
                label="Adultos"
                v-model="adults"
                @takeOff="takeAdult"
                @addUp="addAdult"
              />
            </div>
          </template>
        </Dropddown>
      </div>

      <div class="px-4">
        <AutoComplete
          label="Destino"
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

      <div class="grid grid-cols-2 grid-rows-1 pt-4 px-4">
        <DateInput
          v-model="flightDates.departureDate"
          label="Data de Embarque"
        />
        <DateInput
          v-model="flightDates.returnDate"
          :dateMin="notBeforeDate()"
        />
      </div>

      <div class="px-4 pt-3">
        <AutoComplete
          label="Portos de Embarque"
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

      <div class="pt-64">
        <button
          class="bg-blue-700 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400 disabled:cursor-wait"
          @click="consultar()"
        >
          <span>Buscar Cruzeiros</span>
          <ArrowRight fillColor="white" class="absolute right-10" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import { useRouter, useRoute } from 'vue-router';

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

const flightDates = reactive({
  departureDate: '',
  returnDate: '',
});

const adults = ref(1);
const lodging = ref(1);

const addAdult = () => {
  adults.value++;
};
const addLodging = () => {
  lodging.value++;
};

const takeAdult = () => {
  adults.value--;
};
const takeLodging = () => {
  lodging.value--;
};

const notBeforeDate = () => {
  return flightDates.departureDate;
};

const consultar = () => {};
</script>
<style scoped></style>
