<template>
  <div class="bg-gray-200">
    <div class="container mx-auto px-4 py-20">
      <div class="space-y-10">
        <div class="flex items-center justify-center space-x-5">
          <img
            src="@/assets/img/avatar1.jpg"
            class="h-16 w-16 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar3.jpg"
            class="h-20 w-20 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar2.jpg"
            class="h-28 w-28 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar1.jpg"
            class="h-20 w-20 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar3.jpg"
            class="h-16 w-16 object-cover rounded-full"
          />
        </div>
        <div class="text-center font-bold text-7xl">
          Nosso objetivo é mantê-lo feliz e satisfeito
        </div>
        <div class="text-sm flex space-x-1 justify-center">
          Muito obrigado por nos escolher, pode deixar uma grande saudação aqui
          <ArrowCircleRight class="h-5 w-5 ml-1" />
          <span class="text-blue-700">ola@mrtravelandtours.com</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ArrowCircleRight from "@/components/Icons/ArrowCircleRight.vue";
</script>
