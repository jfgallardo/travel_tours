<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto pt-20 space-y-6 w-full lg:w-1/2 md:w-auto"
    >
      <div class="w-full flex flex-col lg:flex-row lg:space-x-2.5 space-y-6 lg:space-y-0">
        <TextInput
          v-model="auth.dataBuy.cep"
          label="CEP *"
          name="cep"
          maska="#####-###"
          class="lg:w-1/2"
        />

        <TextInput
          v-model="auth.dataBuy.state"
          label="Estado *"
          class="lg:w-1/2"
          name="state"
          disable-field
        />

        <TextInput
          v-model="auth.dataBuy.city"
          label="Ciudade *"
          class="lg:w-1/2"
          name="city"
          disable-field
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
        auth.dataBuy.state = '';
        auth.dataBuy.city = '';
        auth.dataBuy.address = '';
      } else {
        auth.dataBuy.state = data.state;
        auth.dataBuy.city = data.city;
        auth.dataBuy.address = `${data.neighborhood || ''} ${data.street || ''}`
      }
    });
};
</script>

<style scoped></style>
