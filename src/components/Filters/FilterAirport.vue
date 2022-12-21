<template>
  <div class="px-4 mx-auto">
    {{ arrayAirport }}
    <div class="grid grid-cols-2 grid-flow-row gap-2.5">
      <CheckInput label="GRU" @input-text="selectAirport" />
      <CheckInput label="BSB" @input-text="selectAirport" />
      <CheckInput label="HAV" @input-text="selectAirport" />
      <CheckInput label="RIO" @input-text="selectAirport" />
    </div>
  </div>
</template>

<script setup>
import CheckInput from "@/components/FormUI/CheckInput.vue";
import { ref } from "vue";

const arrayAirport = ref([]);

const selectAirport = (e) => {
  if (arrayAirport.value.find(element => element === e)) {
    let i = arrayAirport.value.indexOf(e);
    arrayAirport.value.splice( i, 1 );
  } else {
    arrayAirport.value.push(e);
  }
};
</script>

<style scoped>

</style>