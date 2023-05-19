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
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';
import FlightDetalhes from '@/components/Aereo/FlightDetalhes.vue';

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
</script>

<style scoped></style>
