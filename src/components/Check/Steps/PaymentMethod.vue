<template>
  <div>
    <div class="flex flex-col items-center justify-center mx-auto space-y-6">
      <h1 class="text-3xl font-semibold text-center">
        Como vocé gostaria de pagar
      </h1>
      <RadioButtonBox
        v-model="informationStore.paymentMethod"
        label="Credit Card"
        :idd="1"
      />
      <RadioButtonBox
        v-model="informationStore.paymentMethod"
        label="Payment Slip"
      />
      <RadioButtonBox
        v-model="informationStore.paymentMethod"
        label="Transfer"
        :idd="4"
      />
      <RadioButtonBox
        v-model="informationStore.paymentMethod"
        label="At the Agency"
        :idd="5"
      />
      <RadioButtonBox
        v-model="informationStore.paymentMethod"
        label="Pix"
        :idd="8"
      />
      <RadioButtonBox
        v-model="informationStore.paymentMethod"
        label="Boleto"
        :idd="3"
      />
    </div>
  </div>
</template>

<script setup>
import RadioButtonBox from '@/components/FormUI/RadioButtonBox.vue';
import { useGeneralInformation } from '@/stores/generalInformation';

const informationStore = useGeneralInformation();
</script>

<style scoped></style>
