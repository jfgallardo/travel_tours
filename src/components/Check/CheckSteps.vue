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
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
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
import { useReserveStore } from '@/stores/reservar';
import { usePurchaseStore } from '@/stores/purchase.user';
import { useDateToJson } from '@/composables/dateToJson';

onMounted(() => {
  auth.currentStepPayment = 0;
  selectedComponent.value = markRaw(PaymentMethod);
});

const auth = useAuthStore();
const informationStore = useGeneralInformation();
const reserverStore = useReserveStore();
const purchaseStore = usePurchaseStore();

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
    if (informationStore.paymentMethod === 1) {
      auth.currentStepPayment++;
    } else {
      return;
    }
  } else if (auth.currentStepPayment === 1) {
    if (isValidStepOne.value) auth.currentStepPayment++;
  } else if (auth.currentStepPayment === 2) {
    if (isValidStepTwo.value) auth.currentStepPayment++;
  } else if (auth.currentStepPayment === 3) {
    if (isValidStepThree.value) auth.currentStepPayment++;
  }

  selectedComponent.value = markRaw(steps[auth.currentStepPayment].component);
};

const backStep = () => {
  auth.currentStepPayment--;
  selectedComponent.value = markRaw(steps[auth.currentStepPayment].component);
};

const reservar = () => {
  const body = {
    IdentificacaoDaViagem: 'KeyPorAveriguar',
    Passageiros: passageiros(),
    Pagamento: {
      CartaoDeCredito: creditCard(),
    },
  };

  reserverStore
    .bookFlight(body)
    .then(() => {})
    .catch(() => {});
};

const passageiros = () => {
  let passengerList = [];
  purchaseStore.informationAdults.forEach((item, index) => {
    const hasBaby = !!purchaseStore.informationBabies?.[index];
    const baby = purchaseStore.informationBabies?.[index];
    const pass = {
      CPF: item.cpf_number,
      Passaporte: {
        Nacionalidade: item.countryResidence,
        Numero: item.passportNumber,
        PaisEmissor: item.countryIssue,
        Validade: useDateToJson(item.validateDate),
      },
      Email: item.email,
      Nascimento: item.birthday,
      Nome: item.name,
      Sobrenome: item.last_name,
      PossuiBebe: hasBaby,
      ...(hasBaby ? { InfPassaporte: passportBabie(baby) } : {}),
      ...(hasBaby ? { InfantilNascimento: baby?.birthday } : {}),
      ...(hasBaby ? { InfantilNome: baby?.name } : {}),
      ...(hasBaby ? { InfantilSobrenome: baby?.last_name } : {}),
    };
    passengerList.push(pass);
  });
  return passengerList;
};

const creditCard = () => {
  const financingPlan = informationStore.info.PlanosDeFinanciamento.find(
    (o) => o.Bandeira === informationStore.card.bainderaSelected.value
  );
  const { card } = informationStore;

  return {
    Bandeira: financingPlan.Bandeira,
    CodigoDeSeguranca: card.cardSecurityCode,
    FinanciamentoId: card.planDeFinanciamento.Id,
    Numero: card.cardNumber,
    Parcelas: card.planDeFinanciamento.Parcelas,
    Tipo: card.cardType,
    TitularCPF: card.cpfUserCard,
    TitularNome: card.cardName,
    Validade: card.cardExpiration,
  };
};

const passportBabie = (baby) => {
  return {
    Nacionalidade: baby?.countryResidence,
    Numero: baby?.passportNumber,
    PaisEmissor: baby?.countryIssue,
    Validade: useDateToJson(baby?.validateDate),
  };
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
    informationStore.detailsUser.sexo
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
