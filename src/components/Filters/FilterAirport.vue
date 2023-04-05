<template>
  <div class="px-4 mx-auto">
    <div class="grid grid-cols-2 grid-flow-row gap-2.5">
      <div v-for="airport in airports" :key="airport">
        <label class="flex items-center">
          <input
            v-model="value"
            :value="airport"
            class="h-4 w-4 text-zinc-800 cursor-pointer focus:ring-0 mr-2"
            type="checkbox"
          />
          <span>{{ airport }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  airports: {
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
