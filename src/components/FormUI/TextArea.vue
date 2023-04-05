<template>
  <div>
    <textarea :class="inputClassList" rows="3" :placeholder="placeholder" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineProps({
  placeholder: {
    type: String,
    default: '',
  },
});

const inputClassList = computed(() => {
  return [
    'appearance-none w-full transition duration-150 ease-in-out',
    getTextSizeClass.value,
    getTextColorClass.value,
    getBorderColorClass.value,
    getPaddingClass.value,
  ];
});

const getTextSizeClass = computed(() => {
  return 'text-sm leading-5';
});
const getTextColorClass = computed(() => {
  return 'text-gray-800 placeholder-gray-400';
});
const getBorderColorClass = computed(() => {
  return 'focus:outline-none border border-gray-400 focus:border-blue-400';
});
const getPaddingClass = computed(() => {
  return 'pr-6 pl-4 py-4';
});
</script>

<style scoped></style>
