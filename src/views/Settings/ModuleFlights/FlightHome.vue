<template>
  <div class="overflow-x-auto mx-auto p-8">
    <div class="grid grid-cols-3 gap-4">
      <template v-for="i in bookings" :key="i.id">
        <FlightCard :order-no="i.order_id" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useBookingsStore } from '@/stores/bookings';
import { onMounted, ref } from 'vue';
import FlightCard from '@/views/Settings/ModuleFlights/FlightCard.vue';

const bookingStore = useBookingsStore();

onMounted(() => {
  allData();
});

const bookings = ref([]);

const allData = () => {
  bookingStore.allBookings().then(({ data }) => {
    bookings.value = data;
  });
};
</script>

<style scoped></style>
