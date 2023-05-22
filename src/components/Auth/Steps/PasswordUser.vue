<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-14 space-y-6"
    >
      <div class="w-4/12">
        <InputGeneric
          v-model="auth.user.email"
          label="E-mail *"
          name="email"
          :validations="validations.email"
        />
      </div>

      <div class="w-4/12">
        <InputGeneric
          v-model="auth.emailLocal"
          :error="differentEmails"
          label="Confirme seu e-mail *"
          name="emailConfirm"
          :validations="validations.email"
        />
      </div>

      <div class="w-4/12">
        <InputGeneric
          v-model="auth.user.password"
          label="Senha de acesso *"
          name="password"
          type-field="password"
          :validations="validations.password"
        />
      </div>

      <div class="w-4/12">
        <InputGeneric
          v-model="auth.passwordLocal"
          label="Confirme sua senha de acesso *"
          :error="differentPassword"
          name="passwordConfirm"
          type-field="password"
          :validations="validations.password"
        />
      </div>

      <div class="w-4/12">
        <CheckInput
          v-model="auth.termos"
          label="Confirmo ser maior de 18 (dezoito) anos e que todos os dados informados
acima são verídicos. Ainda confirmo que li e concordo com os Termos e
Condições de Uso da MaxMilhas."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckInput from '@/components/FormUI/CheckInput.vue';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { emailValidation, passwordValidation } from '@/utils/validations';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';

const differentEmails = computed(() => {
  if (auth.user.email && auth.emailLocal && auth.user.email !== auth.emailLocal)
    return 'Emails no coinciden, por favor verifique';
  return '';
});

const differentPassword = computed(() => {
  if (
    auth.user.password &&
    auth.passwordLocal &&
    auth.user.password !== auth.passwordLocal
  )
    return 'Passwords no coinciden, por favor verifique';
  return '';
});

const auth = useAuthStore();
const validations = computed(() => {
  return {
    email: {
      isEmail: emailValidation,
    },
    password: {
      minLength: passwordValidation.minLength,
      maxLength: passwordValidation.maxLength,
    },
  };
});
</script>
