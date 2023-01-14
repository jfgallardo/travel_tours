<template>
  <div>
    <div
        class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <TextInput
            v-model="auth.user.birthday"
            label="Codigo Postal *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.user.birthday"
            label="Morada *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.user.birthday"
            label="Numero"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.user.birthday"
            label="Complemento"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.user.birthday"
            label="Bairro"
            name="birthday"
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
