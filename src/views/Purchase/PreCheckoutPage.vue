<template>
  <div>
    <div v-if="redisStore.loadingSearch" >
      ...cargando
    </div>
    <div v-else class="mx-auto pb-10">
      <div class="flex flex-col lg:flex-row">
        <div class="basis-4/6 flex flex-col border border-slate-300">
          <PreCheckOut />
          <div
            class="h-12 w-full bg-black flex items-center space-x-3 justify-center cursor-pointer"
            @click="$router.go(-1)"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="white"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="text-white">Veja outras opções de voos</p>
          </div>
        </div>
        <div class="basis-4/12 flex flex-col mx-auto p-8">
          <InterestingAccommodations />
        </div>
      </div>
      <div class="flex flex-col lg:flex-row">
        <div class="basis-4/6 border border-t-0 md:border-x-0 border-slate-300">
          <Carousel class="mt-5">
            <template #title> Aluguel de carros em Miami</template>
            <CarouselSlider
              v-for="slide in sliders"
              :key="slide.city"
              :slide="slide"
            >
              <template #image>
                <img
                  :alt="slide.src"
                  :src="slide.src"
                  class="w-72 h-52 object-cover"
                />
              </template>
              <template #footer>
                <div class="mt-2 flex space-x-2 items-center">
                  <div class="text-xs">
                    <p class="font-bold">{{ slide.travel }}</p>
                    <p>{{ slide.place }}</p>
                  </div>
                </div>
              </template>
            </CarouselSlider>
          </Carousel>
        </div>
        <div class="basis-4/12 border border-slate-300 border-l-0 border-b-0 border-t-0 lg:border-t lg:border-r-0 lg:border-l">
          <GroupsBoundFor class="mt-4" more-people="12" />
          <GroupsBoundFor date="Sep 18" more-people="21" />
          <div class="flex items-center justify-around">
            <span> Explore mais grupos com este destino </span>
            <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import PreCheckOut from "@/components/Purchase/PreCheckOut.vue";
import Carousel from "@/components/Partials/TheCarousel.vue";
import CarouselSlider from "@/components/Partials/TheCarouselSlider.vue";
import Puntacana from "@/assets/img/viaje1.jpg";
import Avatar1 from "@/assets/img/avatar1.jpg";
import SanJuan from "@/assets/img/viaje2.jpg";
import Avatar2 from "@/assets/img/avatar2.jpg";
import Uruguay from "@/assets/img/viaje3.jpg";
import Avatar3 from "@/assets/img/avatar3.jpg";
import GroupsBoundFor from "@/components/Aereo/GroupsBoundFor.vue";
import ArrowRight from "@/components/Icons/ArrowRight.vue";
import InterestingAccommodations from "@/components/Purchase/InterestingAccommodations.vue";
import { onMounted } from "vue";
import { useRedisStore } from "@/stores/redis";

const redisStore = useRedisStore();
const route = useRoute();

onMounted(async () => {
  if (route.params.id) {
    await redisStore.findVooSelected(route.params.id);
  }
});

const sliders = [
  {
    city: "",
    src: Puntacana,
    avatar: Avatar1,
    travel: "Jessica Palmer",
    place: "Puntacana"
  },
  {
    city: "",
    src: SanJuan,
    avatar: Avatar2,
    travel: "Rudiguer Corinho",
    place: "San Juan"
  },
  {
    city: "",
    src: Uruguay,
    avatar: Avatar3,
    travel: "Vivian Meldier",
    place: "Uruguay"
  },
  {
    city: "",
    src: Uruguay,
    avatar: Avatar3,
    travel: "Ernesto Meldier",
    place: "Chile"
  },
  {
    city: "",
    src: Uruguay,
    avatar: Avatar3,
    travel: "Juan Placencia",
    place: "Peru"
  },
  {
    city: "",
    src: SanJuan,
    avatar: Avatar2,
    travel: "Rudiguer Corinho",
    place: "San Juan"
  },
  {
    city: "",
    src: Uruguay,
    avatar: Avatar3,
    travel: "Vivian Meldier",
    place: "Uruguay"
  },
  {
    city: "",
    src: Uruguay,
    avatar: Avatar3,
    travel: "Ernesto Meldier",
    place: "Chile"
  },
  {
    city: "",
    src: Uruguay,
    avatar: Avatar3,
    travel: "Juan Placencia",
    place: "Peru"
  }
];
</script>

<style scoped></style>
