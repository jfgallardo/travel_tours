<template>
  <div>
    <Carousel @next="nextSlide" @prev="prevSlide">
      <template v-slot:title>
        Destinos populares para aluguel de carros
      </template>
      <CarouselSlider v-for="slide in sliders" :key="slide.city" :slide="slide">
        <template v-slot:image>
          <img :src="slide.url" class="h-full w-full object-cover" />
        </template>
        <template v-slot:footer>
          <span class="text-xs text-gray-600"
            >{{ slide.place }} lugares de colecao</span
          ><br />
          <span class="text-sm font-semibold">De ${{ slide.price }}/dia</span>
        </template>
        <template v-slot:footer-right>
          <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2" />
        </template>
      </CarouselSlider>
    </Carousel>
  </div>
</template>

<script setup>
import Carousel from "@/components/Partials/TheCarousel.vue";
import CarouselSlider from "@/components/Partials/TheCarouselSlider.vue";
import ArrowRight from "@/components/Icons/ArrowRight.vue";

import Londres from "@/assets/img/londres.jpg";
import Madrid from "@/assets/img/madrid.jpg";
import Miami from "@/assets/img/miami.jpg";

const sliders = [
  {
    url: Londres,
    city: "Londres",
    place: 75,
    price: 44.99,
  },
  { url: Madrid, city: "Madrid", place: 23, price: 32.9 },
  { url: Miami, city: "Miami", place: 12, price: 40 },
];

const nextSlide = () => {};
const prevSlide = () => {};
</script>
