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
        :disabled="
          !informationStore.card.isValidFront && auth.currentStepPayment === 1
        "
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10 disabled:bg-blue-400 disabled:cursor-not-allowed"
        @click="nextStep"
      >
        Proximo
      </button>
      <button
        v-if="auth.currentStepPayment === 4"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
        @click.prevent="reservar"
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
import { useAlertStore } from '@/stores/alert';
import { useGeneralInformation } from '@/stores/generalInformation';
import { useReserveStore } from '@/stores/reservar';
import { useUserStore } from '@/stores/user';
import { usePassengerStore } from '@/stores/purchase.user';
import { useDateToJson } from '@/composables/dateToJson';

onMounted(() => {
  selectedComponent.value = markRaw(PaymentMethod);
});

const auth = useAuthStore();
const alertStore = useAlertStore();
const informationStore = useGeneralInformation();
const reserverStore = useReserveStore();
const userStore = useUserStore();
const passangerStore = usePassengerStore();

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
    if (!informationStore.card.isValidFront) {
      return;
    } else if (!values['number-cpf']) {
      setFieldError('number-cpf', 'CPF é obrigatório');
    } else if (
      informationStore.card.bainderaSelected.label !==
      informationStore.card.cardType
    ) {
      alertStore.showMsg({
        message: 'Tipo de tarjea seleccionada invalida',
        backgrColor: 'bg-red-100',
        textColor: 'text-red-700',
      });
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

const reservar = () => {
  const body = {
    IdentificacaoDaViagem: userStore.vooSelected.Key,
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
  passangerStore.informationAdults.forEach((item, index) => {
    const hasBaby = !!passangerStore.informationBabies?.[index];
    const baby = passangerStore.informationBabies?.[index];
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
  console.log('passengerList', passengerList);
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
</script>
