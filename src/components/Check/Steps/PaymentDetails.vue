<template>
  <div>
    <div
        class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72 xl:w-1/3 w-1/2 "
    >
      <div class="w-full">
        <DateInput
            v-model="userStore.user.birthday"
            label="Data de Nacimento *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Nome Completo *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <SelectSimple
            name="cpf"
            label="IDD"
            :options="[{label: 'DDD', value: ''}]"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Codigo de Area"
            name="birthday"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import SelectSimple from "@/components/FormUI/TheSelect.vue";

const userStore = useUserStore();


</script>

<style scoped>

</style>
