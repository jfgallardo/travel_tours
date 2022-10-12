<template>
  <div>
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Partials/TheHeader.vue';
import Footer from '@/components/Partials/TheFooter.vue';
</script>

<style></style>
