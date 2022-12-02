<template>
  <div>
    <div class="mx-auto px-4 pb-10">
      <div class="flex">
        <div class="basis-4/6 flex flex-col">
          <PreCheckOut :viagem="userStore.vooSelected" />
          <div
            class="h-12 w-full bg-black flex items-center space-x-3 justify-center cursor-pointer"
            @click="$router.go(-1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
            <p class="text-white">Veja outras opções de voos</p>
          </div>
        </div>
        <div class="basis-4/12 flex flex-col mx-auto p-8">
          <div class="max-w-sm rounded overflow-hidden">
            <div class="px-6 py-2 flex justify-between">
              <div class="font-bold text-xl mb-2 text-center">Sua compra</div>
            </div>
            <div class="flex items-start space-x-1.5 py-2.5">
              <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#CIA_Aérea</span>
              <p>{{ userStore.vooSelected.CiaMandatoria.Descricao }}</p>
            </div>
            <div class="flex items-start space-x-1.5 py-2.5">
              <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Valor_Taxas</span>
              <p>{{ valorTotalTaxas }}</p>
            </div>
            <div class="flex items-start space-x-1.5 py-2.5">
              <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Valor_Total</span>
              <p>{{ valorTotal }}</p>
            </div>
            <div class="py-2.5">
              <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Bagagem</span>
              <div class="mt-3 space-y-2">
                <TheTooltip tooltip-text="Bagagem mano">
                  <div class="flex items-center space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                    <span>Babagem de até 23KG</span>
                  </div>
                </TheTooltip>
                <div class="flex items-center space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>Babagem de mano</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <button class="bg-blue-700 hover:bg-blue-800 text-white mt-5 py-2 w-1/2">Comprar agora</button>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="basis-4/6 mt-5">
          <Carousel>
            <template #title> Aluguel de carros em Miami </template>
            <CarouselSlider
                v-for="slide in sliders"
                :key="slide.city"
                :slide="slide"
            >
              <template #image>
                <img :src="slide.src" class="w-72 h-52 object-cover"  :alt="slide.src"/>
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
        <div class="basis-4/12">
          <GroupsBoundFor more-people="12"/>
          <GroupsBoundFor date="Sep 18" more-people="21"/>
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
import { useUserStore } from '@/stores/user';
import PreCheckOut from '@/components/Aereo/PreCheckOut.vue';
import TheTooltip from "@/components/Partials/TheTooltip.vue";
import {computed} from "vue";
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

const userStore = useUserStore();

const valorTotal = computed(() => {
  return currencyFormatter({currency: 'BRL', value: userStore.vooSelected.ValorTotal})
})
const valorTotalTaxas = computed(() => {
  return currencyFormatter({currency: 'BRL', value: userStore.vooSelected.ValorTotalTaxas})
})

const currencyFormatter = ({ currency, value}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency
  })
  return formatter.format(value)
}

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
</script>

<style scoped></style>
