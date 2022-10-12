<template>
  <div class="bg-blue-800">
    <div class="container mx-auto px-4">
      <div class="pb-10">
        <div class="flex items-center justify-evenly space-x-4">
          <div class="hidden md:block">
            <div class="pt-10">
              <img src="@/assets/img/viaje2.jpg" class="h-96 w-80" />
            </div>
            <div>
              <div class="mt-2 flex space-x-2 items-center">
                <img
                  src="@/assets/img/avatar3.jpg"
                  class="rounded-full h-10 w-10 object-cover"
                />
                <div class="text-white">
                  <p class="font-medium">@cintiaguilar</p>
                  <p class="font-light">Argentina</p>
                </div>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="pt-10">
              <img src="@/assets/img/viaje1.jpg" class="h-96 w-80" />
            </div>
            <div>
              <div class="mt-2 flex space-x-2 items-center">
                <img
                  src="@/assets/img/avatar1.jpg"
                  class="rounded-full h-10 w-10 object-cover"
                />
                <div class="text-white">
                  <p class="font-medium">@cintiaguilar</p>
                  <p class="font-light">Brasil</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="pt-10">
              <img src="@/assets/img/viaje3.jpg" class="h-96 w-80" />
            </div>
            <div>
              <div class="mt-2 flex space-x-2 items-center">
                <img
                  src="@/assets/img/avatar2.jpg"
                  class="rounded-full h-10 w-10 object-cover"
                />
                <div class="text-white">
                  <p class="font-medium">@cintiaguilar</p>
                  <p class="font-light">Cuba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-16 flex justify-center">
          <button
            class="text-white border-2 border-white px-3 py-2 rounded-full flex items-center justify-center"
          >
            <Instagram class="mr-1 h-6 w-6" /> Visite nosso instagram
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Instagram from '@/components/Icons/Instagram.vue';
</script>
