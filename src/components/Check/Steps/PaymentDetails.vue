<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto pt-20 space-y-6 w-full md:w-auto"
    >
      <div
        class="flex flex-col md:flex-row items-center w-full justify-center space-x-3.5"
      >
        <div class="w-1/5">
          <DateInput
            v-model="informationStore.detailsUser.birthday"
            label="Data de Nacimento *"
            name="birthday"
          />
        </div>
        <div class="w-1/5">
          <SelectSimple
            name="sexo"
            label="Sexo *"
            :options="[
              { label: 'M', value: 0 },
              { label: 'F', value: 1 },
            ]"
            :selected="informationStore.detailsUser.sexo"
            @select-value="informationStore.detailsUser.sexo = $event"
          />
        </div>
        <div class="w-2/5">
          <TextInput
            v-model="informationStore.detailsUser.nameBuy"
            label="Nome Completo *"
            name="name-buy"
          />
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row items-center w-full justify-center space-x-3.5"
      >
        <div class="w-1/5">
          <SelectSimple
            name="idd"
            label="IDD"
            :options="[{ label: '+55', value: 55 }]"
            :selected="informationStore.detailsUser.idd"
            @select-value="informationStore.detailsUser.idd = $event"
          />
        </div>
        <div class="w-1/5">
          <TextInput
            v-model="informationStore.detailsUser.codeArea"
            label="Codigo de Area"
            name="code-area"
          />
        </div>
        <div class="w-2/5">
          <TextInput
            v-model="informationStore.detailsUser.phone"
            label="Telefone principal"
            name="mainPhone"
            :maska="['(##) #####-####']"
          />
        </div>
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
