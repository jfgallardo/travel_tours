<template>
  <div v-if="!asideSelected">
    cargando
  </div>
  <LayoutTwoViews v-if="asideSelected">
    <template #aside>
      <div class="flex flex-col space-y-1">
        <a
          v-for="item in asideSettings"
          :key="item.label"
          class="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
          :class="
            item.label === asideSelected.label
              ? 'bg-gray-100 text-gray-700'
              : ''
          "
          @click="asideSelected = item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="item.icon"
            />
          </svg>

          <span class="text-sm font-medium"> {{ item.label }} </span>
        </a>
      </div>
    </template>
    <template #main>
      <component :is="asideSelected.component"></component>
    </template>
  </LayoutTwoViews>
  
</template>

<script setup>
import { markRaw, ref, onMounted } from 'vue';
import LayoutTwoViews from '@/layouts/LayoutTwoViews.vue';
import Passengers from '@/views/Settings/ModulePassenger/PassengersHome.vue';
import Flights from '@/views/Settings/ModuleFlights/FlightHome.vue';

const asideSettings = [
  {
    label: 'Vuelos reservados',
    component: markRaw(Flights),
    icon: 'M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9',
  },
  {
    label: 'Pasajeros registrados',
    component: markRaw(Passengers),
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    label: 'Billing',
    component: '',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  },
  {
    label: 'Account',
    component: '',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
];

onMounted(() => {
  asideSelected.value = asideSettings[0]
})

const asideSelected = ref(null);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
