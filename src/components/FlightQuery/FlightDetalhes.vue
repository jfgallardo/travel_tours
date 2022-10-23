<template>
  <div>
    <div class="grid grid-flow-row auto-rows-max gap-3 content-start">
      <div class="mt-5 px-2">
        <div class="space-y-3 text-sm font-light">
          <p class="flex items-center justify-between">
            <span>1 Oferta</span
            ><span v-if="vooDetalhes">${{ ValorTotal }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span>Passageiros</span> <span>{{ TotalPassageiros }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span>Taxas y encargos</span>
            <span v-if="vooDetalhes">${{ ValorTotalTaxas }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span>Subtotal</span>
            <span v-if="vooDetalhes">${{ ValorTotalComTaxa }}</span>
          </p>
          <p
            class="flex items-center justify-between border-y py-2 border-gray-300 text-red-500"
          >
            <span>Descuento (-30%)</span>
            <span>-$484</span>
          </p>
          <p
            class="flex items-center justify-between border-b border-dashed pb-2 border-gray-300"
          >
            <span>Total</span> <span class="text-3xl font-bold">$1131</span>
          </p>
        </div>
      </div>
      <div class="h-32 w-full flex items-center justify-center">
        <qrcode-vue :value="value"></qrcode-vue>
      </div>
      <div>
        <button class="bg-black text-white w-full py-2">Comprar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, computed } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { useMoblixStore } from '@/stores/moblix';

onUpdated(() => {
  value.value = `${window.location.protocol}//${
    window.location.host
  }/${Object.keys(props.vooDetalhes)
    .map((key) => `${key}=${props.vooDetalhes[key]}`)
    .join('&')}`;
});

const props = defineProps({
  vooDetalhes: {
    type: Object,
    default: () => {},
  },
});

const value = ref('');
const moblixStore = useMoblixStore();

const ValorTotalTaxas = computed(() => {
  return Number(props.vooDetalhes.ValorTotalTaxas.toFixed(2));
});
const ValorTotalComTaxa = computed(() => {
  return Number(props.vooDetalhes.ValorTotalComTaxa.toFixed(2));
});
const ValorTotal = computed(() => {
  return Number(props.vooDetalhes.ValorTotal.toFixed(2));
});
const TotalPassageiros = computed(() => {
  return (
    moblixStore.qntdBebe + moblixStore.qntdCrianca + moblixStore.qntdAdulto
  );
});
</script>

<style scoped></style>
