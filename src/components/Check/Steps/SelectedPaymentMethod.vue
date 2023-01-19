<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <TextInput
          v-model="auth.card.cardNumber"
          label="Numero de Cartão *"
          name="number-card"
          maska="#### #### #### ####"
          :text-r="auth.card.cardType"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="auth.card.cardName"
          label="Nome (Igual ao do cartão) *"
          name="card-name"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="auth.card.cpfUserCard"
          label="CPF *"
          maska="###.###.###-##"
          name="number-cpf"
        />
      </div>

      <div class="flex space-x-3.5 w-full">
        <TextInput
          v-model="auth.card.cardExpiration"
          label="Data de Vencimento *"
          name="expiration"
          maska="##/##"
          class="w-1/2"
        />
        <TextInput
          v-model="auth.card.cardSecurityCode"
          label="Codigo de Segurança"
          name="cvc"
          maska="####"
          class="w-1/2"
        />
      </div>
      <div class="px-3 py-2.5 text-white font-bold" :class="creditCardVariant">
        {{ creditCardMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import validateInfo from '@/plugins/validate-card';

const auth = useAuthStore();
const creditCardMessage = ref();
const creditCardVariant = ref();

watch(auth.card, (newValue) => {
  const values = {
    cardNumber: newValue.cardNumber,
    cardExpiration: newValue.cardExpiration,
    cardSecurityCode: newValue.cardSecurityCode,
    cardName: newValue.cardName,
  };
  let creditCard = validateInfo(values);
  console.log(creditCard);
  creditCardMessage.value = creditCard.message;
  auth.card.cardType = creditCard.niceType;
  creditCardVariant.value = creditCard.variant;
  auth.card.isValidFront = creditCard.variant === "bg-green-400"
});
</script>

<style scoped></style>
