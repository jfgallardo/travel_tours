<template>
  <div class="flex flex-col xl:flex-row 2xl:items-stretch px-8 py-2">
    <div
      class="flex flex-col justify-around border border-b-0 border-gray-300 xl:w-full"
    >
      <div class="border-b border-gray-300 py-2">
        <span class="px-4 font-medium">{{
          $t('idaVoltaFlexRender.vuelosDeIda')
        }}</span>
      </div>
      <div
        v-if="width < 768 && !suspense"
        class="border-b border-t-0 py-2 flex items-center justify-evenly"
      >
        <div :id="`${keyIdIda}Picture`"></div>
        <div :id="keyIdIda"></div>
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
    <div class="w-1/5 border border-l-0 border-gray-300 relative">
      <FlightDetalhes :voo-detalhes="selectVooIda" />
    </div>
  </div>

  <div class="flex flex-col xl:flex-row 2xl:items-stretch px-8 py-2">
    <div
      class="flex flex-col justify-around border border-b-0 border-gray-300 xl:w-full"
    >
      <div class="border-b border-gray-300 py-2">
        <span class="px-4 font-medium">{{
          $t('idaVoltaFlexRender.vuelosDeVuelta')
        }}</span>
      </div>
      <div
        v-if="width < 768 && !suspense"
        class="border-b border-t-0 py-2 flex items-center justify-evenly"
      >
        <div :id="`${keyIdVolta}Picture`"></div>
        <div :id="keyIdVolta"></div>
      </div>
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
    <div class="w-1/5 border border-l-0 border-gray-300 relative">
      <FlightDetalhes :voo-detalhes="selectVooVolta" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';
import FlightDetalhes from '@/components/Aereo/FlightDetalhes.vue';
import { useWoobaStore } from '@/stores/wooba';
import { useWindowSize } from '@vueuse/core';

onMounted(() => {
  if (inputCheckIda.value.length > 0) {
    inputCheckIda.value[0].checked = true;
  }
  if (inputCheckVolta.value.length > 0) {
    inputCheckVolta.value[0].checked = true;
  }
  suspense.value = false;
});

const woobaStore = useWoobaStore();
let inputCheckIda = ref([]);
let inputCheckVolta = ref([]);
let selectVooIda = ref(woobaStore.outboundFlights[0]);
let selectVooVolta = ref(woobaStore.returnFlights[0]);
const { width } = useWindowSize();
const suspense = ref(true);

const clearCheckIda = (ev) => {
  inputCheckIda.value.forEach((element) => {
    if (element !== ev) {
      element.checked = false;
    } else {
      element.checked = true;
    }
  });
};

const clearCheckVolta = (ev) => {
  inputCheckVolta.value.forEach((element) => {
    if (element !== ev) {
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

const keyIdIda = computed(() => {
  let stringAleatoria = '';
  let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 10; i++) {
    stringAleatoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return stringAleatoria;
});

const keyIdVolta = computed(() => {
  let stringAleatoria = '';
  let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 12; i++) {
    stringAleatoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return stringAleatoria;
});
</script>

<style scoped></style>
