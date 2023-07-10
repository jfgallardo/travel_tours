<template>
  <div class="grid grid-cols-2 gap-4 mx-auto pt-20">
    <div>
      <DateInput
        v-model="informationStore.detailsUser.birthday"
        label="Data de Nacimento *"
        :min-date-show="null"
      />
    </div>
    <div>
      <TextInput
        v-model="informationStore.detailsUser.nameBuy"
        label="Nome Completo *"
        name="name-buy"
      />
    </div>
    <div>
      <SelectSimple
        name="idd"
        label="IDD"
        :options="[{ label: '+55', value: 55 }]"
        :selected="informationStore.detailsUser.idd"
        @select-value="informationStore.detailsUser.idd = $event"
      />
    </div>
    <div>
      <TextInput
        v-model="informationStore.detailsUser.codeArea"
        label="Codigo de Area"
        name="code-area"
      />
    </div>
    <div>
      <TextInput
        v-model="informationStore.detailsUser.phone"
        label="Telefone principal"
        name="mainPhone"
        :maska="['(##) #####-####']"
      />
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
