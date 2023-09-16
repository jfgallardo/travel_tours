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
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10 disabled:bg-blue-400"
        :disabled="disabledButton"
        @click.prevent="auth.currentStepPayment === 4 ? reservar() : nextStep()"
      >
        {{ auth.currentStepPayment === 4 ? 'Verifica Agora' : 'Proximo' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import PaymentMethod from '@/components/Check/Steps/PaymentMethod.vue';
import SelectedPaymentMethod from '@/components/Check/Steps/SelectedPaymentMethod.vue';
import { computed, markRaw, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import PaymentDetails from '@/components/Check/Steps/PaymentDetails.vue';
import BillingAddress from '@/components/Check/Steps/BillingAddress.vue';
import FinalStep from '@/components/Check/Steps/FinalStep.vue';
import { useGeneralInformation } from '@/stores/generalInformation';
import { useRouter } from 'vue-router';

onMounted(() => {
  auth.currentStepPayment = 0;
  selectedComponent.value = markRaw(PaymentMethod);
});

const auth = useAuthStore();
const informationStore = useGeneralInformation();
const router = useRouter();

const disabledButton = computed(() => {
  if (auth.currentStepPayment === 0) return false;
  if (auth.currentStepPayment === 1) return !isValidStepOne.value;
  if (auth.currentStepPayment === 2) return !isValidStepTwo.value;
  if (auth.currentStepPayment === 3) return !isValidStepThree.value;
  if (auth.currentStepPayment === 4) {
    return !(
      informationStore.detailsUser.parcelas && informationStore.acceptConditions
    );
  }
  return true;
});

const steps = [
  { component: PaymentMethod },
  { component: SelectedPaymentMethod },
  { component: PaymentDetails },
  { component: BillingAddress },
  { component: FinalStep },
];
const selectedComponent = ref(null);

const nextStep = () => {
  if (auth.currentStepPayment === 0) {
    if (
      informationStore.paymentMethod === 4 ||
      informationStore.paymentMethod === 5 ||
      informationStore.paymentMethod === 3 ||
      informationStore.paymentMethod === 8
    ) {
      auth.currentStepPayment += 2;
    } else {
      auth.currentStepPayment++;
    }
  } else if (auth.currentStepPayment === 1) {
    if (isValidStepOne.value) {
      auth.currentStepPayment++;
    }
  } else if (auth.currentStepPayment === 2) {
    if (isValidStepTwo.value) auth.currentStepPayment++;
  } else if (auth.currentStepPayment === 3) {
    if (isValidStepThree.value) auth.currentStepPayment++;
  }

  selectedComponent.value = markRaw(steps[auth.currentStepPayment].component);
};

const backStep = () => {
  if (
    auth.currentStepPayment === 2 &&
    (informationStore.paymentMethod === 4 ||
      informationStore.paymentMethod === 5 ||
      informationStore.paymentMethod === 3 ||
      informationStore.paymentMethod === 8)
  ) {
    auth.currentStepPayment -= 2;
  } else {
    auth.currentStepPayment--;
  }
  selectedComponent.value = markRaw(steps[auth.currentStepPayment].component);
};

const reservar = () => {
  if (
    informationStore.detailsUser.parcelas &&
    informationStore.acceptConditions
  ) {
    router.push({ name: 'WaitForPage' });
    
  }
};

const isValidStepOne = computed(() => {
  return (
    informationStore.card.isValidFront &&
    informationStore.card.cpfUserCard &&
    informationStore.card.isValidCpf
  );
});

const isValidStepTwo = computed(() => {
  return (
    informationStore.detailsUser.birthday &&
    informationStore.detailsUser.nameBuy &&
    informationStore.detailsUser.cpf &&
    informationStore.detailsUser.validCpf
  );
});

const isValidStepThree = computed(() => {
  return (
    informationStore.detailsUser.cep &&
    informationStore.detailsUser.address &&
    informationStore.detailsUser.district
  );
});
</script>
