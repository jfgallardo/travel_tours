<template>
  <div>
    <div
        class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 xl:w-1/3 w-1/2 "
    >
      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Codigo Postal *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Morada *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Numero"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Complemento"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Bairro"
            name="birthday"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import TextInput from '@/components/FormUI/TextInput.vue';

const userStore = useUserStore();


</script>

<style scoped>

</style>
