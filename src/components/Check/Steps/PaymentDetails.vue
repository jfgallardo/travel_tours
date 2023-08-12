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
    <div
      v-if="
        informationStore.paymentMethod === 4 ||
        informationStore.paymentMethod === 5 ||
        informationStore.paymentMethod === 8
      "
    >
      <InputGeneric
        v-model="informationStore.detailsUser.cpf"
        v-cpf-mask
        label="CPF *"
        name="cpf"
        :validations="validations.cpf"
        @is-valid="informationStore.detailsUser.validCpf = $event"
      />
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import SelectSimple from '@/components/FormUI/TheSelect.vue';
import { useGeneralInformation } from '@/stores/generalInformation';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';
import { computed } from 'vue';
import { cpfValidation } from '@/utils/validations';

const informationStore = useGeneralInformation();

const validations = computed(() => {
  return {
    cpf: {
      isRequired: cpfValidation.requiredValidation,
      isCPF: cpfValidation.isCPF,
    },
  };
});
</script>

<style scoped></style>
