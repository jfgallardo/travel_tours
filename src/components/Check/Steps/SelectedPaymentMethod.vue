<template>
  <div class="relative">
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 md:w-auto w-full"
    >
      <div
        class="flex flex-col space-y-6 lg:space-y-0 lg:flex-row w-full lg:space-x-2.5"
      >
        <TheSelect
          label="Credit Card"
          class="lg:w-1/3 w-full"
          :loading="rateStore.loading"
          :options="planosDeFinanciamento"
          :selected="informationStore.card.bainderaSelected"
          @select-value="informationStore.card.bainderaSelected = $event"
        />
        <InputGeneric
          v-model="informationStore.card.cardNumber"
          v-nc-mask
          label="Numero de Cartão *"
          name="number-card"
          :text-r="informationStore.card.cardType"
          class="lg:w-1/3 w-full"
        />
        <InputGeneric
          v-model="informationStore.card.cardSecurityCode"
          v-cvc-mask
          label="Codigo de Segurança *"
          name="cvc"
          class="lg:w-1/3 w-full"
        />
      </div>

      <div
        class="flex w-full space-y-6 lg:space-y-0 flex-col lg:flex-row lg:space-x-2.5"
      >
        <InputGeneric
          v-model="informationStore.card.cardName"
          label="Nome (Igual ao do cartão) *"
          name="card-name"
          class="lg:w-1/3 w-full"
        />
        <InputGeneric
          v-model="informationStore.card.cpfUserCard"
          v-cpf-mask
          label="CPF *"
          name="number-cpf"
          class="lg:w-1/3 w-full"
          :validations="validations.cpf"
          @is-valid="informationStore.card.isValidCpf = $event"
        />
        <InputGeneric
          v-model="informationStore.card.cardExpiration"
          v-expiration-mask
          label="Data de Vencimento *"
          name="expiration"
          class="lg:w-1/3 w-full"
        />
      </div>
    </div>
    <div
      class="px-3 py-2.5 text-white font-bold w-full absolute top-0 opacity-90"
      :class="creditCardVariant"
    >
      {{ creditCardMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue';
import validateInfo from '@/plugins/validate-card';
import TheSelect from '@/components/FormUI/TheSelect.vue';
import { useRateStore } from '@/stores/rate';
import { useGeneralInformation } from '@/stores/generalInformation';
import Cookies from 'js-cookie';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';
import { cpfValidation } from '@/utils/validations';

const creditCardMessage = ref();
const creditCardVariant = ref();
const rateStore = useRateStore();
const informationStore = useGeneralInformation();
const $cookies = inject('$cookies');
const planosDeFinanciamento = ref([]);

onMounted(() => {
  if (platform.value === 1) {
    planosDeFinanciamento.value = [
      { label: 'Visa', value: 1 },
      { label: 'Mastercard', value: 3 },
      { label: 'Elo', value: 7 },
    ];
  } else {
    tarifar();
  }
});

watch(
  informationStore.card,
  (newValue) => {
    const values = {
      cardNumber: newValue.cardNumber,
      cardExpiration: newValue.cardExpiration,
      cardSecurityCode: newValue.cardSecurityCode,
      cardName: newValue.cardName,
    };
    let creditCard = validateInfo(values);
    creditCardMessage.value = creditCard.message;
    informationStore.card.cardType = creditCard.niceType;
    creditCardVariant.value = creditCard.variant;

    if (creditCard.niceType !== informationStore.card.bainderaSelected.label) {
      creditCardMessage.value =
        'Seleccion de tarjeta y tarjeta digitada no coinciden';
      creditCardVariant.value = 'bg-red-400';
      informationStore.card.isValidFront = false;
    }
    informationStore.card.isValidFront =
      creditCard.variant === 'bg-green-400' &&
      creditCard.niceType === informationStore.card.bainderaSelected.label;
  },
  { immediate: true }
);

const platform = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  return travel_one.Platform;
});

const tarifar = () => {
  rateStore.loading = true;
  const body = {
    ViagemIda: 'KEY POR AVERIGUAR',
    IdentificacaoDaViagem: $cookies.get('vooSelectedKey'),
    RetornarPlanoDeFinanciamento: true,
    TarifarMelhorPreco: true,
    TarifarMelhorFamilia: true,
  };
  rateStore
    .tarifar(body)
    .then(({ data }) => {
      const planos = data.data.Data.PlanosDeFinanciamento;
      planosDeFinanciamento.value = planos.map((o) => {
        if (o.Bandeira) {
          const bandeira = o.Bandeira;
          return {
            label: rateStore.bandeiras[bandeira],
            value: o.Bandeira,
          };
        }
      });
      informationStore.info = data.data.Data;
      rateStore.loading = false;
    })
    .catch(() => {
      rateStore.loading = false;
    });
};

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
