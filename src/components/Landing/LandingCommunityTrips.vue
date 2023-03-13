<template>
  <div class="pb-20 bg-gray-200">
    <CarouselComponent
      :images="sliders"
      label="Próximos viajes de la comunidad"
    >
      <template #footer="slotProps">
        <div class="mt-2 flex ml-2.5">
          <img
            v-for="avatar in slotProps.avatars"
            :key="avatar"
            :src="avatar"
            class="rounded-full h-7 w-7 object-cover ring-1 ring-white -ml-1"
          />
          <div
            class="border h-7 w-7 pt-1 ring-1 ring-white rounded-full text-xs text-white bg-gray-300 -ml-1"
          >
            +24
          </div>
        </div>
      </template>
      <template #footer-right="slotProps">
        <div class="text-sm">{{ slotProps.date }}</div>
      </template>
    </CarouselComponent>
  </div>
</template>

<script setup>
import Avatar1 from '@/assets/img/avatar1.jpg';
import Avatar2 from '@/assets/img/avatar2.jpg';
import Avatar3 from '@/assets/img/avatar3.jpg';
import Varadero from '@/assets/img/varadero.jpg';
import Tokio from '@/assets/img/tokio.jpg';
import Copa from '@/assets/img/copa.jpg';
import CarouselComponent from "@/components/Partials/CarouselComponent.vue";

const sliders = [
  {
    city: 'California',
    url: Varadero,
    avatars: [Avatar1, Avatar2, Avatar3],
    date: 'Septiembre 22',
    total: 23,
  },
  {
    city: 'Punta Cana',
    url: Tokio,
    avatars: [Avatar2, Avatar1, Avatar3],
    date: 'Octubre 15',
    total: 10,
  },
  {
    city: 'Bahamas',
    url: Copa,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: 'Noviembre 22',
    total: 12,
  },
  {
    city: 'Cuba',
    url: Tokio,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: 'Enero 12',
    total: 12,
  },
  {
    city: 'Asia',
    url: Varadero,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: 'Diciembre 22',
    total: 12,
  },
  {
    city: 'Cuba',
    url: Tokio,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: 'Enero 12',
    total: 12,
  },
  {
    city: 'Asia',
    url: Varadero,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: 'Diciembre 22',
    total: 12,
  },
];
</script>
