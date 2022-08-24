<template>
  <div>
    <div class="flex items-center space-x-2 mb-2">
      <label class="flex items-center">
        <input type="checkbox" class="h-5 w-5 accent-zinc-900 mr-2" />
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
