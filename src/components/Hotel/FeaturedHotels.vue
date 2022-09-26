<template>
  <div class="py-5">
    <div class="container mx-auto px-4">
      <p class="font-medium pb-2">Hotéis en destaques</p>
      <div class="flex items-center justify-evenly space-x-4">
        <div class="hidden md:block">
          <div class="border-b border-black pb-2">
            <img src="@/assets/img/viaje2.jpg" class="h-72 w-72" />
          </div>
          <div>
            <div>
              <p class="font-medium">Hilton Garden Inn Santo André</p>
              <p class="font-light">Santo André, SP, Brasil</p>
              <RateHotel :rate="3" />
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="border-b border-black pb-2">
            <img src="@/assets/img/viaje1.jpg" class="h-72 w-72" />
          </div>
          <div>
            <div>
              <p class="font-medium">Twin Towers Flat</p>
              <p class="font-light">São Bernardo do Campo, SP, Brasil</p>
              <RateHotel :rate="4" />
            </div>
          </div>
        </div>
        <div>
          <div class="border-b border-black pb-2">
            <img src="@/assets/img/viaje3.jpg" class="h-72 w-72" />
          </div>
          <div>
            <div>
              <p class="font-medium">Bristol International Airport</p>
              <p class="font-light">Guarulhos, SP, Brasil</p>
              <RateHotel :rate="4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import RateHotel from '@/components/Hotel/RateHotel.vue';

</script>
