<template>
  <div class="min-h-[200px] min-w-[500px] hover:scale-110">
    <div
      class="relative border-b pb-3"
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
const props = defineProps({
  slide: {
    type: Object,
    default: () => {},
  },
  black: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>

</style>
