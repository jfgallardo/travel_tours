<template>
  <div class="flex items-center space-x-2 mb-2">
    <label class="flex items-center">
      <input
        :id="id"
        v-model="valueSelected"
        type="radio"
        :value="value"
        :name="name"
        class="h-4 w-4 text-zinc-800 cursor-pointer focus:ring-0 mr-2"
        @change="$emit('update:modelValue', value)"
      />
      <span class="text-sm text-justify">
        {{ label }}
        <slot name="label"></slot>
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  selectedValue: {
    type: String,
    default: '',
  },
});

const valueSelected = computed({
  get() {
    return props.selectedValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped></style>
