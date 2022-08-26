<template>
  <div>
    <div class="flex items-center justify-start space-x-7 border p-2">
      <div>
        <div class="h-full border-r">
          <input
            type="checkbox"
            class="text-zinc-800 cursor-pointer rounded-full w-5 h-5 focus:ring-0"
          />
        </div>
      </div>
      <FlightNumber />
      <FlightInformation
        weekday="Friday"
        iata="GIG"
        flightTime="7:40"
        :output="true"
      />
      <FlightTime duration="12hr" :directFlight="true" />
      <FlightInformation
        weekday="Saturday"
        iata="MIA"
        flightTime="7:40"
        :output="false"
      />
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
</script>

<style scoped></style>
