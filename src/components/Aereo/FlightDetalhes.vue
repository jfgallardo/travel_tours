<template>
  <div>
    <div v-if="vooDetalhes" class="grid grid-flow-row auto-rows-max gap-2 content-start">
      <div class="mt-5 px-2 mb-3">
        <div class="space-y-1 text-sm font-light">
          <p v-if="precoAdulto" class="flex items-center justify-between">
            <span>{{ t("adults") }}</span> <span>{{ precoAdulto }}</span>
          </p>
          <p v-if="precoCrianca" class="flex items-center justify-between">
            <span>{{ t("children") }}</span> <span>{{ precoCrianca }}</span>
          </p>
          <p v-if="precoBebe" class="flex items-center justify-between">
            <span>{{ t("babies") }}</span> <span>{{ precoBebe }}</span>
          </p>
          <p
            v-if="false"
            class="flex items-center justify-between border-y py-2 border-gray-300 text-red-500"
          >
            <span>Descuento (-30%)</span>
            <span>-$484</span>
          </p>
          <p class="flex items-center justify-between">
            <span>Taxas y encargos</span>
            <span>{{ ValorTaxas }}</span>
          </p>
          <p
            class="flex items-center justify-between border-b border-dashed pb-2 border-gray-300"
          >
            <span>Valor Total</span> <span class="text-xl font-semibold">{{ ValorTotal }}</span>
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <qrcode-vue :size="80" :value="value"></qrcode-vue>
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
import { computed, onUpdated, ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import { useCurrencyFormatter } from "@/composables/currencyFormatter";

onUpdated(() => {
  value.value = `${window.location.protocol}//${window.location.host}/`;
});

const props = defineProps({
  vooDetalhes: {
    type: Object,
    default: () => {
    }
  }
});
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

const value = ref("");

const ValorTaxas = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: props.vooDetalhes.Preco.Taxa
  });
});
const ValorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: props.vooDetalhes.Preco.Total
  });
});
const precoAdulto = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: props.vooDetalhes.Preco.PrecoAdulto.ValorTarifa
  });

});
const precoCrianca = computed(() => {
  if (props.vooDetalhes.Preco.PrecoCrianca) {
    return useCurrencyFormatter({
      currency: "BRL",
      value: props.vooDetalhes.Preco.PrecoCrianca.ValorTarifa
    })
  }
  return null;
});
const precoBebe = computed(() => {
  if (props.vooDetalhes.Preco.PrecoBebe) {
    return useCurrencyFormatter({
      currency: "BRL",
      value: props.vooDetalhes.Preco.PrecoBebe.ValorTarifa
    });
  }
  return null;
});
const goToPre = () => {
  userStore.vooSelected = props.vooDetalhes;
  router.push({ name: "PreCheckoutPage" });
};

</script>

<style scoped></style>
