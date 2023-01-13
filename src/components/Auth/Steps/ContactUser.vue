<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72"
    >
      <div class="w-4/12">
        <TextInput
          v-model="auth.user.mainPhone"
          label="Telefone principal *"
          name="mainPhone"
        />
      </div>

      <div class="w-4/12">
        <TextInput
          v-model="auth.user.alternativePhone"
          label="Telefone alternativo"
          name="alternativePhone"
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
