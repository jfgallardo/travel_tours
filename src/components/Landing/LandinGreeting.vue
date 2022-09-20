<template>
  <div :class="background">
    <div class="container mx-auto px-4 py-20">
      <div class="space-y-10">
        <div class="flex items-center justify-center space-x-5">
          <img
            src="@/assets/img/avatar1.jpg"
            class="h-16 w-16 object-cover rounded-full hidden md:block"
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
            class="h-16 w-16 object-cover rounded-full hidden md:block"
          />
        </div>
        <div class="text-center font-bold text-7xl">
          Nosso objetivo é mantê-lo feliz e satisfeito
        </div>
        <div class="text-sm flex space-x-1 justify-center">
          <p class="px-8 text-center">
            Muito obrigado por nos escolher, pode deixar uma grande saudação
            aqui
            <span class="flex items-center justify-center space-x-1">
              <ArrowCircleRight class="h-5 w-5" />
              <span class="text-blue-700">
                <a href="mailito:ola@mrtravelandtours.com?subject=Ola MTravel"
                  >ola@mrtravelandtours.com</a
                >
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ArrowCircleRight from "@/components/Icons/ArrowCircleRight.vue";

const props = defineProps({
  background: {
    type: String,
    default: "bg-gray-200",
  },
});
</script>
