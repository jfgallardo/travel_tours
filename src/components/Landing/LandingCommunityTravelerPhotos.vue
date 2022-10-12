<template>
  <div class="bg-gray-200">
    <Carousel @next="nextSlide" @prev="prevSlide">
      <template v-slot:title> Fotos de los viajeros destacados </template>
      <CarouselSlider
        v-for="slide in itemsToDisplay"
        :key="slide.city"
        :slide="slide"
        :black="true"
      >
        <template v-slot:image>
          <img
            v-bind:src="slide.src"
            class="w-full h-64 object-cover"
            @mousedown="nextSlide"
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
import { ref, onMounted } from 'vue';
import Carousel from '@/components/Partials/TheCarousel.vue';
import CarouselSlider from '@/components/Partials/TheCarouselSlider.vue';
import Puntacana from '@/assets/img/viaje1.jpg';
import SanJuan from '@/assets/img/viaje2.jpg';
import Uruguay from '@/assets/img/viaje3.jpg';
import Avatar1 from '@/assets/img/avatar1.jpg';
import Avatar2 from '@/assets/img/avatar2.jpg';
import Avatar3 from '@/assets/img/avatar3.jpg';

onMounted(() => {
  updateList();
});

const itemsToDisplay = ref([]);
const numberToRef = ref(0);

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
];
const updateList = () => {
  if (window.innerWidth <= 768) {
    itemsToDisplay.value = chunkArray(sliders, 1)[0];
  } else {
    itemsToDisplay.value = chunkArray(sliders, 3)[0];
  }
  numberToRef.value = itemsToDisplay.value.length;
};

const chunkArray = (array, chunkSize) => {
  let chunckedArrays = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunckedArrays.push(chunk);
  }
  return chunckedArrays;
};

const nextSlide = () => {
  itemsToDisplay.value.shift();
  if (sliders[numberToRef.value]) {
    itemsToDisplay.value.push(sliders[numberToRef.value]);
    numberToRef.value++;
  } else {
    numberToRef.value = 1;
    itemsToDisplay.value.push(sliders[0]);
  }
};
const prevSlide = () => {
  itemsToDisplay.value.pop();
  if (numberToRef.value >= 0 && sliders[numberToRef.value + 1]) {
    itemsToDisplay.value.unshift(sliders[numberToRef.value + 1]);
    numberToRef.value--;
  } else {
    numberToRef.value = 3;
    itemsToDisplay.value.unshift(sliders[0]);
  }
};
</script>
