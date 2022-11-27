<template>
  <div>
    <Carousel>
      <template v-slot:title> Aproveite nossos pacotes </template>
      <CarouselSlider
        v-for="slide in sliders"
        :key="slide.city"
        :slide="slide"
      >
        <template v-slot:image>
          <img
            v-bind:src="slide.src"
            class="w-full h-72 object-cover"
          />
        </template>
        <template v-slot:footer>
          <span class="text-xs text-gray-600"
            >Viaje + Alojamiento + Carro + Tours Guide</span
          ><br />
          <span class="text-sm font-semibold"
            >${{ slide.price }} | {{ slide.people }} Personas |
            {{ slide.nights }} Noites</span
          >
        </template>
        <template v-slot:footer-right>
          <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2" />
        </template>
      </CarouselSlider>
    </Carousel>
  </div>
</template>

<script setup>
import Carousel from '@/components/Partials/TheCarousel.vue';
import CarouselSlider from '@/components/Partials/TheCarouselSlider.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Tokio from '@/assets/img/tokio.jpg';
import Varadero from '@/assets/img/varadero.jpg';
import Copacabana from '@/assets/img/copa.jpg';

const sliders = [
  {
    src: Tokio,
    city: 'Tokio',
    people: 2,
    price: 1500,
    nights: 3,
  },
  {
    src: Varadero,
    city: 'Varadero',
    people: 3,
    price: 4700,
    nights: 5,
  },
  {
    src: Copacabana,
    city: 'Copacabana',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    src: Copacabana,
    city: 'China',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    src: Copacabana,
    city: 'Japon',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    src: Varadero,
    city: 'Varadero',
    people: 3,
    price: 4700,
    nights: 5,
  },
  {
    src: Copacabana,
    city: 'Copacabana',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    src: Copacabana,
    city: 'China',
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    src: Copacabana,
    city: 'Japon',
    people: 1,
    price: 800,
    nights: 3,
  },
];
</script>
