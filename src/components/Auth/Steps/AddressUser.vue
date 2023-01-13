<template>
  <div>
    <div class="grid grid-cols-2 gap-10 py-20 px-60 container mx-auto">
      <div class="relative">
        <a
          href="#"
          class="absolute -top-5 right-0 text-sm text-blue-600 hover:text-blue-700 underline underline-offset-1"
          >Não sei meu CEP</a
        >
        <TextInput
          v-model="auth.user.cep"
          label="CEP *"
          name="cep"
          maska="#####-###"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.bairro"
          label="Bairro *"
          name="bairro"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.address"
          label="Endereço *"
          name="address"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.estado"
          label="Estado *"
          name="estado"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.number"
          label="Número *"
          name="number"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.ciudade"
          label="Cidade *"
          name="ciudade"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.complemento"
          label="Complemento *"
          name="complemento"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/FormUI/TextInput.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<style scoped></style>
