<template>
  <div
    class="flex flex-col xl:flex-row 2xl:items-stretch space-x-3 w-full h-full"
  >
    <div class="flex flex-col justify-around xl:w-full border border-gray-300">
      <RenderFlightsMany :viagem="viagem" :type-flight="typeFlight" />
    </div>

    <div class="w-2/5 border border-gray-300 relative">
      <FlightDetalhes
        :voo-detalhes="viagem"
        :type-flight="typeFlight"
        :key-voo-selected="keyVooSelected"
        @he-selected="$emit('heSelected', $event)"
      />
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

defineEmits(['heSelected']);

defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
  typeFlight: {
    required: true,
    type: String,
    default: '',
  },
  keyVooSelected: {
    type: String,
    default: '',
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
