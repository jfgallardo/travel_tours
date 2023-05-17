<template>
  <div
    v-if="vooOne && vooTwo"
    class="grid grid-rows-auto auto-rows-max gap-3.5 2xl:gap-1 content-start"
  >
    <div class="mt-5 2xl:mt-0.5 mb-3 px-5">
      <div class="space-y-1 text-sm font-light">
        <br />
        <p v-if="precoAdulto" class="flex items-center justify-between">
          <span>{{ t('adults') }}</span>
          <span>{{ precoAdulto }}</span>
        </p>
        <p v-if="precoCrianca" class="flex items-center justify-between">
          <span>{{ t('children') }}</span>
          <span>{{ precoCrianca }}</span>
        </p>
        <p v-if="precoBebe" class="flex items-center justify-between">
          <span>{{ t('babies') }}</span>
          <span>{{ precoBebe }}</span>
        </p>
        <p class="flex items-center justify-between">
          <span>Taxas y encargos</span>
          <span>{{ ValorTaxas }}</span>
        </p>
        <p class="flex items-center justify-between pb-2">
          <span>SubTotal</span>
          <span>{{ SubTotal }}</span>
        </p>
        <p
          class="flex items-center justify-between border-y py-2 border-gray-300 text-red-700"
        >
          <span>Descuento (-30%)</span>
          <span>-$484</span>
        </p>
        <p
          class="flex items-center justify-between py-4 border-b border-dashed border-gray-300"
        >
          <span>Total</span>
          <span class="text-black font-bold text-2xl">{{ ValorTotal }}</span>
        </p>
      </div>
    </div>
    <div class="flex justify-center mb-8 -mt-4 lg:mt-0">
      <qrcode-vue :size="90" :value="value"></qrcode-vue>
    </div>
    <div>
      <button
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 font-bold w-full"
        @click="goToPre"
      >
        Seleccionar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import QrcodeVue from 'qrcode.vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';

onMounted(() => {
  if (vooOne.value && vooTwo.value) {
    value.value = `${window.location.protocol}//${window.location.host}/precheckout/${vooOne.value.Id}/${vooTwo.value.Id}`;
  }
});

const router = useRouter();
const { t } = useI18n();
const value = ref('');

const ValorTaxas = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: vooOne.value.ValorTotalTaxas + vooTwo.value.ValorTotalTaxas,
  });
});
const ValorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: vooOne.value.ValorTotalComTaxa + vooTwo.value.ValorTotalComTaxa,
  });
});

const SubTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value:
      vooOne.value.Preco -
      vooOne.value.ValorTotalTaxas +
      (vooTwo.value.Preco - vooTwo.value.ValorTotalTaxas),
  });
});
const precoAdulto = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: vooOne.value.ValorAdulto + vooTwo.value.ValorAdulto,
  });
});
const precoCrianca = computed(() => {
  if (vooOne.value.ValorCrianca && vooTwo.value.ValorCrianca) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: vooOne.value.ValorCrianca + vooTwo.value.ValorCrianca,
    });
  }
  return null;
});
const precoBebe = computed(() => {
  if (vooOne.value.ValorBebe && vooTwo.value.ValorBebe) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: vooOne.value.ValorBebe + vooTwo.value.ValorBebe,
    });
  }
  return null;
});
const goToPre = () => {
  router.push({ name: 'PreCheckoutPage' });
};

const vooOne = computed(() => {
  return Cookies.get('I') ? JSON.parse(Cookies.get('I')) : null;
});

const vooTwo = computed(() => {
  return Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;
});
</script>

<style scoped></style>
