<template>
  <div class="flex flex-col">
    <div class="p-4 text-center" :class="color">
      <span class="text-white font-semibold text-2xl">{{ header }}</span>
    </div>
    <div class="bg-gray-200 p-4 space-y-4">
      <div>
        <span class="text-sm font-medium">a partir de</span>
        <span class="text-4xl font-semibold">R$ </span>
        <span class="text-7xl font-semibold">{{ price }}</span>
        <span class="text-4xl font-semibold">,{{ hundred }}</span>
      </div>
      <div class="text-center">
        <p class="border border-black py-3 text-xl">{{ group }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-extralight">
          Modelo: Hatch Compacto 1.0 | Renault KWID, Fiat Mobi ou similares
        </p>
      </div>
    </div>
    <div class="h-8" :class="color"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  header: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  hundred: {
    type: Number,
    default: 0,
  },
  group: {
    type: String,
    default: '',
  },
});
</script>
