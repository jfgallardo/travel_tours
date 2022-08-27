<template>
  <div>
    <div class="flex items-center justify-start space-x-7 border p-2">
      <FlightNumber />
      <FlightInformation weekday="Friday" :iata="Origem" :flightTime="Saida" :output="true" />
      <FlightTime duration="" :directFlight="true" />
      <FlightInformation weekday="Saturday" :iata="Destino" :flightTime="Chegada" :output="false" />
      <div class="flex items-center">
        <button class="text-blue-700 hover:text-blue-800 font-semibold text-sm">
          Detalhes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import FlightInformation from "@/components/FlightQuery/FlightInformation.vue";
import FlightTime from "@/components/FlightQuery/FlightTime.vue";
import FlightNumber from "@/components/FlightQuery/FlightNumber.vue";

const props = defineProps({
  Origem: {
    type: String
  },
  Destino: {
    type: String
  },
  Saida: {
    type: String
  },
  Chegada: {
    type: String
  },
});



</script>

<style scoped>
</style>
