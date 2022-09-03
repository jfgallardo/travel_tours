<template>
  <div class="bg-gray-200">
    <Carousel @next="nextSlide" @prev="prevSlide">
      <template v-slot:title> Próximos viajes de la comunidad </template>
      <CarouselSlider v-for="slide in itemsToDisplay" :key="slide.city" :slide="slide" :black="true">
        <template v-slot:image>
          <img v-bind:src="slide.src" class="w-full h-64 object-cover" @mousedown="nextSlide" />
        </template>
        <template v-slot:footer>
          <div class="mt-2 flex">
            <img v-for="avatar in slide.avatars" :key="avatar" :src="avatar"
              class="rounded-full h-7 w-7 object-cover ring-1 ring-white -ml-1" />
            <div class="border h-7 w-7 pt-1 ring-1 ring-white rounded-full text-xs text-white bg-gray-300 -ml-1">
              +24
            </div>
          </div>
        </template>
        <template v-slot:footer-right>
          <div class="text-sm">{{ slide.date }}</div>
        </template>
      </CarouselSlider>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Carousel from "@/components/Partials/TheCarousel.vue";
import CarouselSlider from "@/components/Partials/TheCarouselSlider.vue";
import Avatar1 from "@/assets/img/avatar1.jpg";
import Avatar2 from "@/assets/img/avatar2.jpg";
import Avatar3 from "@/assets/img/avatar3.jpg";
import Varadero from "@/assets/img/varadero.jpg";
import Tokio from "@/assets/img/tokio.jpg";
import Copa from "@/assets/img/copa.jpg";

onMounted(() => {
  updateList()
})

const itemsToDisplay = ref([])
const numberToRef = ref(0)

const sliders = [
  {
    city: "California",
    src: Varadero,
    avatars: [Avatar1, Avatar2, Avatar3],
    date: "Septiembre 22",
    total: 23,
  },
  {
    city: "Punta Cana",
    src: Tokio,
    avatars: [Avatar2, Avatar1, Avatar3],
    date: "Octubre 15",
    total: 10,
  },
  {
    city: "Bahamas",
    src: Copa,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: "Noviembre 22",
    total: 12,
  },
  {
    city: "Cuba",
    src: Tokio,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: "Enero 12",
    total: 12,
  },
  {
    city: "Asia",
    src: Varadero,
    avatars: [Avatar1, Avatar3, Avatar2],
    date: "Diciembre 22",
    total: 12,
  },
];

const updateList = () => {
  if (window.innerWidth <= 768) {
    itemsToDisplay.value = chunkArray(sliders, 1)[0]
  } else {
    itemsToDisplay.value = chunkArray(sliders, 3)[0]

  }
  numberToRef.value = itemsToDisplay.value.length
}

const chunkArray = (array, chunkSize) => {
  let chunckedArrays = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunckedArrays.push(chunk);
  }
  return chunckedArrays;
}

const nextSlide = () => {
  itemsToDisplay.value.shift()
  if (sliders[numberToRef.value]) {
    itemsToDisplay.value.push(sliders[numberToRef.value])
    numberToRef.value++
  } else {
    numberToRef.value = 1
    itemsToDisplay.value.push(sliders[0])
  }
};
const prevSlide = () => {
  itemsToDisplay.value.pop()
  if (numberToRef.value >= 0 && sliders[numberToRef.value + 1]) {
    itemsToDisplay.value.unshift(sliders[numberToRef.value + 1])
    numberToRef.value--
  } else {
    numberToRef.value = 3
    itemsToDisplay.value.unshift(sliders[0])
  }

}
</script>
