<template>
  <Header />
  <div class="flex min-h-screen flex-col lg:flex-row bg-gray-100 text-gray-800">
    <aside
      class="w-full lg:w-4/12 transform bg-white transition-transform duration-150 ease-in relative"
      :class="[open ? 'translate-y-0 lg:translate-x-0' : 'hidden lg:flex lg:-translate-x-full']"
    >
      <slot name="aside"></slot>
      <button
        type="button"
        class="rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white absolute top-2 -right-8"
        @click="open = !open"
      >
        <span class="sr-only">Close panel</span>
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="black"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </aside>
    <main
      class="flex flex-grow flex-col transition-all duration-150 ease-in"
      :class="[open ? 'mt-0 lg:ml-0 ' : 'lg:-ml-[33.333333%]']"
    >
      <div
        class="flex flex-col bg-white p-4"
      >
       <slot name="main"></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from '@/components/Partials/TheHeader.vue';

const open = ref(true)
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.2, 0.5, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(0px);
  opacity: 0;
}
</style>
