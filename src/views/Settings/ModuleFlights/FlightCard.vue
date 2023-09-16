<template>
  <div v-if="!flight" class="max-w-sm rounded overflow-hidden shadow-lg">
    <SkeletonCard />
  </div>

  <div v-else class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl background-logo" @click="showInfo=true">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Reserva: #{{ orderNo }}</div>
      <span
        class="text-sm font-semibold txt-gray-700"
        >{{ created }}</span
      >
    </div>
    <div class="px-6 pt-4 pb-2">
      <span
        v-if="flight?.BookingHotel.length"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#HOTEL</span
      >
      <span
        v-if="flight?.Bilhete"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#TRAVEL</span
      >
      <span
        v-for="(item, index) in trechos"
        :key="index"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#{{ item }}</span
      >
    </div>
  </div>

  <FlightDetailsModal v-if="showInfo" :info="flight" @close="showInfo=false"/>
  
  
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useMoblixStore } from '../../../stores/moblix';
import SkeletonCard from '@/components/Partials/SkeletonCard.vue';
import FlightDetailsModal from '@/views/Settings/ModuleFlights/FlightDetailsModal.vue'
const props = defineProps({
  orderNo: {
    type: String,
    default: '',
  },
});

const moblixStore = useMoblixStore();
const flight = ref(null);
const showInfo = ref(false);

const created = computed(() => {
  if (flight.value?.CreatedAt) {
    const d = new Date(flight.value.CreatedAt).toLocaleDateString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${d}`;
  }
  return '';
});

const trechos = computed(() => {
  if (flight?.value?.Bilhete) {
    const destino = flight.value.Bilhete.Viagem.flatMap((item) => {
      return item.Trecho.flatMap((o) => o.IataDestino)
    })

    const origem = flight.value.Bilhete.Viagem.flatMap((item) => {
      return item.Trecho.flatMap((o) => o.IataOrigem)
    })
    
    return [...new Set([...destino, ...origem])]
  }
  return [];
});

watch(
  () => props.orderNo,
  (value) => {
    if (value) {
      moblixStore
        .detalhesPedido(value)
        .then(({ data }) => {
          if (data.Data && data.Data.length) {
            flight.value = data.Data[0];
          }
        })
        .catch();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.background-logo {
  background-image: url('../../../assets/img/logo1.svg');
  background-repeat: no-repeat;
  background-position: right;
  background-size: 30%;
}
</style>
