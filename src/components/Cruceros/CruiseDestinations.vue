<template>
  <div>
    <div class="mx-auto container pt-8">
      <p class="text-center font-bold text-7xl">
        Explore nossos ótimos destinos
      </p>
      <div class="grid grid-cols-3 gap-3 pt-5">
        <div v-for="item in items" :key="item.name" class="relative">
          <img :src="item.img" class="h-72 w-72 object-cover contrast-75" />
          <p
            class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4 font-bold text-white text-3xl text-center"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Londres from '@/assets/img/londres.jpg';
import Madrid from '@/assets/img/madrid.jpg';
import Miami from '@/assets/img/miami.jpg';
import Puntacana from '@/assets/img/viaje1.jpg';
import SanJuan from '@/assets/img/viaje2.jpg';
import Uruguay from '@/assets/img/viaje3.jpg';

const items = [
  { img: Londres, name: 'Caribe' },
  { img: Madrid, name: 'Bahamas' },
  { img: Miami, name: 'Mexico' },
  { img: Madrid, name: 'Europe' },
  { img: Londres, name: 'Bermuda' },
  { img: Puntacana, name: 'Alaska' },
  { img: SanJuan, name: 'New England' },
  { img: Uruguay, name: 'Hawaii' },
  { img: Miami, name: 'Panama Canal' },
  { img: Londres, name: 'Transatlantic' },
  { img: Madrid, name: 'Australia' },
];
</script>

<style scoped></style>
