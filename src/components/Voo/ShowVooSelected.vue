<template>
  <div>
    <RenderFlightsMany v-bind="vooI" />
  </div>
  <div>
    <RenderFlightsMany v-bind="vooV" />
  </div>
</template>

<script setup>
import Cookies from 'js-cookie';
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';

const vooI = JSON.parse(Cookies.get('I'));
const vooV = JSON.parse(Cookies.get('V'));
</script>

<style scoped></style>
