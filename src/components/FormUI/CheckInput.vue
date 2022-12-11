<template>
  <div>
    <div class="flex items-center space-x-2 mb-2">
      <label class="flex items-center">
        <input
          type="checkbox"
          :checked="modelValue"
          class="h-4 w-4 text-zinc-800 cursor-pointer focus:ring-0 mr-2"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span class="text-sm text-justify">
          {{ label }}
          <slot name="label"></slot>
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
