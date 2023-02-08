<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 lg:w-1/2 md:w-auto w-full"
    >
      <div class="flex flex-col space-y-6 lg:space-y-0 lg:flex-row w-full lg:space-x-2.5">
        <TheSelect
          label="Credit Card"
          class="lg:w-1/2 w-full"
          :loading="rateStore.loading"
          :options="planosDeFinanciamento"
          @selectValue="auth.card.bainderaSelected = $event"
        />
        <TextInput
          v-model="auth.card.cardNumber"
          label="Numero de Cartão *"
          name="number-card"
          maska="#### #### #### ####"
          :text-r="auth.card.cardType"
          class="lg:w-1/2 w-full"
        />
        <TextInput
          v-model="auth.card.cardSecurityCode"
          label="Codigo de Segurança"
          name="cvc"
          maska="####"
          class="lg:w-1/4 w-full"
        />
      </div>

      <div class="flex w-full space-y-6 lg:space-y-0 flex-col lg:flex-row lg:space-x-2.5">
        <TextInput
          v-model="auth.card.cardName"
          label="Nome (Igual ao do cartão) *"
          name="card-name"
          class="lg:w-1/2 w-full"
        />
        <TextInput
          v-model="auth.card.cpfUserCard"
          label="CPF *"
          maska="###.###.###-##"
          name="number-cpf"
          class="lg:w-1/2 w-full"
        />
        <TextInput
          v-model="auth.card.cardExpiration"
          label="Data de Vencimento *"
          name="expiration"
          :maska="['##/##', '##/####']"
          class="lg:w-1/4 w-full"
        />
      </div>
    </div>
    <div
      class="px-3 py-2.5 text-white font-bold w-fit mx-auto"
      :class="creditCardVariant"
    >
      {{ creditCardMessage }}
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import validateInfo from '@/plugins/validate-card';
import TheSelect from '@/components/FormUI/TheSelect.vue';
import { useRateStore } from '@/stores/rate';
import { useUserStore } from '@/stores/user';

const auth = useAuthStore();
const creditCardMessage = ref();
const creditCardVariant = ref();
const userStore = useUserStore();
const rateStore = useRateStore();
const $cookies = inject('$cookies');
const planosDeFinanciamento = ref([]);

onMounted(() => {
  tarifar();
});

watch(auth.card, (newValue) => {
  const values = {
    cardNumber: newValue.cardNumber,
    cardExpiration: newValue.cardExpiration,
    cardSecurityCode: newValue.cardSecurityCode,
    cardName: newValue.cardName,
  };
  let creditCard = validateInfo(values);
  creditCardMessage.value = creditCard.message;
  auth.card.cardType = creditCard.niceType;
  creditCardVariant.value = creditCard.variant;
  auth.card.isValidFront = creditCard.variant === 'bg-green-400'
});

const tarifar = () => {
  rateStore.loading = true;
  const body = {
    ViagemIda: userStore.vooSelected.Id.toString(),
    IdentificacaoDaViagem: $cookies.get('vooSelectedKey'),
    RetornarPlanoDeFinanciamento: true,
    TarifarMelhorPreco: true,
    TarifarMelhorFamilia: true,
  };
  rateStore
    .tarifar(body)
    .then(({ data }) => {
      const planos = data.data.PlanosDeFinanciamento;
      planosDeFinanciamento.value = planos.map((o) => {
        const bandeira = o.Bandeira;
        return {
          label: rateStore.bandeiras[bandeira]
            ? rateStore.bandeiras[bandeira]
            : 'Otra',
          value: o.Bandeira,
        };
      });
      rateStore.loading = false;
    })
    .catch(() => {
      rateStore.loading = false;
    });
};
</script>

<style scoped></style>
