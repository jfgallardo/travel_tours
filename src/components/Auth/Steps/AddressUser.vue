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
          label="CEP *"
          v-model="userStore.user.cep"
          name="cep"
          maska="#####-###"
        />
      </div>
      <div>
        <TextInput
          label="Bairro *"
          v-model="userStore.user.bairro"
          name="bairro"
        />
      </div>
      <div>
        <TextInput
          label="Endereço *"
          v-model="userStore.user.address"
          name="address"
        />
      </div>
      <div>
        <TextInput
          label="Estado *"
          v-model="userStore.user.estado"
          name="estado"
        />
      </div>
      <div>
        <TextInput
          label="Número *"
          v-model="userStore.user.number"
          name="number"
        />
      </div>
      <div>
        <TextInput
          label="Cidade *"
          v-model="userStore.user.ciudade"
          name="ciudade"
        />
      </div>
      <div>
        <TextInput
          label="Complemento *"
          v-model="userStore.user.complemento"
          name="complemento"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TextInput from '@/components/FormUI/TextInput.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style scoped></style>
