<template>
  <div>
    <div
      @click="reportsOpen = !reportsOpen"
      class="flex items-center text-gray-600 w-full border-b overflow-hidden mt-32 md:mt-0 mb-5 mx-auto"
    >
      <div
        class="w-10 border-r px-2 transform transition duration-300 ease-in-out"
        :class="{ 'rotate-90': reportsOpen, ' -translate-y-0.0': !reportsOpen }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div class="flex items-center px-2 py-3">
        <div class="mx-3">
          <button class="hover:text-cyan-600">
            <slot name="header"></slot>
          </button>
        </div>
      </div>
    </div>

    <Transition>
      <div
        class="flex p-5 md:p-2 w-full transform transition duration-300 ease-in-out border-b pb-10"
        v-show="reportsOpen"
      >
        <slot name="body"></slot>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const reportsOpen = ref(false);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>