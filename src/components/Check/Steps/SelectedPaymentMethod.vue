<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <TextInput
          v-model="auth.card.numberCard"
          label="Numero de Cartão *"
          name="number-card"
          maska="#### #### #### ####"
          :text-r="creditCardNiceType"
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
          name="cpf"
        />
      </div>

      <div class="flex space-x-3.5 w-full">
        <TextInput
          v-model="auth.card.cardExpiration"
          label="Data de Vencimento *"
          name="expiration"
          maska="##/####"
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
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import validateInfo from '@/plugins/validate-card';

const emit = defineEmits(['creditCard']);

onMounted(() => {
  emit('creditCard', true);
});

const auth = useAuthStore();
const creditCardMessage = ref();
const creditCardNiceType = ref();
const creditCardVariant = ref();

watch(auth.card, (newValue) => {
  const values = {
    cardNumber: newValue.numberCard,
    cardType: newValue.cardType,
    cardExpiration: newValue.cardExpiration,
    cardSecurityCode: newValue.cardSecurityCode,
    cardPostalCode: newValue.cardPostalCode,
    cardName: newValue.cardName,
  };
  let creditCard = validateInfo(values);
  creditCardMessage.value = creditCard.message;
  creditCardNiceType.value = creditCard.niceType;
  creditCardVariant.value = creditCard.variant;
});
</script>

<style scoped></style>
