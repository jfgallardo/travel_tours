<template>
  <div>
    <div class="flex flex-col items-center justify-center mx-auto space-y-6 py-20">
      <h1 class="text-3xl font-semibold">Como vocé gostaria de pagar</h1>
      <RadioButtonBox v-model="auth.paymentMethod" label="Credit Card" />
      <RadioButtonBox v-model="auth.paymentMethod" label="Payment Slip" />
      <RadioButtonBox v-model="auth.paymentMethod" label="Transfer" />
      <RadioButtonBox v-model="auth.paymentMethod" label="At the Agency" />
    </div>
  </div>
</template>

<script setup>
import RadioButtonBox from "@/components/FormUI/RadioButtonBox.vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

</script>

<style scoped>

</style>
