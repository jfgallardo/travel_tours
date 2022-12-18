<template>
  <div>
    <div class="flex items-stretch space-x-12">
      <div class="flex flex-col w-full border border-gray-300">
        <div class="border-b py-2">
          <span class="px-4 font-medium">Vuelos de Ida</span>
        </div>
        <div>
          <RenderFlights
            :flights="viagem.VoosIda"
            @select-voo="vooDetalhesOutboundFlights"
          />
        </div>
        <div class="border-b py-2">
          <span class="px-4 font-medium">Vuelos de Vuelta</span>
        </div>
        <div>
          <RenderFlights
            :flights="viagem.VoosVolta"
            @select-voo="vooDetalhesReturnFlights"
          />
        </div>
      </div>

      <div class="w-1/5 border border-gray-300 relative">
        <FlightDetalhes :voo-detalhes="viagem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import FlightDetalhes from '@/components/Aereo/FlightDetalhes.vue';
import RenderFlights from '@/components/Aereo/RenderFlights.vue';
import { ref, provide } from 'vue';

const props = defineProps({
  viagem: {
    type: Object,
    default: () => {},
  },
});

provide('ofertasDesde', props.viagem.OfertasDesde);
provide('ciaMandatoria', props.viagem.CiaMandatoria);
provide('preco', props.viagem.Preco);

let vooDetalhesReturn = ref(null);
let vooDetalhesOutbound = ref(null);

const vooDetalhesReturnFlights = (fligth) => {
  vooDetalhesReturn.value = fligth;
};

const vooDetalhesOutboundFlights = (fligth) => {
  vooDetalhesOutbound.value = fligth;
};
</script>

<style scoped></style>
