<template>
  <div>
    <div class="flex flex-col space-y-2">
      <p class="text-gray-700 font-medium">{{ filterWeekday }}</p>
      <div class="flex items-center">
        <div v-if="!output" class="mr-2 -ml-4 rounded-full bg-blue-700 h-2 w-2"></div>
        <p class="text-2xl">
          <span class="font-bold">{{ filterHours }}</span>
          <span class="text-gray-400 font-medium ml-1">{{ filterDayPeriod }}</span>
        </p>
        <div v-if="output" class="ml-2 rounded-full ring-2 ring-blue-700 h-1 w-1"></div>
      </div>
      <p class="text-gray-700 font-medium">{{ iata }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const props = defineProps({
  iata: String,
  flightTime: String,
  output: Boolean,
});

const filterHours = computed(() => {
  const dateLocal = new Date(props.flightTime)
  return dateLocal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const filterWeekday = computed(() => {
  const dateLocal = new Date(props.flightTime)
  const options = { weekday: 'long' };

  return dateLocal.toLocaleDateString(locale.value, options)
})

const filterDayPeriod = computed(() => {
  const dateLocal = new Date(props.flightTime)
  const hours = dateLocal.getHours()
  return hours >= 12 ? 'PM' : 'AM';
})
</script>

<style scoped>
</style>
