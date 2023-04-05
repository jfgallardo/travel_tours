<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto pt-20 space-y-6 w-full md:w-auto"
    >
      <div
        class="w-full flex flex-col lg:flex-row lg:space-x-2.5 space-y-6 lg:space-y-0"
      >
        <TextInput
          v-model="informationStore.detailsUser.cep"
          :label="$t('addressUser.cep')"
          name="cep"
          maska="#####-###"
          class="lg:w-1/2"
        />

        <TextInput
          v-model="informationStore.detailsUser.state"
          :label="$t('addressUser.estado')"
          class="lg:w-1/2"
          name="state"
          disable-field
        />

        <TextInput
          v-model="informationStore.detailsUser.city"
          :label="$t('addressUser.cidade')"
          class="lg:w-1/2"
          name="city"
          disable-field
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="informationStore.detailsUser.address"
          :label="$t('addressUser.endereo')"
          name="address"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="informationStore.detailsUser.number"
          :label="$t('addressUser.nmero')"
          name="number"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="informationStore.detailsUser.complement"
          :label="$t('addressUser.complemento')"
          name="complement"
        />
      </div>

      <div class="w-full">
        <TextInput
          v-model="informationStore.detailsUser.district"
          :label="$t('addressUser.bairro')"
          name="district"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from '@/components/FormUI/TextInput.vue';
import { watch } from 'vue';
import { useGeneralInformation } from '@/stores/generalInformation';

const informationStore = useGeneralInformation();

watch(
  () => informationStore.detailsUser.cep,
  (cep) => {
    if (cep.length >= 9) verifyCEP();
  }
);

const verifyCEP = async () => {
  await fetch(
    `https://brasilapi.com.br/api/cep/v1/${informationStore.detailsUser.cep}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.cep) {
        informationStore.detailsUser.state = '';
        informationStore.detailsUser.city = '';
        informationStore.detailsUser.address = '';
      } else {
        informationStore.detailsUser.state = data.state;
        informationStore.detailsUser.city = data.city;
        informationStore.detailsUser.address = `${data.neighborhood || ''} ${
          data.street || ''
        }`;
      }
    });
};
</script>

<style scoped></style>
