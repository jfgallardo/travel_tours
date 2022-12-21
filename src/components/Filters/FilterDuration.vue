<template>
  <div>
    <div class="p-4 flex flex-col items-center space-y-4">
      <label class="font-semibold text-lg">Duración del viaje</label>
      <input
        :max="max"
        :min="min" :value="modelValue" type="range" @input="$emit('update:modelValue', $event.target.value)">
      <span>{{ min }}hrs - {{ modelValue }}hrs</span>
    </div>
  </div>
</template>

<script setup>

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
</script>

<style scoped>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}
input[type=range]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}
input[type=range]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px rgba(16, 57, 208, 0.88), 0 0 9px rgba(16, 57, 208, 0.88);
  -webkit-box-shadow: inset 0 0 3px rgba(16, 57, 208, 0.88), 0 0 9px rgba(16, 57, 208, 0.88);
}
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  background-color: rgba(16, 57, 208, 0.99);
  pointer-events: none;
}
</style>