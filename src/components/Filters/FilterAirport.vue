<template>
  <div class="px-4 mx-auto">
    <div class="grid grid-cols-2 grid-flow-row gap-2.5">
      <div v-for="airport in airports" :key="airport">
        <label class="flex items-center">
          <input
            ref="inputs"
            v-model="arrayAirport" :value="airport" class="h-4 w-4 text-zinc-800 cursor-pointer focus:ring-0 mr-2"
            type="checkbox">
          <span>{{ airport }}</span>
        </label>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  airports: {
    type: Array,
    default: () => []
  },
  values: {
    type: Array,
    default: () => []
  }
});

const inputs = ref(null)

onMounted(() => {
  if (props.values.length > 0) {
    arrayAirport.value = props.values
  }
})

const emits = defineEmits(["setAirports"]);

const arrayAirport = ref([]);

/*const selectAirport = (e) => {
  if (arrayAirport.value.find(element => element === e)) {
    let i = arrayAirport.value.indexOf(e);
    arrayAirport.value.splice(i, 1);
  } else {
    arrayAirport.value.push(e);
  }
};*/

watch(
  () => arrayAirport,
  (val) => {
    emits("setAirports", val);
  },
  { deep: true }
);

</script>

<style scoped>

</style>