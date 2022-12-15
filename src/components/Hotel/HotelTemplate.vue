<template>
<div>
  <div class="flex mb-5">
    <div class="flex flex-col md:flex-row md:max-w-xl bg-white border border-slate-300 w-full">
      <img class=" w-full h-96 md:h-auto object-cover md:w-48" src="https://www.hotelesbenidorm.com/wp-content/uploads/2020/06/hotel-presidente-benidorm.jpg" alt="" />
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
        <div>3</div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>

import RateHotel from "@/components/Hotel/RateHotel.vue";

defineProps({
  hotel: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped>

</style>