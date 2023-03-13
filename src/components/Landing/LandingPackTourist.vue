<template>
  <div class="py-20">
    <CarouselComponent
      :images="sliders"
      label="Aproveite nossos pacotes"
    >
      <template #footer="slotProps">
        <div class="flex flex-col ml-2.5">
           <span class="text-xs text-gray-600"
           >Viaje + Alojamiento + Carro + Tours Guide</span
           >
          <span class="text-sm font-semibold"
          >${{ slotProps.price }} | {{ slotProps.people }} Personas |
            {{ slotProps.nights }} Noites</span
          >
        </div>
      </template>
    </CarouselComponent>
  </div>
</template>

<script setup>
import Tokio from '@/assets/img/tokio.jpg';
import Varadero from '@/assets/img/varadero.jpg';
import Copacabana from '@/assets/img/copa.jpg';
import CarouselComponent from "@/components/Partials/CarouselComponent.vue";

const sliders = [
  {
    url: Tokio,
    city: 'Tokio',
    people: 2,
    price: 1500,
    nights: 3,
  },
  {
    url: Varadero,
    city: 'Varadero',
    people: 3,
    price: 4700,
    nights: 5,
  },
  {
    url: Copacabana,
    city: 'Copacabana',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    url: Copacabana,
    city: 'China',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    url: Copacabana,
    city: 'Japon',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    url: Varadero,
    city: 'Varadero',
    people: 3,
    price: 4700,
    nights: 5,
  },
  {
    url: Copacabana,
    city: 'Copacabana',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    url: Copacabana,
    city: 'China',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    url: Copacabana,
    city: 'Japon',
    people: 1,
    price: 800,
    nights: 3,
  },
];
</script>
