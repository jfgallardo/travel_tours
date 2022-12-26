<template>
  <div class="px-4 mx-auto">
    <div class="grid grid-col-1 grid-flow-row gap-2.5">
      <div v-for="company in companies" :key="company.CodigoIata">
        <label class="flex items-center">
          <input
            v-model="arrayCompanies" :value="company.CodigoIata" class="h-4 w-4 text-zinc-800 cursor-pointer focus:ring-0 mr-2"
            type="checkbox">
          <span>{{ company.Descricao }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

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