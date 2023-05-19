<template>
  <div>
    <div
      v-if="vooDetalhes"
      class="grid grid-rows-auto auto-rows-max gap-3.5 2xl:gap-1 content-start"
    >
      <div class="mt-5 2xl:mt-0.5 px-5 mb-3">
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
            class="flex items-center justify-between px-0 py-4 border-b border-dashed border-gray-300"
          >
            <span class="mx-5">Total</span>
            <span class="text-black font-bold text-2xl">{{ ValorTotal }}</span>
          </p>
        </div>
      </div>
      <div v-if="!isQr" class="flex justify-center mb-20 -mt-4 lg:mt-0">
        <button
          v-if="keyVooSelected === vooDetalhes.Key"
          class="bg-blue-700 hover:bg-blue-800 text-white w-full py-2 absolute bottom-0 font-bold"
          @click="confirmSelection"
        >
          Confirmar seleçao
        </button>
      </div>
      <template v-else>
        <div class="flex justify-center mb-20 -mt-4 lg:mt-0">
          <qrcode-vue :size="90" :value="value"></qrcode-vue>
        </div>
        <div>
          <button
            class="bg-blue-700 hover:bg-blue-800 text-white w-full py-2 absolute bottom-0 font-bold"
            @click="goToPre"
          >
            Seleccionar
          </button>
        </div>
      </template>
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
  if (props.vooDetalhes) {
    value.value = `${window.location.protocol}//${window.location.host}/precheckout/${props.vooDetalhes.Key}`;
  }
});

const emit = defineEmits(['heSelected']);

const props = defineProps({
  vooDetalhes: {
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
  isQr: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();
const { t } = useI18n();
const value = ref('');

const ValorTaxas = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.vooDetalhes.ValorTotalTaxas,
  });
});
const ValorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.vooDetalhes.ValorTotalComTaxa,
  });
});

const SubTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.vooDetalhes.Preco - props.vooDetalhes.ValorTotalTaxas,
  });
});
const precoAdulto = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: props.vooDetalhes.ValorAdulto,
  });
});
const precoCrianca = computed(() => {
  if (props.vooDetalhes.ValorCrianca) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: props.vooDetalhes.ValorCrianca,
    });
  }
  return null;
});
const precoBebe = computed(() => {
  if (props.vooDetalhes.ValorBebe) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: props.vooDetalhes.ValorBebe,
    });
  }
  return null;
});
const goToPre = () => {
  Cookies.set(props.typeFlight, JSON.stringify(props.vooDetalhes));
  router.push({ name: 'PreCheckoutPage' });
};

const confirmSelection = () => {
  Cookies.set(props.typeFlight, JSON.stringify(props.vooDetalhes));
  emit('heSelected', props.typeFlight);
};
</script>

<style scoped></style>
