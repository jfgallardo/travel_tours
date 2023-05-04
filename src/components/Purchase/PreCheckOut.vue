<template>
  <div class="mx-auto w-full mt-3.5 md:mt-0.5">
    <pre>{{ vooI }}</pre>
    <pre>{{ vooV }}</pre>
  </div>
</template>
<script setup>
import Cookies from 'js-cookie';
import { computed } from 'vue';
import DisplayOutboundInformation from '@/components/Purchase/DisplayOutboundInformation.vue';
import DisplayReturnInformation from '@/components/Purchase/DisplayReturnInformation.vue';

const vooI = computed(() => {
  return Cookies.get('I') ? JSON.parse(Cookies.get('I')) : null;
});

const vooV = computed(() => {
  return Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;
});
</script>
