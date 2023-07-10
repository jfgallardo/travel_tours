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
import Cookies from 'js-cookie';
import { useAlertStore } from '@/stores/alert';
import { useRouter } from 'vue-router';

onMounted(() => {
  auth.currentStepPayment = 0;
  selectedComponent.value = markRaw(PaymentMethod);
});

const auth = useAuthStore();
const informationStore = useGeneralInformation();
const reserverStore = useReserveStore();
const purchaseStore = usePurchaseStore();
const alertStore = useAlertStore();
const router = useRouter();

const steps = [
  { component: PaymentMethod },
  { component: SelectedPaymentMethod },
  { component: PaymentDetails },
  { component: BillingAddress },
  { component: FinalStep },
];
const selectedComponent = ref(null);

const voos = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  const travel_two = Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;
  return {
    travel_one,
    travel_two,
  };
});

const nextStep = () => {
  if (auth.currentStepPayment === 0) {
    if (
      informationStore.paymentMethod === 4 ||
      informationStore.paymentMethod === 5
    ) {
      auth.currentStepPayment +=2;
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
  if (
    informationStore.detailsUser.parcelas &&
    informationStore.acceptConditions
  ) {
    const body = {
      Email: auth.userLogged?.email,
      Passageiros: passageiros(),
      Ida: { Token: voos.value.travel_one.RateToken },
      pagante: {
        name: informationStore.detailsUser.nameBuy,
        address: {
          street: informationStore.detailsUser.district,
          number: informationStore.detailsUser.number,
          zipcode: informationStore.detailsUser.cep,
          neighborhood: informationStore.detailsUser.address,
          city: informationStore.detailsUser.city,
          state: informationStore.detailsUser.state,
          country: 'Brasil',
        },
        phones: [
          {
            DDD: String(informationStore.detailsUser.codeArea),
            DDI: '55',
            number: String(informationStore.detailsUser.phone),
          },
        ],
        Nascimento: informationStore.detailsUser.birthday,
      },
      TokenConsultaIda: voos.value.travel_one.TokenConsultaMBX,
      IdMeioPagamento: informationStore.paymentMethod,
      ValorParcelaPS: +informationStore.detailsUser.parcelas.value,
    };
    reserverStore
      .record(body)
      .then(() => {
        alertStore.showMsg({
          message: 'Datos guardados correctamente. De ser su primera compra recibirá un email.',
          backgrColor: 'blue',
          textColor: 'blue',
        });
        router.push('/aereo');
      })
      .catch(() => {
        alertStore.showMsg({
          message: 'Intente de nuevo, por favor.',
          backgrColor: 'red',
          textColor: 'red',
        });
      });
  }
};

const passageiros = () => {
  let passengerList = [];
  purchaseStore.informationAdults.forEach((item) => {
    const pass = {
      CPF: item.cpf_number || '',
      PaisResidencia: item.countryResidence || '',
      EmissaoDocumento: item.validateDate || '',
      PaisEmissor: item.countryIssue || '',
      NumeroDocumento: item.passportNumber || '',
      TipoDocumento: item.documentSelected.label,
      Email: item.email,
      DDI: '55',
      DDD: String(item.mainPhone.match(/\((\d+)\)/)[1]),
      Telefone: String(item.mainPhone.replace(/\(\d+\)/, '')),
      Nascimento: item.birthday,
      Nome: item.name,
      Sobrenome: item.last_name,
      Sexo: item.sexo,
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
    informationStore.detailsUser.nameBuy
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
