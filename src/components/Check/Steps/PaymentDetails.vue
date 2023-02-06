<template>
  <div>
    <div
        class="flex flex-col items-center justify-center mx-auto pt-20 space-y-6 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <DateInput
            v-model="auth.dataBuy.birthday"
            label="Data de Nacimento *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="auth.dataBuy.nameBuy"
            label="Nome Completo *"
            name="name-buy"
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
            v-model="auth.dataBuy.codeArea"
            label="Codigo de Area"
            name="code-area"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import SelectSimple from "@/components/FormUI/TheSelect.vue";

const auth = useAuthStore();


</script>

<style scoped>

</style>
