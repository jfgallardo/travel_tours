<template>
    <div>
        <div class="font-semibold border p-4">{{flights.length}} vuelos - {{flights[0].Saida}}</div>
        <Flight v-for="fligth in flights" :key="fligth.Token" v-bind="fligth"/>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const Flight = defineAsyncComponent(() => import('@/components/FlightQuery/FlightComponent.vue'))


const props = defineProps({
  flights: {
    type: Array,
    default: () => [],
  },
});

</script>

<style>
</style>