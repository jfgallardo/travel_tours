<template>
  <div>
    <div class="flex items-stretch space-x-12 pb-10">
      <div class="flex flex-col w-full border border-gray-300">
        <div class="border-b py-2">
          <span class="px-4 font-medium">Vuelos de Ida</span>
        </div>
        <div
          v-for="viagem in woobaStore.outboundFlights"
          :key="viagem.Key"
          class="flex items-center border-b border-gray-300"
        >
          <input
            ref="inputCheckIda"
            type="checkbox"
            class="text-zinc-800 cursor-pointer rounded-full w-5 h-5 focus:ring-0 m-2"
            @click="selectFligthIda($event, viagem)"
          />

          <RenderFlightsMany v-bind="viagem" />
        </div>
      </div>
      <div class="w-1/5 border border-gray-300 relative">
        <FlightDetalhes :voo-detalhes="selectVooIda" />
      </div>
    </div>

    <div class="flex items-stretch space-x-12 pb-10">
      <div class="flex flex-col w-full border border-gray-300">
        <div class="border-b py-2">
          <span class="px-4 font-medium">Vuelos de Vuelta</span>
        </div>
        <div>
          <div
            v-for="viagem in woobaStore.returnFlights"
            :key="viagem.Key"
            class="flex items-center border-b border-gray-300"
          >
            <input
              ref="inputCheckVolta"
              type="checkbox"
              class="text-zinc-800 cursor-pointer rounded-full w-5 h-5 focus:ring-0 m-2"
              @click="selectFligthVolta($event, viagem)"
            />
            <RenderFlightsMany v-bind="viagem" />
          </div>
        </div>
      </div>
      <div class="w-1/5 border border-gray-300 relative">
        <FlightDetalhes :voo-detalhes="selectVooVolta" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';
import FlightDetalhes from '@/components/Aereo/FlightDetalhes.vue';
import { useWoobaStore } from '@/stores/wooba';

onMounted(() => {
  if (inputCheckIda.value.length > 0) {
    inputCheckIda.value[0].checked = true;
  }
  if (inputCheckVolta.value.length > 0) {
    inputCheckVolta.value[0].checked = true;
  }
});

const woobaStore = useWoobaStore();
let inputCheckIda = ref([]);
let inputCheckVolta = ref([]);
let selectVooIda = ref(woobaStore.outboundFlights[0]);
let selectVooVolta = ref(woobaStore.returnFlights[0]);

const clearCheckIda = (ev) => {
  inputCheckIda.value.forEach((element) => {
    if (element != ev) {
      element.checked = false;
    } else {
      element.checked = true;
    }
  });
};

const clearCheckVolta = (ev) => {
  inputCheckVolta.value.forEach((element) => {
    if (element != ev) {
      element.checked = false;
    } else {
      element.checked = true;
    }
  });
};

const selectFligthIda = (ev, viagem) => {
  clearCheckIda(ev.target);
  selectVooIda.value = viagem;
};

const selectFligthVolta = (ev, viagem) => {
  clearCheckVolta(ev.target);
  selectVooVolta.value = viagem;
};
</script>

<style scoped></style>
