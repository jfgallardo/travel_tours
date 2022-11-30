<template>
  <div>
    <div class="container mx-auto px-4 pb-20">
      <div>
        <div class="font-medium text-xl">
          <slot name="title"></slot>
        </div>
      </div>
      <div
        ref="carrousel_items"
        class="flex space-x-10 overflow-x-hidden overflow-y-hidden p-2"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';

onMounted(() => {
  if (carrousel_items.value !== null) start();
  carrousel_items.value.addEventListener('mouseover', () => {
    stop();
  });
  carrousel_items.value.addEventListener('mouseout', () => {
    start();
  });
});

onUnmounted(() => {
  stop();
});

const carrousel_items = ref(null);

let interval = ref(null);
let step = ref(1);
let maxScrollLeft = computed(() => {
  return carrousel_items.value.scrollWidth - carrousel_items.value.clientWidth;
});

const start = () => {
  interval.value = setInterval(function () {
    carrousel_items.value.scrollLeft =
      carrousel_items.value.scrollLeft + step.value;
    if (carrousel_items.value.scrollLeft === maxScrollLeft.value) {
      step.value = -1;
    } else if (carrousel_items.value.scrollLeft === 0) {
      step.value = 1;
    }
  }, 10);
};
const stop = () => {
  clearInterval(interval.value);
};
</script>

<style scoped>
.bx-carousel:hover {
  fill: white !important;
}
</style>
