<template>
    <div>
        <ButtonFilter />
        <br>
        <div class="flex space-x-10">
            <FlightInformation weekday="Friday" iata="GIG" flightTime="7:40" :output="true" />

            <FlightInformation weekday="Saturday" iata="MIA" flightTime="7:40" :output="false" />

        </div>

    </div>
</template>

<script setup>
import ButtonFilter from "@/components/FlightQuery/ButtonFilter.vue"
import FlightInformation from "@/components/FlightQuery/FlightInformation.vue";

</script>

<style scoped>
</style>
