<template>
  <div class="bg-gray-200">
    <Carousel>
      <template v-slot:title> Fotos de los viajeros destacados </template>
      <CarouselSlider
        v-for="slide in sliders"
        :key="slide.city"
        :slide="slide"
        :black="true"
      >
        <template v-slot:image>
          <img
            v-bind:src="slide.src"
            class="w-full h-64 object-cover"
          />
        </template>
        <template v-slot:footer>
          <div class="mt-2 flex space-x-2 items-center">
            <img
              :src="slide.avatar"
              class="rounded-full h-7 w-7 object-cover ring-1 ring-white -ml-1"
            />
            <div class="text-xs">
              <p class="font-bold">{{ slide.travel }}</p>
              <p>{{ slide.place }}</p>
            </div>
          </div>
        </template>
      </CarouselSlider>
    </Carousel>
  </div>
</template>

<script setup>
import Carousel from '@/components/Partials/TheCarousel.vue';
import CarouselSlider from '@/components/Partials/TheCarouselSlider.vue';
import Puntacana from '@/assets/img/viaje1.jpg';
import SanJuan from '@/assets/img/viaje2.jpg';
import Uruguay from '@/assets/img/viaje3.jpg';
import Avatar1 from '@/assets/img/avatar1.jpg';
import Avatar2 from '@/assets/img/avatar2.jpg';
import Avatar3 from '@/assets/img/avatar3.jpg';

const sliders = [
  {
    city: '',
    src: Puntacana,
    avatar: Avatar1,
    travel: 'Jessica Palmer',
    place: 'Puntacana',
  },
  {
    city: '',
    src: SanJuan,
    avatar: Avatar2,
    travel: 'Rudiguer Corinho',
    place: 'San Juan',
  },
  {
    city: '',
    src: Uruguay,
    avatar: Avatar3,
    travel: 'Vivian Meldier',
    place: 'Uruguay',
  },
  {
    city: '',
    src: Uruguay,
    avatar: Avatar3,
    travel: 'Ernesto Meldier',
    place: 'Chile',
  },
  {
    city: '',
    src: Uruguay,
    avatar: Avatar3,
    travel: 'Juan Placencia',
    place: 'Peru',
  },
  {
    city: '',
    src: SanJuan,
    avatar: Avatar2,
    travel: 'Rudiguer Corinho',
    place: 'San Juan',
  },
  {
    city: '',
    src: Uruguay,
    avatar: Avatar3,
    travel: 'Vivian Meldier',
    place: 'Uruguay',
  },
  {
    city: '',
    src: Uruguay,
    avatar: Avatar3,
    travel: 'Ernesto Meldier',
    place: 'Chile',
  },
  {
    city: '',
    src: Uruguay,
    avatar: Avatar3,
    travel: 'Juan Placencia',
    place: 'Peru',
  },
];
</script>
