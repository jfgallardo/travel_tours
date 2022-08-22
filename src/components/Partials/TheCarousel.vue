<template>
  <div>
    <div class="container mx-auto px-4 pb-20">
      <div class="flex items-end justify-between mb-2">
        <div class="font-semibold text-lg">
          <!-- Destinos populares para aluguel de carros -->
          <slot name="title"></slot>
        </div>
        <div class="flex space-x-3">
          <div
            class="border border-blue-700 bg-transparent hover:bg-blue-700 hover:cursor-pointer rounded-full"
            @click="prev"
          >
            <span class="text-xl hover:text-white p-2 text-gray-800">&lt;</span>
          </div>
          <div
            class="border border-blue-700 bg-transparent hover:bg-blue-700 hover:cursor-pointer rounded-full"
            @click="next"
          >
            <span class="text-xl hover:text-white text-gray-800 p-2">&gt;</span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center space-x-7">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["prev", "next"]);

let prev = () => {
  emit("prev");
};
let next = () => {
  emit("next");
};
</script>

<style scoped>
.bx-carousel {
  color: rgb(29, 78, 216);
}

.bx-carousel:hover {
  color: #292d32 !important;
}
</style>
