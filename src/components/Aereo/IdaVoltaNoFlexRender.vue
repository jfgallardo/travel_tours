<template>
  <div class="flex flex-col xl:flex-row 2xl:items-stretch">
    <div class="flex flex-col justify-around xl:w-full">
      <div
        v-if="width < 768 && !suspense"
        class="border-b border-t-0 py-2 flex items-center justify-evenly"
      >
        <div :id="`${keyIdIda}Picture`"></div>
        <div :id="keyIdIda"></div>
      </div>
      <RenderFlightsMany v-bind="viagem" />
    </div>
    <div class="w-1/5 border-l border-gray-300 relative">
      <FlightDetalhes :voo-detalhes="viagem" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';
import FlightDetalhes from '@/components/Aereo/FlightDetalhes.vue';
import { useWindowSize } from '@vueuse/core';

onMounted(() => {
  suspense.value = false;
});

defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
});

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
</script>

<style scoped></style>
