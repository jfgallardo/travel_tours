<!--<template>
  <div class="flex flex-col xl:flex-row 2xl:items-stretch px-6 py-2">
    <div class="flex flex-col justify-around border border-gray-300 xl:w-full">
      <div
        class="border-b border-gray-300 py-2"
        :class="{ 'self-center': !isVooIda }"
      >
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
      <div>
        <RenderFlights
          :key-id="keyIdIda"
          :flights="viagem['VoosIda']"
          @select-voo="vooDetalhesOutboundFlights"
        />
      </div>

      <template v-if="isVooIda">
        <div class="border-y border-gray-300 py-2">
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
        <div>
          <RenderFlights
            :flights="viagem['VoosVolta']"
            :key-id="keyIdVolta"
            @select-voo="vooDetalhesReturnFlights"
          />
        </div>
      </template>
    </div>

    <div
      class="border border-t-0 xl:border-t xl:border-l-0 xl:border-b-0 border-gray-300 relative"
    >
      <FlightDetalhes :voo-detalhes="viagem" />
    </div>
  </div>
</template>-->

<template>
  <div class="flex flex-col xl:flex-row 2xl:items-stretch">
    <!--  border-l  -->
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
    <div class="w-1/5 border-l border-gray-300 relative">
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
