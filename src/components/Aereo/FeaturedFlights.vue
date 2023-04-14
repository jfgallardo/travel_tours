<template>
  <!--  <div class="py-5">
    <div class="container mx-auto px-4">
      <p class="font-medium pb-2">Vuelos en destaques</p>
      <div class="flex items-center justify-evenly space-x-4">
        <div class="hidden md:block">
          <div class="border-b border-black pb-2">
            <img src="@/assets/img/viaje2.jpg" class="h-72 w-72" />
          </div>
          <div>
            <div>
              <p class="font-light">Argentina</p>
              <p class="font-medium">12 Vuelos</p>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="border-b border-black pb-2">
            <img src="@/assets/img/viaje1.jpg" class="h-72 w-72" />
          </div>
          <div>
            <div>
              <p class="font-light">Brasil</p>
              <p class="font-medium">10 Vuelos</p>
            </div>
          </div>
        </div>
        <div>
          <div class="border-b border-black pb-2">
            <img src="@/assets/img/viaje3.jpg" class="h-72 w-72" />
          </div>
          <div>
            <div>
              <p class="font-light">Cuba</p>
              <p class="font-medium">8 Vuelos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <div class="pt-20">
    <CarouselComponent
      :images="sliders"
      label="Vuelos en destaque"
      :label-image="false"
    >
      <template #footer="slotProps">
        <div>
          <p class="font-light">{{ slotProps.city }}</p>
          <p class="font-medium">{{ slotProps.count }} Vuelos</p>
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
