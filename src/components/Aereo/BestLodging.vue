<template>
  <div class="pt-20">
    <CarouselComponent
      :images="sliders"
      label="bestLodging.melhoresAlojamentos"
      :label-image="false"
    >
      <template #footer="slotProps">
        <div>
          <p class="font-light">{{ slotProps.city }}</p>
        </div>
      </template>
      <template #footer-right>
        <div></div>
      </template>
    </CarouselComponent>
  </div>
</template>

<script setup>
import Londres from '@/assets/img/viaje3.jpg';
import Madrid from '@/assets/img/viaje2.jpg';
import Miami from '@/assets/img/viaje1.jpg';
import CarouselComponent from '@/components/Partials/CarouselComponent.vue';

const sliders = [
  { url: Londres, city: 'Londres', count: 12 },
  { url: Madrid, city: 'Madrid', count: 8 },
  { url: Miami, city: 'Miami', count: 12 },
  { url: Londres, city: 'Londres', count: 15 },
  { url: Miami, city: 'Espana', count: 10 },
  { url: Madrid, city: 'Madrid', count: 2 },
];
</script>
