<template>
  <div>
    <div class="p-4 flex flex-col items-center space-y-4 ">
      <label class="font-semibold text-lg">Duración del viaje</label>
      <input
:class="inputClassList" :max="max"
             :min="min" :value="modelValue" type="range" @input="$emit('update:modelValue', $event.target.value)">
      <span>{{ min }}hrs - {{ modelValue }}hrs</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

defineEmits(["update:modelValue"]);

defineProps({
  min: {
    type: String,
    default: "2"
  },
  max: {
    type: String,
    default: "48"
  },
  modelValue: {
    type: String,
    default: ""
  }
});

const inputClassList = computed(() => {
  return [
    "w-full transition duration-150 ease-in-out",
    getTextSizeClass.value,
    getTextColorClass.value,
    getBorderColorClass.value
  ];
});

const getTextSizeClass = computed(() => {
  return "text-sm leading-5";
});
const getTextColorClass = computed(() => {
  return "text-gray-800 placeholder-gray-400";
});
const getBorderColorClass = computed(() => {
  return "focus:outline-none border border-gray-400 focus:border-blue-400";
});
</script>

<style scoped>

</style>