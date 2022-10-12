<template>
  <div>
    <Carousel @next="nextSlide" @prev="prevSlide">
      <template v-slot:title>
        Destinos populares para aluguel de carros
      </template>
      <CarouselSlider
        v-for="slide in itemsToDisplay"
        :key="slide.city"
        :slide="slide"
      >
        <template v-slot:image>
          <img
            :src="slide.url"
            class="w-full h-64 object-cover"
            @mousedown="nextSlide"
          />
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
import { ref, onMounted } from 'vue';
import Carousel from '@/components/Partials/TheCarousel.vue';
import CarouselSlider from '@/components/Partials/TheCarouselSlider.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Londres from '@/assets/img/londres.jpg';
import Madrid from '@/assets/img/madrid.jpg';
import Miami from '@/assets/img/miami.jpg';

onMounted(() => {
  updateList();
});

const sliders = [
  { url: Londres, city: 'Londres', place: 75, price: 44.99 },
  { url: Madrid, city: 'Madrid', place: 23, price: 32.9 },
  { url: Miami, city: 'Miami', place: 12, price: 40 },
  { url: Miami, city: 'Espana', place: 42, price: 240 },
  { url: Miami, city: 'Cuba', place: 42, price: 240 },
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

<style scoped></style>
