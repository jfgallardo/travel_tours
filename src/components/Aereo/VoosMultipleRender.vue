<template>
  <div class="flex flex-col xl:flex-row 2xl:items-stretch px-6 py-2">
    <div class="flex flex-col justify-around border border-gray-300 xl:w-full">
      <div class="border-b border-gray-300 py-2 text-center">
        <span class="px-4 font-semibold"> Vuelos de Ida</span>
      </div>
      <div
        v-if="width < 768 && !suspense"
        class="border-b border-t-0 py-2 flex items-center justify-evenly"
      >
        <div :id="`${keyIdIda}Picture`"></div>
        <div :id="keyIdIda"></div>
      </div>
      <div>
        <RenderFlights
          :key-id="keyIdIda"
          :flights="viagem['Voos']"
          @select-voo="vooDetalhesFlights"
        />
      </div>
    </div>

    <div
      class="border border-t-0 xl:border-t xl:border-l-0 xl:border-b-0 border-gray-300 relative"
    >
      <FlightDetalhes :voo-detalhes="viagem" />
    </div>
  </div>
</template>

<script setup>
import FlightDetalhes from '@/components/Aereo/FlightDetalhes.vue';
import RenderFlights from '@/components/Aereo/RenderFlights.vue';
import { ref, provide, computed, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';

onMounted(() => {
  suspense.value = false;
});

const props = defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
});

provide('ofertasDesde', props.viagem.OfertasDesde);
provide('ciaMandatoria', props.viagem.CiaMandatoria);
provide('preco', props.viagem.Preco);
provide('id', props.viagem.Id);

let vooDetalhes = ref(null);
const { width } = useWindowSize();
const suspense = ref(true);

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
/*
const trechosArray = computed(() => {
  return props.viagem.Voos.map((o) => o.Origem.Descricao).join(' ----- ');
});*/

const vooDetalhesFlights = (fligth) => {
  vooDetalhes.value = fligth;
};
</script>

<style scoped></style>
