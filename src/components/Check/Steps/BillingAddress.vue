<template>
  <div>
    <div
        class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <TextInput
            v-model="auth.dataBuy.postalCode"
            label="Codigo Postal *"
            name="postal-code"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.dataBuy.homeAddress"
            label="Morada *"
            name="home-address"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.dataBuy.homeNumber"
            label="Numero"
            name="home-number"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.dataBuy.homeComplement"
            label="Complemento"
            name="home-complement"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.dataBuy.homeDistrict"
            label="Bairro"
            name="home-district"
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
