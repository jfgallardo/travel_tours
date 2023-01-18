<template>
  <div>
    <div
        class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <TextInput
            v-model="auth.dataBuy.postalCode"
            label="CEP *"
            name="cep"
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
        <TextInput
            v-model="auth.dataBuy.number"
            label="Numero"
            name="number"
        />
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

const auth = useAuthStore();


</script>

<style scoped>

</style>
