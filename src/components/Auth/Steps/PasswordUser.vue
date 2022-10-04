<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-14 space-y-6"
    >
      <div class="w-4/12">
        <TextInput
          label="E-mail *"
          v-model="userStore.user.email"
          name="email"
        />
      </div>

      <div class="w-4/12">
        <TextInput label="Confirme seu e-mail *" name="emailConfirm" />
      </div>

      <div class="w-4/12">
        <TextInput
          label="Senha de acesso *"
          v-model="userStore.user.password"
          name="password"
        />
      </div>

      <div class="w-4/12">
        <TextInput
          label="Confirme sua senha de acesso*"
          name="passwordConfirm"
        />
      </div>

      <div class="w-4/12">
        <CheckInput
          label="Confirmo ser maior de 18 (dezoito) anos e que todos os dados informados
acima são verídicos. Ainda confirmo que li e concordo com os Termos e
Condições de Uso da MaxMilhas."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from "@/components/FormUI/TextInput.vue";
import CheckInput from "@/components/FormUI/CheckInput.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<style scoped></style>
