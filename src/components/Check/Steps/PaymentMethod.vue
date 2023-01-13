<template>
  <div>
    <div class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72">
      <h1 class="text-3xl font-semibold">Como vocé gostaria de pagar</h1>
      <RadioButtonBox v-model="paymentMethod" label="Credit Card" />
      <RadioButtonBox v-model="paymentMethod" label="Payment Slip" />
      <RadioButtonBox v-model="paymentMethod" label="Transfer" />
      <RadioButtonBox v-model="paymentMethod" label="At the Agency" />
    </div>
  </div>
</template>

<script setup>
import RadioButtonBox from "@/components/FormUI/RadioButtonBox.vue";
import { ref } from "vue";

const paymentMethod = ref('Credit Card')
</script>

<style scoped>

</style>
