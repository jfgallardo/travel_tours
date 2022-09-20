<template>
  <div>
    <Carousel @next="nextSlide" @prev="prevSlide">
      <template v-slot:title> Aproveite nossos pacotes </template>
      <CarouselSlider
        v-for="slide in itemsToDisplay"
        :key="slide.city"
        :slide="slide"
      >
        <template v-slot:image>
          <img
            v-bind:src="slide.src"
            class="w-full h-64 object-cover"
            @mousedown="nextSlide"
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
import { ref, onMounted } from "vue";

import Carousel from "@/components/Partials/TheCarousel.vue";
import CarouselSlider from "@/components/Partials/TheCarouselSlider.vue";
import ArrowRight from "@/components/Icons/ArrowRight.vue";

import Tokio from "@/assets/img/tokio.jpg";
import Varadero from "@/assets/img/varadero.jpg";
import Copacabana from "@/assets/img/copa.jpg";

onMounted(() => {
  updateList();
});

const sliders = [
  {
    src: Tokio,
    city: "Tokio",
    people: 2,
    price: 1500,
    nights: 3,
  },
  {
    src: Varadero,
    city: "Varadero",
    people: 3,
    price: 4700,
    nights: 5,
  },
  {
    src: Copacabana,
    city: "Copacabana",
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    src: Copacabana,
    city: "China",
    people: 1,
    price: 800,
    nights: 3,
  },
  {
    src: Copacabana,
    city: "Japon",
    people: 1,
    price: 800,
    nights: 3,
  },
];

const itemsToDisplay = ref([]);
const numberToRef = ref(0);

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
