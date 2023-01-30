<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 w-1/2 md:w-auto"
    >
      <div class="flex w-full space-x-2.5">
        <TheSelect label="Credit Card" class="w-1/2"/>
        <TextInput
          v-model="auth.card.cardNumber"
          label="Numero de Cartão *"
          name="number-card"
          maska="#### #### #### ####"
          :text-r="auth.card.cardType"
          class="w-1/2"
        />
        <TextInput
          v-model="auth.card.cardSecurityCode"
          label="Codigo de Segurança"
          name="cvc"
          maska="####"
          class="w-1/4"
        />
      </div>

      <div class="flex w-full space-x-2.5">
        <TextInput
          v-model="auth.card.cardName"
          label="Nome (Igual ao do cartão) *"
          name="card-name"
          class="w-1/2"
        />
        <TextInput
          v-model="auth.card.cpfUserCard"
          label="CPF *"
          maska="###.###.###-##"
          name="number-cpf"
          class="w-1/2"
        />
        <TextInput
          v-model="auth.card.cardExpiration"
          label="Data de Vencimento *"
          name="expiration"
          :maska="['##/##', '##/####']"
          class="w-1/4"
        />
      </div>
    </div>
    <div class="px-3 py-2.5 text-white font-bold w-fit mx-auto" :class="creditCardVariant">
      {{ creditCardMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import validateInfo from '@/plugins/validate-card';
import TheSelect from "@/components/FormUI/TheSelect.vue";

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
  creditCardMessage.value = creditCard.message;
  auth.card.cardType = creditCard.niceType;
  creditCardVariant.value = creditCard.variant;
  auth.card.isValidFront = creditCard.variant === "bg-green-400"
});
</script>

<style scoped></style>
