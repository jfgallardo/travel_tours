<template>
  <div class="pb-20">
  <div class="slider">
    <div class="slider-nav">
      <p class="font-semibold text-sm md:text-2xl">
        Destinos populares para aluguel de carros
      </p>
      <div class="flex">
        <button class="slider-prev" @click="prevSlide">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="blue"
              class="w-3 h-3 md:w-5 md:h-5"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button class="slider-next" @click="nextSlide">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="blue"
              class="w-3 h-3 md:w-5 md:h-5"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>

    <swiper-container
        :slides-per-view="3"
        :space-between="spaceBetween"
        :centered-slides="false"
        :breakpoints="{
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4
      }
    }"
    >
      <swiper-slide
          v-for="(image, index) in sliders"
          :key="index"
          class="slider-item"
      >
        <div class="relative border-b pb-3">
          <div
              class="absolute bottom-5 text-white pb-1 pl-2 font-bold md:text-6xl text-4xl"
          >
            {{ image.city }}
          </div>
          <img :src="image.url" :alt="image.city" class="object-cover"/>
        </div>

        <div class="flex items-end space-x-32 md:justify-between mb-2">

          <div class="ml-2.5">
              <span class="text-xs text-gray-600"
              >{{ image.place }} lugares de colecao</span
              ><br />
            <span class="text-sm font-semibold">De ${{ image.price }}/dia</span>
          </div>
          <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2"/>
        </div>
      </swiper-slide>
    </swiper-container>

  </div>

  </div>
</template>

<script setup>
import Londres from '@/assets/img/londres.jpg';
import Madrid from '@/assets/img/madrid.jpg';
import Miami from '@/assets/img/miami.jpg';
import {register} from 'swiper/element/bundle';
import ArrowRight from "@/components/Icons/ArrowRight.vue";
register();

const spaceBetween = 20;
const sliders = [
  {url: Londres, city: 'Londres', place: 75, price: 44.99},
  {url: Madrid, city: 'Madrid', place: 23, price: 32.9},
  {url: Miami, city: 'Miami', place: 12, price: 40},
  {url: Miami, city: 'Espana', place: 42, price: 240},
  {url: Miami, city: 'Cuba', place: 42, price: 240},
  {url: Londres, city: 'Londres', place: 75, price: 44.99},
  {url: Madrid, city: 'Madrid', place: 23, price: 32.9},
  {url: Miami, city: 'Miami', place: 12, price: 40},
  {url: Miami, city: 'Espana', place: 42, price: 240},
  {url: Miami, city: 'Cuba', place: 42, price: 240},
];
const prevSlide = () => {
  const swiperEl = document.querySelector('swiper-container');
  swiperEl.swiper.slidePrev();
}

const nextSlide = () => {
  const swiperEl = document.querySelector('swiper-container');
  swiperEl.swiper.slideNext();
}
</script>

<style scoped>
img {
  width: 30rem;
  height: 32rem;
}

.slider {
  position: relative;
  padding: 0 2.5rem;
  width: 100%;
  height: 100%;
}

.slider-prev,
.slider-next {
  background: none;
  border: 1px solid rgb(9, 121, 236);
  border-radius: 100%;
  cursor: pointer;
  padding: 6px;
  margin-left: 8px;
  outline: none;
}
.slider-next:hover,
.slider-prev:hover {
  background-color: rgba(16, 57, 208, 0.88);
}
.slider-next:hover svg {
  stroke: white;
  stroke-width: 2px;
}
.slider-prev:hover svg {
  stroke: white;
  stroke-width: 2px;
}

.slider-prev:disabled,
.slider-next:disabled {
  opacity: 0.5;
  cursor: default;
}

.slider-nav {
  position: absolute;
  top: -35px;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
}
</style>
