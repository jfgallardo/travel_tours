<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div class="grid grid-cols-9 grid-rows-1 h-full w-full">
      <SelectSimple :loading="woobaStore.loading" :options="bags" placeholder="Filtro Bagagem" />
      <SelectSimple :loading="woobaStore.loading" placeholder="Compania">
        <FilterCompanies
          :companies="woobaStore.companies" :values="selectCompanies"
          @set-companies="selectCompanies = $event" />
      </SelectSimple>
      <SelectSimple :loading="woobaStore.loading" :options="connection" placeholder="Paradas" />

      <SelectSimple :loading="woobaStore.loading" placeholder="Horario de llegada">
        <template v-if="t_llegada" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span v-if="t_llegada.initTime">Ida - {{ t_llegada.initTime }}</span>
            <span v-if="t_llegada.endTime"> Volta - {{ t_llegada.endTime }}</span>
          </div>
        </template>
        <FilterDepartureTime :times="t_llegada" @clear="t_llegada=null" @time="t_llegada=$event" />
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" placeholder="Horario de partida">
        <template v-if="t_partida" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span v-if="t_partida.initTime">Ida - {{ t_partida.initTime }}</span>
            <span v-if="t_partida.endTime"> Volta - {{ t_partida.endTime }}</span>
          </div>
        </template>
        <FilterDepartureTime :times="t_partida" @clear="t_partida=null" @time="t_partida=$event" />
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" placeholder="Duracion">
        <template v-if="duration" #showSelected>
          <div class="flex items-center justify-around w-full">
            <span>Duracion {{ duration }}hrs </span>
          </div>
        </template>
        <FilterDuration
          v-model="duration"
          :max="woobaStore.travelTime.longerTime"
          :min="woobaStore.travelTime.lessTime" />
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" :options="classes" placeholder="Clase" />

      <SelectSimple :loading="woobaStore.loading" placeholder="Areopuertos">
        <FilterAirport
          :airports="woobaStore.airportsFilter"
          :values="selectAirports"
          @set-airports="selectAirports = $event" />
      </SelectSimple>

      <SelectSimple :loading="woobaStore.loading" :options="classes" placeholder="Precio">
        <FilterPrice />
      </SelectSimple>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import ArrowLeft from "@/components/Icons/ArrowLeft.vue";
import SelectSimple from "@/components/FormUI/TheSelectSimple.vue";
import { useSearchOptionsVooStore } from "@/stores/searchOptionsVoo";
import { useWoobaStore } from "@/stores/wooba";
import FilterDepartureTime from "@/components/Filters/FilterDepartureTime.vue";
import FilterDuration from "@/components/Filters/FilterDuration.vue";
import FilterPrice from "@/components/Filters/FilterPrice.vue";
import FilterAirport from "@/components/Filters/FilterAirport.vue";
import FilterCompanies from "@/components/Filters/FilterCompanies.vue";

const searchOptionsVoo = useSearchOptionsVooStore();
const woobaStore = useWoobaStore();

const t_llegada = ref(null);
const t_partida = ref(null);
const duration = ref("");
//FILTERS
const selectAirports = ref([]);
const selectCompanies = ref([]);

watch(
  () => woobaStore.companies,
  (state) => {
    selectCompanies.value = state.map((o) => {
      return o.CodigoIata;
    });
  },
  { deep: true }
);

watch(
  () => woobaStore.airportsFilter,
  (state) => {
    selectAirports.value = state;
  },
  { deep: true }
);

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

</script>
