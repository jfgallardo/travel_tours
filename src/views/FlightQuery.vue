<template>
  <div>
    <ButtonFilter />
    <br />
    <div class="grid grid-cols-4 grid-rows-1 gap-4">
      <div class="col-span-3">
        <RenderFlights v-if="moblixStore.outboundFlights.length" :flights="moblixStore.outboundFlights" />
        <RenderFlights v-if="moblixStore.returnFlights.length" :flights="moblixStore.returnFlights" />
      </div>
      <FlightDetalhes />
    </div>
  </div>
</template>

<script setup>
import ButtonFilter from "@/components/FlightQuery/ButtonFilter.vue";
import FlightDetalhes from "@/components/FlightQuery/FlightDetalhes.vue";
import RenderFlights from "@/components/FlightQuery/RenderFlights.vue";
import { useMoblixStore } from "@/stores/moblix"
import {onUnmounted} from 'vue'

const moblixStore = useMoblixStore()

onUnmounted(() => moblixStore.clear())
</script>

<style scoped>
</style>
