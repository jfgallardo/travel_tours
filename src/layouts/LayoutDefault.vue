<template>
  <div>
    <Header />
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <div>
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Partials/TheHeader.vue';
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
