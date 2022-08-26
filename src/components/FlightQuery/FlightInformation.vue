<template>
  <div>
    <div class="flex flex-col space-y-2">
      <p class="text-gray-700 font-medium">{{ weekday }}</p>
      <div class="flex items-center">
        <div
          v-if="!output"
          class="mr-2 -ml-4 rounded-full bg-blue-700 h-2 w-2"
        ></div>
        <p class="text-2xl">
          <span class="font-bold">{{ flightTime }}</span>
          <span class="text-gray-400 font-medium">PM</span>
        </p>
        <div
          v-if="output"
          class="ml-2 rounded-full ring-2 ring-blue-700 h-1 w-1"
        ></div>
      </div>
      <p class="text-gray-700 font-medium">{{ iata }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  weekday: String,
  iata: String,
  flightTime: String,
  output: Boolean,
});
</script>

<style scoped></style>
