<template>
  <div class="flex">
    <div class="w-1/4 h-5/6 overflow-y-auto fixed left-0 pb-10">
      <div class="border-r border-gray-300 pt-8">
        <HotelForm />
      </div>
    </div>
    <div class="w-3/4 h-screen relative top-0 left-1/4 px-8">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HotelForm from '@/components/Hotel/HotelForm.vue';
</script>

<style scoped></style>
