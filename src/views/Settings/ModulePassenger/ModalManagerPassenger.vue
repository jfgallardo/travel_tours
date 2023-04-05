<template>
  <TheModal>
    <template #header>
      <div>
        <h3 class="font-semibold text-lg mr-20">
          Administrar pasajero de uso frecuente
        </h3>
      </div>
    </template>
    <template #body>
      <div class="p-3.5 pb-8 grid grid-cols-1 md:grid-cols-3 gap-x-2.5 gap-y-6">
        <InputGeneric
          v-model="passenger.name"
          label="Primeiro Nome *"
          name="name"
          :validations="validations.required"
          @is-valid="formIsValid = $event"
        />
        <InputGeneric
          v-model="passenger.last_name"
          label="Sobrenome Completo *"
          name="last_name"
          :validations="validations.required"
          @is-valid="formIsValid = $event"
        />
        <InputGeneric
          v-model="passenger.email"
          label="Email *"
          name="email"
          :validations="validations.required"
          @is-valid="formIsValid = $event"
        />

        <InputGeneric
          v-model="passenger.id_cpf"
          label="CPF *"
          name="cpf"
          maska="###.###.###-##"
          :validations="validations.required"
          @is-valid="formIsValid = $event"
        />
        <DateInput
          v-model="passenger.date_birth"
          label="Date Nascimento *"
          name="birthday"
        />
        <InputGeneric
          v-model="passenger.phone"
          label="Telefone principal *"
          name="mainPhone"
          :validations="validations.required"
          :maska="['(##) #####-####']"
          @is-valid="formIsValid = $event"
        />

        <passport-component
          v-model:passport="passenger.number_passport"
          v-model:validate-date="passenger.pass_validity"
          v-model:date-issue="passenger.pass_issue"
          @update:country-of-issue="passenger.countryIssue = $event.value"
          @update:country-of-residence="
            passenger.countryResidence = $event.value
          "
        />
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-2.5">
        <button
          class="bg-blue-600 text-white font-semibold text-lg py-2.5 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed w-full"
          :disabled="isDisabled"
          @click="addPassenger"
        >
          Editar
        </button>
        <button
          class="bg-red-600 text-white font-semibold text-lg py-2.5 hover:bg-red-700 w-full"
          @click="addPassenger"
        >
          Eliminar
        </button>
      </div>
    </template>
  </TheModal>
</template>

<script setup>
import TheModal from '@/components/Partials/TheModal.vue';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';
import { computed, ref } from 'vue';
import { requiredValidation } from '@/utils/validations';
import PassportComponent from '@/components/FormUI/PassportComponent.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import { useAuthStore } from '@/stores/auth';
import { usePassengerUserStore } from '@/stores/passenger';
import { useAlertStore } from '@/stores/alert';
import moment from 'moment';

const passenger = ref(props.passenger);
const formIsValid = ref(false);
const authStore = useAuthStore();
const passengerStore = usePassengerUserStore();
const alertStore = useAlertStore();

const props = defineProps({
  passenger: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(['correctRegister']);

const validations = computed(() => {
  return {
    required: {
      isRequired: requiredValidation,
    },
  };
});

const isDisabled = computed(() => {
  return (
    !formIsValid.value ||
    !passenger.value.name ||
    !passenger.value.last_name ||
    !passenger.value.cpf_number ||
    !passenger.value.birthday ||
    !passenger.value.mainPhone ||
    !passenger.value.email ||
    !passenger.value.passportNumber ||
    !passenger.value.validateDate ||
    !passenger.value.dateIssue ||
    !passenger.value.countryIssue ||
    !passenger.value.countryResidence
  );
});

const addPassenger = () => {
  const body = {
    user_id: authStore.userLogged.id,
    name: passenger.value.name,
    last_name: passenger.value.last_name,
    email: passenger.value.email,
    date_birth: moment(passenger.value.birthday, 'YYYY-MM-DD').format(),
    id_cpf: passenger.value.cpf_number,
    phone: passenger.value.mainPhone,
    number_passport: passenger.value.passportNumber,
    pass_validity: moment(passenger.value.validateDate, 'YYYY-MM-DD').format(),
    pass_issue: moment(passenger.value.dateIssue, 'YYYY-MM-DD').format(),
    contry_issue: passenger.value.countryIssue,
    contry_residence: passenger.value.countryResidence,
  };

  passengerStore
    .addPassenger(body)
    .then((response) => {
      alertStore.showMsg({
        message: 'Pasajero de uso frecuente creado correctamente',
        backgrColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      });
    })
    .catch((response) => {
      console.log('response', response);
    })
    .finally(() => {
      emit('correctRegister');
    });
};

const deletePassenger = () => {};
</script>

<style scoped></style>
