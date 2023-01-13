<template>
  <div>
    <div class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 xl:w-1/3 w-1/2 ">
      <div class="w-full">
        <TextInput 
          v-model="auth.user.fullName" 
          label="Numero de Cartão *" 
          name="fullName"
          maska="####-####-####-####" />
      </div>

      <div class="w-full">
        <TextInput 
          v-model="auth.user.birthday" 
          label="Suporte (Igual ao do cartão) *" 
          name="birthday" />
      </div>

      <div class="w-full">
        <TextInput 
          v-model="auth.user.cpf" 
          label="CPF *" 
          maska="###.###.###-##" 
          name="cpf" />
      </div>

      <div class="flex space-x-3.5 w-full">
        <DateInput 
          v-model="auth.user.birthday" 
          label="Data de Vencimento *" 
          name="birthday" 
          class="w-1/2" />
        <TextInput 
          v-model="auth.user.birthday" 
          label="Codigo de Segurança" 
          name="birthday" 
          class="w-1/2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';

const auth = useAuthStore();


</script>

<style scoped>

</style>
