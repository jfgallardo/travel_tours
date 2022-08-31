<template>
  <div>
    <div
      class="h-96 w-48 md:w-56 lg:w-96 relative border-b pb-3"
      :class="{ 'border-black': black }"
    >
      <div class="absolute bottom-5 text-white pb-1 pl-2 font-bold text-4xl">
        {{ slide.city }}
      </div>
      <slot name="image"></slot>
    </div>
    <div class="flex items-end justify-between mb-2">
      <div>
        <slot name="footer"></slot>
      </div>
      <div>
        <slot name="footer-right"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["slide", "black"]);
</script>

<style scoped></style>
