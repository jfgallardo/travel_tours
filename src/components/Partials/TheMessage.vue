<template>
  <div class="message-float">
    <div
      :class="[alertStore.backgrColor, alertStore.textColor]"
      class="py-5 px-6 text-base mb-3 text-center"
      role="alert"
    >
      {{ alertStore.message }}
    </div>
  </div>
</template>
<!--
<div class="relative rounded-lg border border-gray-200 shadow-lg">
  <button
    class="absolute -top-1 -right-1 rounded-full border border-gray-300 bg-gray-100 p-1"
  >
    <span class="sr-only">Close</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-3 w-3"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  <div class="flex items-center gap-4 p-4">
    <img
      alt="Women"
      src="https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      class="h-12 w-12 rounded-lg object-cover"
    />

    <div>
      <p class="font-medium text-gray-900">Carol Daines</p>

      <p class="line-clamp-1 text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
        laborum?
      </p>
    </div>
  </div>
</div>

-->

<script setup>
import { useAlertStore } from '@/stores/alert';
import { onMounted } from 'vue';

onMounted(() => {
  setTimeout(function () {
    alertStore.closeMsg();
  }, 3000);
});

const alertStore = useAlertStore();
</script>

<style scoped>
.message-float {
  position: fixed !important;
  bottom: 80px;
  right: 25px;
  z-index: 500;
}

@media (max-width: 640px) {
  .message-float {
    position: fixed !important;
    bottom: 80px;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 500;
  }
}
</style>

<!-- 
    bg-blue-100 INFO
    bg-red-100 ERROR
    bg-green-100  SUCCESS

    text-blue-700 INFO
    text-red-700  ERROR
    text-green-700  SUCCESS
  -->
