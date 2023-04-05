<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto pt-20 space-y-6 w-full md:w-auto"
    >
      <div class="w-full">
        <DateInput
          v-model="informationStore.detailsUser.birthday"
          label="Data de Nacimento *"
          name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="informationStore.detailsUser.nameBuy"
          label="Nome Completo *"
          name="name-buy"
        />
      </div>

      <div class="w-full">
        <SelectSimple
          name="cpf"
          label="IDD"
          :options="[{ label: 'DDD', value: '' }]"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="informationStore.detailsUser.codeArea"
          label="Codigo de Area"
          name="code-area"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import SelectSimple from '@/components/FormUI/TheSelect.vue';
import { useGeneralInformation } from '@/stores/generalInformation';

const informationStore = useGeneralInformation();
</script>

<style scoped></style>
