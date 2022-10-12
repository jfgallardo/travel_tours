<script setup>
import { RouterView } from 'vue-router';
import Message from '@/components/Partials/TheMessage.vue';
import { useAlertStore } from '@/stores/alert';

const alertStore = useAlertStore();
</script>

<template>
  <div class="mt-20">
    <Transition>
      <Message v-if="alertStore.message" />
    </Transition>

    <RouterView />
  </div>
</template>

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
