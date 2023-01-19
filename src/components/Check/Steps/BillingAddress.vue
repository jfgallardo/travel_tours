<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <TextInput
          v-model="auth.dataBuy.cep"
          label="CEP *"
          name="cep"
          maska="#####-###"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="auth.dataBuy.address"
          label="Morada *"
          name="address"
        />
      </div>

      <div class="w-full">
        <TextInput v-model="auth.dataBuy.number" label="Numero" name="number" />
      </div>

      <div class="w-full">
        <TextInput
          v-model="auth.dataBuy.complement"
          label="Complemento"
          name="complement"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="auth.dataBuy.district"
          label="Bairro"
          name="district"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import { watch } from 'vue';

const auth = useAuthStore();

watch(
  () => auth.dataBuy.cep,
  (cep) => {
    if (cep.length >= 9) verifyCEP();
  }
);

const verifyCEP = async () => {
  await fetch(`https://brasilapi.com.br/api/cep/v1/${auth.dataBuy.cep}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.cep) {
        console.log('CEP INCORRECTO');
      } else {
        console.log('Correcto', data);
      }
    });
};
</script>

<style scoped></style>
