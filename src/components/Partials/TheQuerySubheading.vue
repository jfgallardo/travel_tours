<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div class="grid grid-cols-6 grid-rows-1 h-full w-full">
      <SelectSimple :options="bags" placeholder="Filtro Bagagem" />
      <SelectSimple :options="companies" placeholder="Compania" />
      <SelectSimple :options="connection" placeholder="Conexiones" />

      <SelectSimple placeholder="Horario de partida">
        <template v-if="times" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span v-if="times.initTime">Ida - {{ times.initTime }}</span>
            <span v-if="times.endTime"> Volta - {{ times.endTime }}</span>
          </div>
        </template>
        <FilterDepartureTime :times="times" @clear="times=null" @time="times=$event" />
      </SelectSimple>

      <SelectSimple placeholder="Duracion">
        <template v-if="duration" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span>Duracion 2hrs - {{ duration }}hrs</span>
          </div>
        </template>
        <FilterDuration v-model="duration" />
      </SelectSimple>

      <SelectSimple :options="classes" placeholder="Clase" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ArrowLeft from "@/components/Icons/ArrowLeft.vue";
import SelectSimple from "@/components/FormUI/TheSelectSimple.vue";
import { useSearchOptionsVooStore } from "@/stores/searchOptionsVoo";
import FilterDepartureTime from "@/components/Filters/FilterDepartureTime.vue";
import FilterDuration from "@/components/Filters/FilterDuration.vue";

const searchOptionsVoo = useSearchOptionsVooStore();
const times = ref(null);
const duration = ref("");

const bags = computed(() => {
  if (searchOptionsVoo.onlyBaggage) {
    return [{ name: "Apenas com babagem", value: "1" }];
  }
  return [
    { name: "Apenas com babagem", value: "1" },
    { name: "Apenas sim babagem", value: "2" }
  ];
});

const connection = computed(() => {
  return [
    { name: "Directo", value: "D" },
    { name: "1 Parada", value: "O" },
    { name: "2 o más Paradas", value: "M" }
  ];
});

const classes = [
  {
    name: "Econômica",
    value: "Y"
  },
  {
    name: "Econômica Premium",
    value: "W"
  },
  {
    name: "Executiva",
    value: "C"
  },
  {
    name: "Primeira Classe",
    value: "F"
  },
  {
    name: "Econômica + Premium",
    value: "P"
  }
];

const companies = [
  { name: "Copa Arline", value: "C" },
  { name: "LATAM", value: "LT" }
];
</script>
