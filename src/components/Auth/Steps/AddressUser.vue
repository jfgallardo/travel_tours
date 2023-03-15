<template>
  <div>
    <div class="grid grid-cols-2 gap-10 py-20 px-60 container mx-auto">
      <div class="relative">
        <a
          href="#"
          class="absolute -top-5 right-0 text-sm text-blue-600 hover:text-blue-700 underline underline-offset-1"
          >{{ $t('addressUser.noSeiMeuCep') }}</a
        >
        <TextInput
          v-model="auth.user.cep"
          :label="$t('addressUser.cep')"
          name="cep"
          maska="#####-###"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.bairro"
          :label="$t('addressUser.bairro')"
          name="bairro"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.address"
          :label="$t('addressUser.endereo')"
          name="address"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.estado"
          :label="$t('addressUser.estado')"
          name="estado"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.number"
          :label="$t('addressUser.nmero')"
          name="number"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.ciudade"
          :label="$t('addressUser.cidade')"
          name="ciudade"
        />
      </div>
      <div>
        <TextInput
          v-model="auth.user.complemento"
          :label="$t('addressUser.complemento')"
          name="complemento"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/FormUI/TextInput.vue';
import { useAuthStore } from '@/stores/auth';
import { watch } from "vue";

const auth = useAuthStore();

watch(
  () => auth.user.cep,
  (cep) => {
    if (cep.length >= 9) verifyCEP();
  }
);

const verifyCEP = async () => {
  await fetch(`https://brasilapi.com.br/api/cep/v1/${auth.user.cep}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.cep) {
        auth.user.estado = '';
        auth.user.ciudade = '';
        auth.user.address = '';
      } else {
        auth.user.estado = data.state;
        auth.user.ciudade = data.city;
        auth.user.address = `${data.neighborhood || ''} ${data.street || ''}`
      }
    });
};
</script>

<style scoped></style>
