<template>
  <div class="pb-20 bg-gray-200">
    <CarouselComponent
      :images="sliders"
      label="Fotos de los viajeros destacados"
    >
      <template #footer="slotProps">
        <div class="mt-2 ml-2.5 flex space-x-2 items-center">
          <img
            :src="slotProps.avatar"
            class="rounded-full h-7 w-7 object-cover -ml-1"
          />
          <div class="text-xs">
            <p class="font-bold">{{ slotProps.travel }}</p>
            <p>{{ slotProps.place }}</p>
          </div>
        </div>
      </template>
      <template #footer-right>
        <div></div>
      </template>
    </CarouselComponent>
  </div>
</template>

<script setup>
import Puntacana from '@/assets/img/viaje1.jpg';
import SanJuan from '@/assets/img/viaje2.jpg';
import Uruguay from '@/assets/img/viaje3.jpg';
import Avatar1 from '@/assets/img/avatar1.jpg';
import Avatar2 from '@/assets/img/avatar2.jpg';
import Avatar3 from '@/assets/img/avatar3.jpg';
import CarouselComponent from "@/components/Partials/CarouselComponent.vue";

const sliders = [
  {
    city: '',
    url: Puntacana,
    avatar: Avatar1,
    travel: 'Jessica Palmer',
    place: 'Puntacana',
  },
  {
    city: '',
    url: SanJuan,
    avatar: Avatar2,
    travel: 'Rudiguer Corinho',
    place: 'San Juan',
  },
  {
    city: '',
    url: Uruguay,
    avatar: Avatar3,
    travel: 'Vivian Meldier',
    place: 'Uruguay',
  },
  {
    city: '',
    url: Uruguay,
    avatar: Avatar3,
    travel: 'Ernesto Meldier',
    place: 'Chile',
  },
  {
    city: '',
    url: Uruguay,
    avatar: Avatar3,
    travel: 'Juan Placencia',
    place: 'Peru',
  },
  {
    city: '',
    url: SanJuan,
    avatar: Avatar2,
    travel: 'Rudiguer Corinho',
    place: 'San Juan',
  },
  {
    city: '',
    url: Uruguay,
    avatar: Avatar3,
    travel: 'Vivian Meldier',
    place: 'Uruguay',
  },
  {
    city: '',
    url: Uruguay,
    avatar: Avatar3,
    travel: 'Ernesto Meldier',
    place: 'Chile',
  },
  {
    city: '',
    url: Uruguay,
    avatar: Avatar3,
    travel: 'Juan Placencia',
    place: 'Peru',
  },
];
</script>
