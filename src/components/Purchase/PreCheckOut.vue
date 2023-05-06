<template>
  <div class="mx-auto w-full mt-3.5 md:mt-0.5">
    <template v-if="vooI">
      <DisplayOutboundInformation
        :voo-selected="vooI"
        :show-buy-button="vooI && !vooV"
      />
    </template>
    <template v-if="vooV">
      <DisplayReturnInformation :voo-selected="vooV" :show-buy-button="true" />
    </template>
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
