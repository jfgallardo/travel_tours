<template>
  <div>
    <div class="flex justify-end mb-4">
      <ClockOffers />
    </div>
    <DisplayOutboundInformation :voo-selected="userStore.vooSelected"/>
    <br>
    <DisplayReturnInformation :voo-selected="userStore.vooSelected" />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import DisplayOutboundInformation from "@/components/Purchase/DisplayOutboundInformation.vue";
import DisplayReturnInformation from "@/components/Purchase/DisplayReturnInformation.vue";
import ClockOffers from "@/components/Purchase/ClockOffers.vue";

const userStore = useUserStore();

</script>

<style scoped>

</style>