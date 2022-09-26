<template>
  <div>
    <div class="mt-5 flex flex-col space-y-1">
      <div class="px-4">
        <AutoComplete label="Para onde você vai?" :value="origem.string" @input="
          (e) => {
            origem.string = e;
          }
        " @select="
            (s) => {
              origem.iata = s;
            }
          " />
      </div>

      <div class="grid grid-cols-2 grid-rows-1 py-4 px-4">
        <DateInput v-model="flightDates.departureDate" label="Para onde você vai?" />
        <DateInput v-model="flightDates.returnDate" :dateMin="notBeforeDate()" />
      </div>

      <div class="px-4">
        <Dropddown label="Quartos e hóspedes">
          <template v-slot:selected>
            <span>{{rooms}} Quarto - {{guests}} Hospede</span>
          </template>
          <template v-slot:dropdown>
            <div class="flex items-center space-x-10 px-4">
              <ManageItems label="Quarto" v-model="rooms" @takeOff="takeRoom" @addUp="addRoom"/>
              <ManageItems label="Hospede" v-model="guests" @takeOff="takeGuest" @addUp="addGuest"/>
            </div>
          </template>
        </Dropddown>
      </div>

      <div class="pt-60">
        <button
          class="bg-blue-700 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400 disabled:cursor-wait"
          @click="consultar()">
          <span>Buscar Hoteis</span>
          <ArrowRight fillColor="white" class="absolute right-10" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import AutoComplete from "@/components/FormUI/AutoComplete.vue";
import DateInput from "@/components/FormUI/DateInput.vue";
import ArrowRight from "@/components/Icons/ArrowRight.vue";
import Dropddown from "@/components/FormUI/TheDropddown.vue";
import ManageItems from "@/components/FormUI/ManageItems.vue";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const origem = reactive({
  string: "",
  iata: "",
});

const destino = reactive({
  string: "",
  iata: "",
});

const flightDates = reactive({
  departureDate: "",
  returnDate: "",
});

const rooms = ref(1);
const guests = ref(1);

const addRoom = () => {
  rooms.value++
}
const addGuest = () => {
  guests.value++
}

const takeRoom = () => {
  rooms.value--
}
const takeGuest = () => {
  guests.value--
}


const notBeforeDate = () => {
  return flightDates.departureDate;
};


const consultar = () => {
  
};
</script>
<style scoped>

</style>
