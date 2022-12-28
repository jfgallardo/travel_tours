<template>
  <div class="px-4 mx-auto">
    <div class="grid grid-col-1 grid-flow-row gap-1.5">
      <div v-for="company in companies" :key="company.CodigoIata">
        <label class="flex items-center justify-start">
          <input
            v-model="arrayCompanies" :value="company.CodigoIata" class="h-4 w-4 text-zinc-800 cursor-pointer focus:ring-0 mr-2"
            type="checkbox">
          <div class="flex flex-col">
            <span>{{ company.Descricao }}</span>
            <template v-for="offer in  woobaStore.offers" :key="offer.company">
              <span v-if="company.CodigoIata === offer.company"  class="font-light text-sm text-gray-500">a partir de {{useCurrencyFormatter({ currency: "BRL",value: offer.offers})}}</span>
            </template>
          </div>

        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useWoobaStore } from "@/stores/wooba";
import { useCurrencyFormatter } from "@/composables/currencyFormatter";

const props = defineProps({
  companies: {
    type: Array,
    default: () => []
  },
  values: {
    type: Array,
    default: () => []
  }
});

const woobaStore = useWoobaStore()

onMounted(() => {
  if (props.values.length > 0) {
    arrayCompanies.value = props.values
  }
})

const emits = defineEmits(["setCompanies"]);

const arrayCompanies = ref([]);

watch(
  () => arrayCompanies,
  (val) => {
    emits("setCompanies", val);
  },
  { deep: true }
);

</script>

<style scoped>

</style>