<template>
  <form>
    <div class="px-20 pt-5">
      <KeepAlive>
        <component :is="selectedComponent"></component>
      </KeepAlive>
    </div>
    <div class="flex items-center justify-center space-x-6 my-16">
      <button
        v-if="auth.currentStepPayment > 0"
        type="button"
        class="bg-gray-200 hover:bg-gray-300 py-2 px-10"
        @click="backStep"
      >
        Retornar
      </button>
      <button
        v-if="auth.currentStepPayment !== 4"
        type="submit"
        :disabled="!auth.card.isValidFront && auth.currentStepPayment === 1"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10 disabled:bg-blue-400 disabled:cursor-not-allowed"
        @click="nextStep"
      >
        Proximo
      </button>
      <button
        v-if="auth.currentStepPayment === 4"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
        disabled
      >
        Verifica Agora
      </button>
    </div>
  </form>
</template>

<script setup>
import PaymentMethod from '@/components/Check/Steps/PaymentMethod.vue';
import SelectedPaymentMethod from '@/components/Check/Steps/SelectedPaymentMethod.vue';
import { markRaw, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useForm } from 'vee-validate';
import PaymentDetails from '@/components/Check/Steps/PaymentDetails.vue';
import BillingAddress from '@/components/Check/Steps/BillingAddress.vue';
import FinalStep from '@/components/Check/Steps/FinalStep.vue';
import { simpleSchemaBuy } from '@/utils/validate';
import { useAlertStore } from "@/stores/alert";

onMounted(() => {
  selectedComponent.value = markRaw(PaymentMethod);
});

const auth = useAuthStore();
const alertStore = useAlertStore()

const steps = [
  { component: PaymentMethod },
  { component: SelectedPaymentMethod },
  { component: PaymentDetails },
  { component: BillingAddress },
  { component: FinalStep },
];
const selectedComponent = ref(null);

const { handleSubmit, setFieldError, errors } = useForm({
  validationSchema: simpleSchemaBuy,
});

const nextStep = handleSubmit((values) => {
  if (auth.currentStepPayment === 0) {
    auth.currentStepPayment++;
  } else if (auth.currentStepPayment === 1) {
    if (!auth.card.isValidFront) {
      return;
    } else if (!values['number-cpf']) {
      setFieldError('number-cpf', 'CPF é obrigatório');
    } else if(auth.card.bainderaSelected.label !== auth.card.cardType) {
      alertStore.showMsg({
        message: 'Tipo de tarjea seleccionada invalida',
        backgrColor: 'bg-red-100',
        textColor: 'text-red-700'
      })
    } else {
      auth.currentStepPayment++;
    }
  } else if (auth.currentStepPayment === 2) {
    if (!values.birthday) {
      setFieldError('birthday', 'Birthday é obrigatório');
    } else if (!values['name-buy']) {
      setFieldError('name-buy', 'Name é obrigatório');
    } else {
      auth.currentStepPayment++;
    }
  } else if (auth.currentStepPayment === 3) {
    if (!values.cep) {
      setFieldError('cep', 'CEP é obrigatório');
    } else if (!values.address) {
      setFieldError('address', 'address é obrigatório');
    } else {
      auth.currentStepPayment++;
    }
  } else if (auth.currentStepPayment === 4) {
    if (!values.state) {
      setFieldError('state', 'State é obrigatório');
    } else if (!values.address) {
      setFieldError('city', 'City é obrigatório');
    } else {
      auth.currentStepPayment++;
    }
  }

  selectedComponent.value = markRaw(steps[auth.currentStepPayment].component);
});
const backStep = () => {
  if (auth.currentStepPayment >= 1 && auth.currentStepPayment <= 5) {
    if (Object.keys(errors.value).length > 0) return;
    auth.currentStepPayment--;
  }
  selectedComponent.value = markRaw(steps[auth.currentStepPayment].component);
};
</script>
