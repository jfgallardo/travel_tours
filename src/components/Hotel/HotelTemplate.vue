<template>
<div>
  <div class="flex items-stretch space-x-12 mb-5">
    <div class="flex flex-col md:flex-row bg-white border border-slate-300 w-full">
      <img class=" w-full md:h-auto object-cover md:w-96" src="https://www.hotelesbenidorm.com/wp-content/uploads/2020/06/hotel-presidente-benidorm.jpg" alt="" />
      <div class="grid grid-cols-1 grid-rows-3 w-full pl-4">
        <div class="border-b border-slate-300 font-semibold text-xl">
          {{ hotel.Name }}
          <RateHotel :rate="hotel.Rate" :type-rate="10"/>
          <span class="text-sm font-semibold">{{hotel.Localization}}</span>
        </div>
        <div class="border-b border-slate-300 flex items-center justify-start space-x-1.5">
          <div class="border p-2 bg-black text-white">
            {{hotel.Rate}}
          </div>
          <div class="flex flex-col text-sm">
            <span class="font-semibold">Muito Bom</span>
            <span>123 avaliações</span>
          </div>
        </div>
        <div class="p-1">
          <div class="flex items-center space-x-1.5 pb-4">
            <img src="@/assets/ico/coffee.svg" alt="coffee">
            <span class="font-semibold">Café da manhã incluso</span>
          </div>
          <div class="grid grid-cols-2 gap-1.5">
            <div class="flex items-center space-x-1.5">
              <img src="@/assets/ico/wifi.svg" alt="wifi">
              <span>Internet</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <img src="@/assets/ico/ghost.svg" alt="wifi">
              <span>Piscina</span>
            </div>

            <div class="flex items-center space-x-1.5">
              <img src="@/assets/ico/car.svg" alt="wifi">
              <span>Estacionamento</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <img src="@/assets/ico/weight.svg" alt="wifi">
              <span>Academia</span>
            </div>

            <div class="flex items-center space-x-1.5">
              <img src="@/assets/ico/reserve.svg" alt="wifi">
              <span>Restaurante</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <span class="font-semibold text-lg">Entre outros!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border border-slate-300 w-2/5">
      <div class="flex flex-col space-y-3.5 py-1.5 items-center">
        <div class="text-2xl font-semibold">1 diária, 1 hóspede</div>
        <div class="text-5xl font-bold">$252</div>
        <div class="text-lg">Pague com desconto!</div>
        <div class="text-fuchsia-600 text-lg">No boleto ou PIX</div>
        <div class="text-lg">OU</div>
        <div class="text-lg border-b-2 pb-5 border-dashed border-slate-300">Em até 12 x com juros no cartão de credito</div>
        <qrcode-vue value="https://google.com.br" :size="115"></qrcode-vue>
        <div class="w-full">
          <button
            class="bg-blue-700 hover:bg-blue-800 text-white py-2 w-full"
          >
            Ver Quartos
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import RateHotel from "@/components/Hotel/RateHotel.vue";
import QrcodeVue from 'qrcode.vue';


defineProps({
  hotel: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped>

</style>