<template>
  <div class="flex items-center">
    <div class="px-3">
      <ArrowLeft class="cursor-pointer" @click="$router.go(-1)" />
    </div>

    <div class="grid grid-cols-8 grid-rows-1 h-full w-full">
      <SelectSimple :options="bags" />
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
import { computed } from 'vue';
import ArrowLeft from '@/components/Icons/ArrowLeft.vue';
import SelectSimple from '@/components/FormUI/TheSelectSimple.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';

const searchOptionsVoo = useSearchOptionsVooStore();

const bags = computed(() => {
  if (searchOptionsVoo.onlyBaggage) {
    return [{ name: 'Apenas com babagem', value: '1' }];
  }
  return [
    { name: 'Com/Sim babagem', value: '0' },
    { name: 'Apenas com babagem', value: '1' },
    { name: 'Apenas sim babagem', value: '2' },
  ];
});

const conexões = [
  {
    name: 'Econômica',
    value: 'Y',
  },
  {
    name: 'Econômica Premium',
    value: 'W',
  },
  {
    name: 'Executiva',
    value: 'C',
  },
  {
    name: 'Primeira Classe',
    value: 'F',
  },
  {
    name: 'Econômica + Premium',
    value: 'P',
  },
];
</script>
