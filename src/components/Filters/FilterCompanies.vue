<template>
  <div class="px-4 mx-auto">
    <div class="grid grid-col-1 grid-flow-row gap-1.5">
      <div v-for="company in companies" :key="company">
        <label class="flex items-center justify-start">
          <input
            v-model="value"
            :value="company.value"
            class="h-4 w-4 text-zinc-800 cursor-pointer focus:ring-0 mr-2"
            type="checkbox"
          />
          <div class="flex flex-col">
            <span>{{ company.name }}</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  companies: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
