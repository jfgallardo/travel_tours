<template>
  <div>
    <div class="grid grid-flow-row auto-rows-max gap-2 content-start">
      <div class="mt-5 px-2 mb-3">
        <div class="space-y-1 text-sm font-light">
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
            <span>Total</span> <span class="text-2xl font-bold">$1131</span>
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <qrcode-vue :value="value" :size="80"></qrcode-vue>
      </div>
      <div>
        <button
          class="bg-blue-700 hover:bg-blue-800 text-white w-full py-2 absolute bottom-0"
          @click="goToPre"
        >
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, computed } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { useMoblixStore } from '@/stores/moblix';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

onUpdated(() => {
  value.value = `${window.location.protocol}//${window.location.host}/`;
});

const props = defineProps({
  vooDetalhes: {
    type: Object,
    default: () => {},
  },
});
const router = useRouter();
const userStore = useUserStore();

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
const goToPre = () => {
  userStore.vooSelected = props.vooDetalhes;
  router.push({ name: 'PreCheckoutPage' });
};
</script>

<style scoped></style>
