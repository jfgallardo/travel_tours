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
        disabled
        class="bg-blue-700 hover:bg-blue-800 text-white p-2 hover:cursor-pointer text-sm rounded-full mt-2.5 lg:mt-0 disabled:bg-blue-400"
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
            v-for="(i, index) in purchaseStore.informationAdults"
            :key="index"
          >
            <CollapseAccording class="w-full" reports-open>
              <template #header> {{ t('adults') }} #{{ index + 1 }}</template>
              <template #body>
                <form
                  class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-6 w-full"
                >
                  <TextInput v-model="i.name" label="Primeiro Nome *" />
                  <TextInput
                    v-model="i.last_name"
                    label="Sobrenome Completo *"
                  />
                  <InputGeneric
                    v-model="i.email"
                    label="Email *"
                    name="email"
                    :validations="validations.email"
                  />
                  <DateInput
                    v-model="i.birthday"
                    label="Date Nascimento *"
                    :min-date-show="null"
                  />
                  <InputGeneric
                    v-model="i.mainPhone"
                    v-phone-mask
                    label="Telefone principal *"
                    name="mainPhone"
                    :validations="validations.phone"
                    @is-valid="formIsValid = $event"
                  />
                  <Select
                    :selected="i.documentSelected"
                    label="Documentos aceptados *"
                    :options="acceptedDocuments"
                    @select-value="i.documentSelected = $event"
                  />

                  <InputGeneric
                    v-if="i.documentSelected?.value === 'C'"
                    v-model="i.cpf_number"
                    v-cpf-mask
                    label="CPF *"
                    name="cpf"
                    :validations="validations.cpf"
                    @is-valid="formIsValid = $event"
                  />
                  <passport-component
                    v-if="i.documentSelected?.value === 'P'"
                    v-model:passport="i.passportNumber"
                    v-model:validate-date="i.validateDate"
                    v-model:date-issue="i.dateIssue"
                    :country-of-issue="i.countryIssue"
                    :country-of-residence="i.countryResidence"
                    @update:country-of-issue="i.countryIssue = $event"
                    @update:country-of-residence="i.countryResidence = $event"
                  />
                </form>
              </template>
            </CollapseAccording>
          </template>
          <div v-if="searchStore.teenagers > 0">
            <template
              v-for="(i, index) in purchaseStore.informationTeenagers"
              :key="index"
            >
              <CollapseAccording class="w-full" reports-open>
                <template #header>
                  {{ t('children') }} #{{ index + 1 }}</template
                >
                <template #body>
                  <form
                    class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-6 w-full"
                  >
                    <TextInput v-model="i.name" label="Primeiro Nome *" />
                    <TextInput
                      v-model="i.last_name"
                      label="Sobrenome Completo *"
                    />
                    <InputGeneric
                      v-model="i.email"
                      label="Email *"
                      name="email"
                      :validations="validations.email"
                    />
                    <DateInput
                      v-model="i.birthday"
                      label="Date Nascimento *"
                      :min-date-show="null"
                    />
                    <TextInput
                      v-model="i.mainPhone"
                      label="Telefone principal *"
                      name="mainPhone"
                      :maska="['(##) #####-####']"
                    />
                    <Select
                      :selected="i.documentSelected"
                      label="Documentos aceptados *"
                      :options="acceptedDocuments"
                      @select-value="i.documentSelected = $event"
                    />

                    <InputGeneric
                      v-show="i.documentSelected?.value === 'C'"
                      v-model="i.cpf_number"
                      v-cpf-mask
                      label="CPF *"
                      name="cpf"
                      :validations="validations.cpf"
                      @is-valid="formIsValid = $event"
                    />
                    <passport-component
                      v-show="i.documentSelected?.value === 'P'"
                      v-model:passport="i.passportNumber"
                      v-model:validate-date="i.validateDate"
                      v-model:date-issue="i.dateIssue"
                      :country-of-issue="i.countryIssue"
                      :country-of-residence="i.countryResidence"
                      @update:country-of-issue="i.countryIssue = $event"
                      @update:country-of-residence="i.countryResidence = $event"
                    />
                  </form>
                </template>
              </CollapseAccording>
            </template>
          </div>
          <div v-if="searchStore.babies > 0">
            <template
              v-for="(i, index) in purchaseStore.informationBabies"
              :key="index"
            >
              <CollapseAccording class="w-full" reports-open>
                <template #header> {{ t('babies') }} #{{ index + 1 }}</template>
                <template #body>
                  <form
                    class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-6 w-full"
                  >
                    <TextInput v-model="i.name" label="Primeiro Nome *" />
                    <TextInput
                      v-model="i.last_name"
                      label="Sobrenome Completo *"
                    />
                    <InputGeneric
                      v-model="i.email"
                      label="Email *"
                      name="email"
                      :validations="validations.email"
                    />
                    <DateInput
                      v-model="i.birthday"
                      label="Date Nascimento *"
                      :min-date-show="null"
                    />
                    <TextInput
                      v-model="i.mainPhone"
                      label="Telefone principal *"
                      name="mainPhone"
                      :maska="['(##) #####-####']"
                    />
                    <Select
                      :selected="i.documentSelected"
                      label="Documentos aceptados *"
                      :options="acceptedDocuments"
                      @select-value="i.documentSelected = $event"
                    />

                    <InputGeneric
                      v-show="i.documentSelected?.value === 'C'"
                      v-model="i.cpf_number"
                      v-cpf-mask
                      label="CPF *"
                      name="cpf"
                      :validations="validations.cpf"
                      @is-valid="formIsValid = $event"
                    />
                    <passport-component
                      v-show="i.documentSelected?.value === 'P'"
                      v-model:passport="i.passportNumber"
                      v-model:validate-date="i.validateDate"
                      v-model:date-issue="i.dateIssue"
                      :country-of-issue="i.countryIssue"
                      :country-of-residence="i.countryResidence"
                      @update:country-of-issue="i.countryIssue = $event"
                      @update:country-of-residence="i.countryResidence = $event"
                    />
                  </form>
                </template>
              </CollapseAccording>
            </template>
          </div>
          <div class="flex items-center justify-center pt-3.5">
            <RouterLink
              :to="{ name: 'CheckPage' }"
              class="bg-blue-700 hover:bg-blue-800 text-white px-12 py-2"
              :class="{ 'disable-link': disable }"
            >
              Finalizar Compra
            </RouterLink>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ModalSaveData
    v-if="saveDataModal"
    :options="pass"
    @close="saveDataModal = false"
  ></ModalSaveData>
</template>

<script setup>
import CollapseAccording from '@/components/Static/CollapseAccording.vue';
import { computed, onMounted, ref } from 'vue';
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { useAlertStore } from '@/stores/alert';
import { usePurchaseStore } from '@/stores/purchase.user';
import PassportComponent from '@/components/FormUI/PassportComponent.vue';
import ModalSaveData from '@/components/SaveData/ModalSaveData.vue';
import { usePassengerUserStore } from '@/stores/passenger';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';
import {
  cpfValidation,
  requiredValidation,
  emailValidation,
  phoneValidation,
} from '@/utils/validations';
import Select from '@/components/FormUI/TheSelect.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useAuthStore } from '@/stores/auth';
import Cookies from 'js-cookie';

onMounted(() => {
  if (purchaseStore.informationAdults.length === 0) getArrayData();
});

const { t } = useI18n();
const alertStore = useAlertStore();
const purchaseStore = usePurchaseStore();
const searchStore = useSearchOptionsVooStore();
const saveDataModal = ref(false);
const passengerStore = usePassengerUserStore();
const authStore = useAuthStore();
const pass = ref(null);
const formIsValid = ref(true);

const platform = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  //const travel_two = Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;
  return travel_one.Platform;
});

const acceptedDocuments = computed(() => {
  return [
    { label: 'Passport', value: 'P' },
    { label: 'CPF', value: 'C' },
  ];
});

const validations = computed(() => {
  return {
    required: {
      isRequired: requiredValidation,
    },
    cpf: {
      isRequired: cpfValidation.requiredValidation,
      isCPF: cpfValidation.isCPF,
    },
    email: {
      isRequired: requiredValidation,
      isEmail: emailValidation,
    },
    phone: {
      isRequired: phoneValidation.requiredValidation,
      isPhone: phoneValidation.isPhoneNumber,
    },
  };
});

const useData = () => {
  if (!authStore.userLogged) {
    alertStore.showMsg({
      message: 'Para el uso de esta funcionalidad precisa ingresar a su cuenta',
      backgrColor: 'red',
      textColor: 'red',
    });
  } else {
    passengerStore
      .fetchPassengers()
      .then(({ data }) => {
        if (data.data) {
          passengerStore.passengers = data.data;
          pass.value = data.data.map((o) => {
            return {
              label: o.name,
              value: o.id,
            };
          });
          saveDataModal.value = true;
        } else {
          alertStore.showMsg({
            message: 'No existen usuarios registrados en su cuenta',
            backgrColor: 'bg-red-100',
            textColor: 'text-red-700',
          });
        }
      })
      .catch(({ response }) => {
        alertStore.showMsg({
          message: response.data.message,
          backgrColor: 'bg-red-100',
          textColor: 'text-red-700',
        });
      });
    saveDataModal.value = true;
  }
};

const getArrayData = () => {
  for (let i = 0; i < searchStore.adults; i++) {
    purchaseStore.informationAdults.push({
      email: '',
      name: '',
      last_name: '',
      cpf_number: '',
      birthday: '',
      mainPhone: '',
      passportNumber: '',
      dateIssue: '',
      countryIssue: '',
      countryResidence: '',
      documentSelected: null,
    });
  }

  if (searchStore.teenagers > 0) {
    for (let i = 0; i < searchStore.teenagers; i++) {
      purchaseStore.informationTeenagers.push({
        email: '',
        name: '',
        last_name: '',
        cpf_number: '',
        birthday: '',
        mainPhone: '',
        passportNumber: '',
        dateIssue: '',
        countryIssue: '',
        countryResidence: '',
        documentSelected: null,
      });
    }
  }
  if (searchStore.babies > 0) {
    for (let i = 0; i < searchStore.babies; i++) {
      purchaseStore.informationBabies.push({
        email: '',
        name: '',
        last_name: '',
        cpf_number: '',
        birthday: '',
        mainPhone: '',
        passportNumber: '',
        dateIssue: '',
        countryIssue: '',
        countryResidence: '',
        documentSelected: null,
      });
    }
  }
};

const checkInformationAdults = computed(() => {
  let check = false;
  purchaseStore.informationAdults.map((o) => {
    const flag =
      o.documentSelected?.value === 'C'
        ? !o.cpf_number || !formIsValid.value
        : !o.passportNumber ||
          !o.dateIssue ||
          !o.countryIssue ||
          !o.countryResidence;
    if (
      !o.email ||
      !o.name ||
      !o.last_name ||
      flag ||
      !o.birthday ||
      !o.mainPhone
    )
      check = true;
  });
  return check;
});

const checkInformationTeenagers = computed(() => {
  let check = false;
  purchaseStore.informationTeenagers?.map((o) => {
    const flag =
      o.documentSelected.value === 'C'
        ? !o.cpf_number || !formIsValid.value
        : !o.passportNumber ||
          !o.dateIssue ||
          !o.countryIssue ||
          !o.countryResidence;
    if (
      !o.email ||
      !o.name ||
      !o.last_name ||
      flag ||
      !o.birthday ||
      !o.mainPhone
    )
      check = true;
  });
  return check;
});

const checkInformationBabies = computed(() => {
  let check = false;
  purchaseStore.informationBabies?.map((o) => {
    const flag =
      o.documentSelected.value === 'C'
        ? !o.cpf_number || !formIsValid.value
        : !o.passportNumber ||
          !o.dateIssue ||
          !o.countryIssue ||
          !o.countryResidence;
    if (
      !o.email ||
      !o.name ||
      !o.last_name ||
      flag ||
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

<style scoped>
.disable-link {
  pointer-events: none;
  opacity: 50%;
}
</style>
