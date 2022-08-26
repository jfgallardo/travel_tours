<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft />
    </div>

    <div class="grid grid-cols-8 grid-rows-1 h-full w-full">
      <SelectSimple :options="conexões" />
      <SelectSimple :options="conexões" />
      <SelectSimple :options="conexões" />
      <SelectSimple :options="conexões" />
      <SelectSimple :options="conexões" />
      <SelectSimple :options="conexões" />
      <SelectSimple :options="conexões" />
      <SelectSimple :options="conexões" />
    </div>
  </div>
</template>

<script setup>
import ArrowLeft from "@/components/Icons/ArrowLeft.vue";
import SelectSimple from "@/components/FormUI/TheSelectSimple.vue";

const conexões = [
  {
    name: "Econômica",
    value: "Y",
  },
  {
    name: "Econômica Premium",
    value: "W",
  },
  {
    name: "Executiva",
    value: "C",
  },
  {
    name: "Primeira Classe",
    value: "F",
  },
  {
    name: "Econômica + Premium",
    value: "P",
  },
];
</script>
