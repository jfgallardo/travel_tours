<template>
  <div class="flex flex-col justify-center space-y-8 p-4 mx-auto">
    <label class="mb-2 font-medium text-gray-600">Rango de horas:</label>
    <div class="flex">
      <input
        v-model="minValue"
        type="range"
        :min="minimo"
        :max="maximo"
        @input="updateRange"
      />

      <input
        v-model="maxValue"
        type="range"
        :min="minimo"
        :max="maximo"
        @input="updateRange"
      />
    </div>
    <span class="text-center text-sm font-medium text-gray-600"
      >{{ minTimeFormatter }} - {{ maxTimeFormatter }}</span
    >
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  maximo: {
    type: Number,
    required: true,
  },
  minimo: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:minimo', 'update:maximo']);

const minValue = ref();
const maxValue = ref();

watch(
  () => props.loading,
  (newValue) => {
    if (!newValue) {
      minValue.value = props.minimo;
      maxValue.value = props.maximo;
    }
  }
);

const updateRange = () => {
  if (minValue.value > maxValue.value) {
    minValue.value = maxValue.value;
  }
  emit('update:minimo', minValue.value);
  emit('update:maximo', maxValue.value);
};

const formatMinutesToHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h:${remainingMinutes}m`;
};

const minTimeFormatter = computed(() => {
  return formatMinutesToHoursAndMinutes(minValue.value);
});

const maxTimeFormatter = computed(() => {
  return formatMinutesToHoursAndMinutes(maxValue.value);
})
</script>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type='range']::-moz-range-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type='range']::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type='range']::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type='range'] {
  appearance: none;
  height: 2px;
  width: 80%;
  position: absolute;
  background-color: rgba(22, 7, 237, 0.99);
  pointer-events: none;
}

input[type='range']::-webkit-slider-runnable-track {
  z-index: 1;
}

input[type='range']::-moz-range-track {
  z-index: 1;
}
</style>
