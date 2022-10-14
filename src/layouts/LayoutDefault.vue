<template>
  <div>
    <Header />
    <Transition mode="out-in">
      <RouterView />
    </Transition>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Partials/TheHeader.vue';
import Footer from '@/components/Partials/TheFooter.vue';
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
