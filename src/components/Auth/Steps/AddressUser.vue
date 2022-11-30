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
          v-model="userStore.user.cep"
          label="CEP *"
          name="cep"
          maska="#####-###"
        />
      </div>
      <div>
        <TextInput
          v-model="userStore.user.bairro"
          label="Bairro *"
          name="bairro"
        />
      </div>
      <div>
        <TextInput
          v-model="userStore.user.address"
          label="Endereço *"
          name="address"
        />
      </div>
      <div>
        <TextInput
          v-model="userStore.user.estado"
          label="Estado *"
          name="estado"
        />
      </div>
      <div>
        <TextInput
          v-model="userStore.user.number"
          label="Número *"
          name="number"
        />
      </div>
      <div>
        <TextInput
          v-model="userStore.user.ciudade"
          label="Cidade *"
          name="ciudade"
        />
      </div>
      <div>
        <TextInput
          v-model="userStore.user.complemento"
          label="Complemento *"
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
