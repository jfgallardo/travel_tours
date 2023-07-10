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
    value.value = `${window.location.protocol}//${window.location.host}/precheckout/${vooOne.value.Key}/${vooTwo.value.Key}`;
  }
});

const router = useRouter();
const { t } = useI18n();
const value = ref('');

const ValorTaxas = computed(() => {
  const price_one = vooOne.value.FareGroup.priceWithTax - vooOne.value.FareGroup.priceWithoutTax;
  const price_two = vooTwo.value.FareGroup.priceWithTax - vooTwo.value.FareGroup.priceWithoutTax;

  return useCurrencyFormatter({
    currency: 'BRL',
    value: price_one + price_two,
  });
});
const ValorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: vooOne.value.FareGroup.priceWithTax + vooTwo.value.FareGroup.priceWithTax,
  });
});

const SubTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value:
      vooOne.value.FareGroup.priceWithoutTax + vooTwo.value.FareGroup.priceWithoutTax,
  });
});
const precoAdulto = computed(() => {
  const fares_one = vooOne.value.FareGroup.fares.find(o => o.passengersType === 'ADT' )
  const fares_two = vooTwo.value.FareGroup.fares.find(o => o.passengersType === 'ADT' )
  return useCurrencyFormatter({
    currency: 'BRL',
    value: fares_one.priceWithTax + fares_two.priceWithTax,
  });
});
const precoCrianca = computed(() => {
  const fares_one = vooOne.value.FareGroup.fares.find(o => o.passengersType === 'CHD' )
  const fares_two = vooTwo.value.FareGroup.fares.find(o => o.passengersType === 'CHD' )
  if (fares_one || fares_two) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: fares_one.priceWithTax + fares_two.priceWithTax,
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
