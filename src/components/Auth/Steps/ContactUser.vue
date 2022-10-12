<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72"
    >
      <div class="w-4/12">
        <TextInput
          label="Telefone principal *"
          v-model="userStore.user.mainPhone"
          name="mainPhone"
        />
      </div>

      <div class="w-4/12">
        <TextInput
          label="Telefone alternativo"
          v-model="userStore.user.alternativePhone"
          name="alternativePhone"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/FormUI/TextInput.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style scoped></style>
