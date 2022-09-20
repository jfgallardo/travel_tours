<template>
  <div>
    <div
      :class="[alertStore.backgrColor, alertStore.textColor]"
      class="py-5 px-6 text-base mb-3 text-center"
      role="alert"
    >
      {{ alertStore.message }}
    </div>
  </div>
</template>

<script setup>
import { useAlertStore } from "@/stores/alert";
import { onMounted } from "vue";

onMounted(() => {
  setTimeout(function () {
    alertStore.closeMsg();
  }, 3000);
});

const alertStore = useAlertStore();
</script>

<style scoped></style>

<!-- 
    bg-blue-100 INFO
    bg-red-100 ERROR
    bg-green-100  SUCCESS

    text-blue-700 INFO
    text-red-700  ERROR
    text-green-700  SUCCESS
  -->
