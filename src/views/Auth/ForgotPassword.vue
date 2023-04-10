<template>
  <div>
    <h3 class="text-center py-2 mb-8 text-gray-500 text-lg font-medium">
      Olvide mi contrasena
    </h3>

    <div class="grid gap-8 mx-auto px-4 w-1/4">
      <InputGeneric
        v-model="email"
        :validations="validations.email"
        label="Digite su email"
        name="email"
        @is-valid="disableButton = !$event"
      />
      <button
        :disabled="disableButton"
        class="py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
        @click="forgotPassword"
      >
        Recuperar senha
      </button>
    </div>
  </div>
</template>

<script setup>
import InputGeneric from '@/components/FormUI/InputGeneric.vue';
import { computed, ref } from 'vue';
import { emailValidation, requiredValidation } from '@/utils/validations';
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from '@/stores/alert';
import { useRouter } from 'vue-router';

const email = ref('');
const disableButton = ref(true);
const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

const validations = computed(() => {
  return {
    email: {
      isRequired: requiredValidation,
      isEmail: emailValidation,
    },
  };
});

const forgotPassword = () => {
  authStore
    .forgotPassword({ email: email.value })
    .then(() => {
      alertStore.showMsg({
        message:
          'Correo enviado satisfactoriamente, por favor verifique su bandeja de entrada',
        backgrColor: 'green',
        textColor: 'green',
      });
      router.push({ name: 'LandingPage' });
    })
    .catch((e) => {
      const errorCode = e?.response?.data?.message || 'ServerError';
      alertStore.showMsg({
        message: errorCode,
        backgrColor: 'red',
        textColor: 'red',
      });
    });
};
</script>

<style scoped></style>
