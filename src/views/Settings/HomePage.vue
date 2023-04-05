<template>
  <LayoutTwoViews>
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
      <transition name="fade" mode="out-in">
        <component :is="asideSelected.component"></component>
      </transition>
    </template>
  </LayoutTwoViews>
</template>

<script setup>
import { markRaw, ref } from 'vue';
import LayoutTwoViews from '@/layouts/LayoutTwoViews.vue';
import Passengers from '@/views/Settings/ModulePassenger/PassengersHome.vue';

const asideSettings = [
  {
    label: 'General',
    component: '',
    icon: 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
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

const asideSelected = ref({ label: 'General', component: '' });
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
