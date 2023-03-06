<template>
  <div>
    <DisplayOutboundInformation :voo-selected="userStore.vooSelected"/>
    <br>
    <DisplayReturnInformation v-if="userStore.vooSelected.VoosVolta?.length > 0" :voo-selected="userStore.vooSelected"/>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import DisplayOutboundInformation from "@/components/Purchase/DisplayOutboundInformation.vue";
import DisplayReturnInformation from "@/components/Purchase/DisplayReturnInformation.vue";

const userStore = useUserStore();

</script>

<style scoped>

</style>