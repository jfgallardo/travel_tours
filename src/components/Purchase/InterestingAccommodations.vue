<template>
  <div>
    <div class="mx-auto px-4">
      <h2 class="font-bold pb-2.5">Acomodações interessantes neste destino</h2>
      <div class="grid grid-cols-2 grid-flow-row gap-3.5">
        <div class="text-xs">
          <img :src="Miami" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
        <div class="text-xs">
          <img :src="Londres" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
        <div class="text-xs">
          <img :src="Madrid" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
        <div class="text-xs">
          <img :src="Miami" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
        <div class="text-xs">
          <img :src="Londres" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
        <div class="text-xs">
          <img :src="Madrid" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
        <div class="text-xs">
          <img :src="Miami" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
        <div class="text-xs">
          <img :src="Londres" alt="img" class="h-40 w-64" />
          <p>Miami</p>
          <p class="font-bold">$199.99 | 12 Vuelos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Londres from '@/assets/img/londres.jpg';
import Madrid from '@/assets/img/madrid.jpg';
import Miami from '@/assets/img/miami.jpg';
</script>

<style scoped></style>
