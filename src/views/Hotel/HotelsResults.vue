<template>
  <div class="pb-20">
    <div class="py-5">
      <ButtonFilter :loading="moblixStore.loading" />
    </div>
    <div v-if="moblixStore.loading">cargando......</div>
    <div v-else>
      <template v-for="(hotel, index) in moblixStore.dataHotels" :key="index">
        <HotelTemplate :hotel="hotel" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useMoblixStore } from '@/stores/moblix';
import { onMounted } from 'vue';
import ButtonFilter from '@/components/Hotel/ButtonFilter.vue';
import HotelTemplate from '@/components/Hotel/HotelTemplate.vue';

onMounted(() => {
  moblixStore.consultarHotel();
});
const moblixStore = useMoblixStore();
</script>

<style scoped></style>
