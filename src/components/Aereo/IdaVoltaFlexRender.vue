<template>
  <div class="flex flex-col xl:flex-row 2xl:items-stretch">
    <div class="flex flex-col justify-around xl:w-full border-gray-300">
      <div
        v-if="width < 768 && !suspense"
        class="border-b border-t-0 py-2 flex items-center justify-evenly"
      >
        <div :id="`${keyIdIda}Picture`"></div>
        <div :id="keyIdIda"></div>
      </div>
      <RenderFlightsMany :viagem="viagem" :type-flight="typeFlight" />
    </div>
    <div class="w-2/5 border-l border-gray-300 relative">
      <FlightDetalhes
        :voo-detalhes="viagem"
        :type-flight="typeFlight"
        :is-qr="true"
      />
    </div>
  </div>
</template>

<script setup>
import FlightDetalhes from '@/components/Aereo/FlightDetalhes.vue';
import RenderFlights from '@/components/Aereo/RenderFlights.vue';
import { ref, provide, computed, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';

onMounted(() => {
  suspense.value = false;
});

const props = defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
  typeFlight: {
    required: true,
    type: String,
    default: '',
  },
});

const isVooIda = computed(() => {
  return props.viagem['VoosVolta'].length > 0;
});

provide('ofertasDesde', props.viagem.OfertasDesde);
provide('ciaMandatoria', props.viagem.CiaMandatoria);
provide('preco', props.viagem.Preco);
provide('id', props.viagem.Id);

let vooDetalhesReturn = ref(null);
let vooDetalhesOutbound = ref(null);
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
const vooDetalhesReturnFlights = (fligth) => {
  vooDetalhesReturn.value = fligth;
};

const vooDetalhesOutboundFlights = (fligth) => {
  vooDetalhesOutbound.value = fligth;
};
</script>

<style scoped></style>
