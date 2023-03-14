<template>
  <div class="pt-3.5">
    <h3 class="font-semibold px-5 text-lg">
      Preencha os formulários de bilhete
    </h3>
  </div>
  <div class="py-8 px-3.5">
    <div
      class="flex flex-col lg:flex-row justify-between items-center border border-gray-400 p-3.5"
    >
      <h3 class="text-lg">
        Use o controle para preencher um ticket com seus dados salvos
      </h3>
      <button
        class="bg-blue-700 hover:bg-blue-800 text-white p-2 hover:cursor-pointer text-sm rounded-full mt-2.5 lg:mt-0"
        @click="useData"
      >
        Usar mis dados
      </button>
    </div>
  </div>
  <table
    class="table-fixed border border-l-0 border-b-0 border-gray-200 w-full px-4 mx-auto border-spacing-2 border-separate pb-28"
  >
    <tbody>
      <tr>
        <td>
          <div>
            <h3 class="font-semibold px-5">Informações do passageiro</h3>
          </div>
        </td>
      </tr>
      <tr>
        <td class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2">
          <template
            v-for="(i, index) in passengerStore.informationAdults"
            :key="index"
          >
            <CollapseAccording class="w-full">
              <template #header> {{ t('adults') }} #{{ index + 1 }}</template>
              <template #body>
                <form
                  class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4 w-full"
                >
                  <TextInput v-model="i.name" label="Primeiro Nome *" />
                  <TextInput
                    v-model="i.last_name"
                    label="Sobrenome Completo *"
                  />
                  <TextInput v-model="i.email" label="Email *" name="email" />
                  <TextInput
                    v-model="i.cpf_number"
                    label="CPF *"
                    maska="###.###.###-##"
                  />
                  <DateInput v-model="i.birthday" label="Date Nascimento *" />
                  <TextInput
                    v-model="i.mainPhone"
                    label="Telefone principal *"
                    name="mainPhone"
                    :maska="['(##) #####-####']"
                  />
                  <passport-component
                    v-model:passport="i.passportNumber"
                    v-model:validate-date="i.validateDate"
                    v-model:date-issue="i.dateIssue"
                    @update:country-of-issue="i.countryIssue = $event.value"
                    @update:country-of-residence="
                      i.countryResidence = $event.value
                    "
                  />
                </form>
              </template>
            </CollapseAccording>
          </template>
          <div v-if="userStore.countCrianca > 0">
            <template
              v-for="(i, index) in passengerStore.informationTeenagers"
              :key="index"
            >
              <CollapseAccording class="w-full">
                <template #header>
                  {{ t('children') }} #{{ index + 1 }}</template
                >
                <template #body>
                  <form
                    class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4 w-full"
                  >
                    <TextInput v-model="i.name" label="Primeiro Nome *" />
                    <TextInput
                      v-model="i.last_name"
                      label="Sobrenome Completo *"
                    />
                    <TextInput v-model="i.email" label="Email *" name="email" />
                    <TextInput v-model="i.cpf_number" label="CPF *" />
                    <DateInput v-model="i.birthday" label="Date Nascimento *" />
                    <TextInput
                      v-model="i.mainPhone"
                      label="Telefone principal *"
                      name="mainPhone"
                      :maska="['(##) #####-####']"
                    />
                    <passport-component
                      v-model:passport="i.passportNumber"
                      v-model:validate-date="i.validateDate"
                      v-model:date-issue="i.dateIssue"
                      @update:country-of-issue="i.countryIssue = $event.value"
                      @update:country-of-residence="
                        i.countryResidence = $event.value
                      "
                    />
                  </form>
                </template>
              </CollapseAccording>
            </template>
          </div>
          <div v-if="userStore.countBebe > 0">
            <template
              v-for="(i, index) in passengerStore.informationBabies"
              :key="index"
            >
              <CollapseAccording class="w-full">
                <template #header> {{ t('babies') }} #{{ index + 1 }}</template>
                <template #body>
                  <form
                    class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4 w-full"
                  >
                    <TextInput v-model="i.name" label="Primeiro Nome *" />
                    <TextInput
                      v-model="i.last_name"
                      label="Sobrenome Completo *"
                    />
                    <TextInput v-model="i.email" label="Email *" name="email" />
                    <TextInput v-model="i.cpf_number" label="CPF *" />
                    <DateInput v-model="i.birthday" label="Date Nascimento *" />
                    <TextInput
                      v-model="i.mainPhone"
                      label="Telefone principal *"
                      name="mainPhone"
                      :maska="['(##) #####-####']"
                    />
                    <passport-component
                      v-model:passport="i.passportNumber"
                      v-model:validate-date="i.validateDate"
                      v-model:date-issue="i.dateIssue"
                      @update:country-of-issue="i.countryIssue = $event.value"
                      @update:country-of-residence="
                        i.countryResidence = $event.value
                      "
                    />
                  </form>
                </template>
              </CollapseAccording>
            </template>
          </div>
          <div class="flex items-center justify-center pt-3.5">
            <RouterLink
              v-if="!disable"
              :to="{ name: 'CheckPage' }"
              class="bg-blue-700 hover:bg-blue-800 text-white px-12 py-2"
            >
              Finalizar Compra
            </RouterLink>
            <button
              v-else
              :disabled="disable"
              class="bg-blue-700 hover:bg-blue-800 text-white px-12 py-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              Finalizar Compra
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import CollapseAccording from '@/components/Static/CollapseAccording.vue';
import { computed, inject, onMounted } from 'vue';
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { useAlertStore } from '@/stores/alert';
import { usePassengerStore } from '@/stores/passengerInformation';
import PassportComponent from '@/components/FormUI/PassportComponent.vue';
import { useUserStore } from '@/stores/user';

onMounted(() => {
  if (passengerStore.informationAdults.length === 0) getArrayData();
});
const { t } = useI18n();
const alertStore = useAlertStore();
const passengerStore = usePassengerStore();
const userStore = useUserStore();

const $cookies = inject('$cookies');

const useData = () => {
  if (!$cookies.isKey('dataUser')) {
    alertStore.showMsg({
      message: 'Para el uso de esta funcionalidad precisa ingresar a su cuenta',
      backgrColor: 'bg-red-100',
      textColor: 'text-red-700',
    });
  }
};

const getArrayData = () => {
  for (let i = 0; i < userStore.countAdulto; i++) {
    passengerStore.informationAdults.push({
      email: '',
      name: '',
      last_name: '',
      cpf_number: '',
      birthday: '',
      mainPhone: '',
      passportNumber: '',
      validateDate: '',
      dateIssue: '',
      countryIssue: '',
      countryResidence: '',
    });
  }

  if (userStore.countCrianca > 0) {
    for (let i = 0; i < userStore.countCrianca; i++) {
      passengerStore.informationTeenagers.push({
        email: '',
        name: '',
        last_name: '',
        cpf_number: '',
        birthday: '',
        mainPhone: '',
        passportNumber: '',
        validateDate: '',
        dateIssue: '',
        countryIssue: '',
        countryResidence: '',
      });
    }
  }
  if (userStore.countBebe > 0) {
    for (let i = 0; i < userStore.countBebe; i++) {
      passengerStore.informationBabies.push({
        email: '',
        name: '',
        last_name: '',
        cpf_number: '',
        birthday: '',
        mainPhone: '',
        passportNumber: '',
        validateDate: '',
        dateIssue: '',
        countryIssue: '',
        countryResidence: '',
      });
    }
  }
};

const checkInformationAdults = computed(() => {
  let check = false;
  passengerStore.informationAdults.map((o) => {
    if (
      !o.email ||
      !o.name ||
      !o.last_name ||
      !o.cpf_number ||
      !o.birthday ||
      !o.mainPhone
    )
      check = true;
  });
  return check;
});

const checkInformationTeenagers = computed(() => {
  let check = false;
  passengerStore.informationTeenagers.map((o) => {
    if (
      !o.email ||
      !o.name ||
      !o.last_name ||
      !o.cpf_number ||
      !o.birthday ||
      !o.mainPhone
    )
      check = true;
  });
  return check;
});

const checkInformationBabies = computed(() => {
  let check = false;
  passengerStore.informationBabies.map((o) => {
    if (
      !o.email ||
      !o.name ||
      !o.last_name ||
      !o.cpf_number ||
      !o.birthday ||
      !o.mainPhone
    )
      check = true;
  });
  return check;
});

const disable = computed(() => {
  return (
    checkInformationBabies.value ||
    checkInformationTeenagers.value ||
    checkInformationAdults.value
  );
});
</script>

<style scoped></style>
