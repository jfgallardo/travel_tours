<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Partials/HeaderAuth.vue';
</script>

<style></style>
