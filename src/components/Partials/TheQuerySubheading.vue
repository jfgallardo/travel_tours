<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div class="grid grid-cols-9 grid-rows-1 h-full w-full">
      <SelectSimple :options="bags" placeholder="Filtro Bagagem" />
      <SelectSimple :options="companies" placeholder="Compania" />
      <SelectSimple :options="connection" placeholder="Paradas" />

      <SelectSimple placeholder="Horario de llegada">
        <template v-if="t_llegada" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span v-if="t_llegada.initTime">Ida - {{ t_llegada.initTime }}</span>
            <span v-if="t_llegada.endTime"> Volta - {{ t_llegada.endTime }}</span>
          </div>
        </template>
        <FilterDepartureTime :times="t_llegada" @clear="t_llegada=null" @time="t_llegada=$event" />
      </SelectSimple>

      <SelectSimple placeholder="Horario de partida">
        <template v-if="t_partida" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span v-if="t_partida.initTime">Ida - {{ t_partida.initTime }}</span>
            <span v-if="t_partida.endTime"> Volta - {{ t_partida.endTime }}</span>
          </div>
        </template>
        <FilterDepartureTime :times="t_partida" @clear="t_partida=null" @time="t_partida=$event" />
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

      <SelectSimple :options="classes" placeholder="Areopuertos">
        <FilterAirport :airports="airports" :values="selectAirports" @set-airports="selectAirports = $event" />
      </SelectSimple>

      <SelectSimple :options="classes" placeholder="Precio">
        <FilterPrice />
      </SelectSimple>
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
import FilterPrice from "@/components/Filters/FilterPrice.vue";
import FilterAirport from "@/components/Filters/FilterAirport.vue";

const searchOptionsVoo = useSearchOptionsVooStore();
const t_llegada = ref(null);
const t_partida = ref(null);
const duration = ref("");
const airports = ref(["SAO", "BSB", "HAV", "GRU", "RIO"]);
const selectAirports = ref(["SAO", "BSB", "HAV", "GRU", "RIO"]);

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
