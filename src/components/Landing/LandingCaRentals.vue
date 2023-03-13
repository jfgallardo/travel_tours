<template>
  <div class="pb-20">
    <CarouselComponent
      :images="sliders"
      label="Destinos populares para aluguel de carros"
    >
      <template #footer="slotProps">
        <div class="ml-2.5">
          <span class="text-xs text-gray-600"
            >{{ slotProps.place }} lugares de colecao</span
          ><br />
          <span class="text-sm font-semibold"
            >De ${{ slotProps.price }}/dia</span
          >
        </div>
      </template>
    </CarouselComponent>
  </div>
</template>

<script setup>
import Londres from '@/assets/img/londres.jpg';
import Madrid from '@/assets/img/madrid.jpg';
import Miami from '@/assets/img/miami.jpg';
import CarouselComponent from '@/components/Partials/CarouselComponent.vue';

const sliders = [
  { url: Londres, city: 'Londres', place: 75, price: 44.99 },
  { url: Madrid, city: 'Madrid', place: 23, price: 32.9 },
  { url: Miami, city: 'Miami', place: 12, price: 40 },
  { url: Miami, city: 'Espana', place: 42, price: 240 },
  { url: Miami, city: 'Cuba', place: 42, price: 240 },
  { url: Londres, city: 'Londres', place: 75, price: 44.99 },
  { url: Madrid, city: 'Madrid', place: 23, price: 32.9 },
  { url: Miami, city: 'Miami', place: 12, price: 40 },
  { url: Miami, city: 'Espana', place: 42, price: 240 },
  { url: Miami, city: 'Cuba', place: 42, price: 240 },
];
</script>

<style scoped></style>
