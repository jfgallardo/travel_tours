<template>
  <div>
    <div>
      <form class="grid grid-cols-3 gap-6">
        <Select
          label="PAYMENT TYPES"
          :selected="paymentSelect"
          :options="paymentTypes"
          class="col-span-2"
          @selectValue="
            (e) => {
              paymentSelect = e;
            }
          "
        />

        <Select
          label="CARTÃO DE CRÉDITO"
          :selected="pdfStore.creditCard.cartao"
          v-if="paymentSelect.value === 'C'"
          :options="typeCards"
          @selectValue="
            (e) => {
              cartao = e;
            }
          "
        />

        <DateInput
          label="DATA DA TRANSAÇÃO"
          name="dateTransaction"
          v-model="dateTransaction"
        />

        <TextInput
          name="numberCard"
          label="NÚMERO DO CARTÃO"
          maska="####-####-####-####"
          v-if="paymentSelect.value === 'C'"
        />

        <TextInput
          name="nameCard"
          label="NOME TITULAR"
          v-if="paymentSelect.value === 'C'"
        />

        <TextInput
          name="validCardDate"
          label="VALIDADE DO CARTÃO"
          placeholder="MM/AA"
          maska="##/##"
          v-if="paymentSelect.value === 'C'"
        />

        <TextInput
          name="securityCode"
          label="CÓDIGO DE SEGURANÇA"
          maska="####"
          v-if="paymentSelect.value === 'C'"
        />

        <TextInput
          name="route"
          label="ITINERARIO"
          class="col-span-2"
          placeholder="Adicionar separado por bar. Exemplo: BSB/PTY/HAV"
        />

        <TextInput
          name="transaction_value"
          label="VALOR DA TRANSAÇÃO"
          maska="#*.##"
          v-model="transactionValue"
        />
        <TextInput
          v-if="paymentSelect.value === 'C'"
          name="rate"
          label="TARIFA"
          maska="#*.##"
          v-model="tariff"
        />

        <TextInput
          v-if="paymentSelect.value === 'C'"
          name="rav"
          maska="#*.##"
          label="RAV/DU"
          v-model="rav"
        />

        <TextInput
          v-if="paymentSelect.value === 'C'"
          name="rc"
          label="RC"
          maska="#*.##"
          v-model="rc"
        />

        <TextInput
          v-if="paymentSelect.value === 'C'"
          name="taxa_embarque"
          maska="#*.##"
          label="TAXA DE EMBARQUE"
          v-model="taxa_embarque"
        />

        <TextInput
          v-if="paymentSelect.value === 'C'"
          name="number_plots"
          maska="##"
          label="Nº DE PARCELAS"
          v-model="numberParcels"
        />

        <button
          type="submit"
          @click="onSubmit"
          class="col-start-3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Editar reserva
        </button>

        <h6
          v-if="paymentSelect.value === 'C'"
          class="text-sm font-medium leading-tight text-gray-800"
        >
          Primera parcela
          <span
            class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded"
            >{{ primeiraParcela }}</span
          >
        </h6>
        <h6
          v-if="paymentSelect.value === 'C'"
          class="text-sm font-medium leading-tight text-gray-800"
        >
          Resto de Parcelas
          <span
            class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded"
            >{{ restosParcelas }}</span
          >
        </h6>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import TextInput from '@/components/FormUI/TextInput.vue';
import Select from '@/components/FormUI/TheSelect.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import { simpleSchemaReservation } from '@/utils/validate';
import { usePdfStore } from '@/stores/pdf';

const props = defineProps({
  itemEdit: {
    type: Object,
    default: () => {},
  },
  itemIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['editR']);
const pdfStore = usePdfStore();

const formValues = {
  dateTransaction: props.itemEdit.dateTransaction,
  numberCard: props.itemEdit.numberCard,
  nameCard: props.itemEdit.nameCard,
  validCardDate: props.itemEdit.validCardDate,
  securityCode: props.itemEdit.securityCode,
  route: props.itemEdit.route,
  transaction_value: props.itemEdit.transaction_value,
  rate: props.itemEdit.rate,
  rav: props.itemEdit.rav,
  rc: props.itemEdit.rc,
  taxa_embarque: props.itemEdit.taxa_embarque,
  number_plots: props.itemEdit.number_plots,
};

const paymentTypes = [
  { label: 'Transferência bancária / bilhete', value: 'T' },
  { label: 'Cartão de crédito', value: 'C' },
];

const typeCards = [
  { label: 'VISA', value: 'VISA' },
  { label: 'MASTERCARD', value: 'MASTERCARD' },
  { label: 'AMEX', value: 'AMEX' },
  { label: 'HIPERCARD', value: 'HIPERCARD' },
  { label: 'ELO', value: 'ELO' },
  { label: 'OUTROS', value: 'O' },
];

const paymentSelect = ref(
  props.itemEdit.paymentSelect === 'T'
    ? { label: 'Transferência bancária / bilhete', value: 'T' }
    : { label: 'Cartão de crédito', value: 'C' }
);
const cartao = ref('');

const numberParcels = ref('');
const transactionValue = ref('');
const rav = ref('');
const rc = ref('');
const tariff = ref('');
const taxa_embarque = ref('');
const dateTransaction = ref('');

const primeiraParcela = ref('');
const restosParcelas = ref('');

const { handleSubmit } = useForm({
  validationSchema: simpleSchemaReservation,
  initialValues: formValues,
});

const onSubmit = handleSubmit((values) => {
  Object.assign(values, {
    id: props.itemEdit.id,
    cartao: cartao.value.value ? cartao.value.value : props.itemEdit.cartao,
    paymentSelect: paymentSelect.value.value
      ? paymentSelect.value.value
      : props.itemEdit.paymentSelect,
    primeiraParcela: primeiraParcela.value
      ? primeiraParcela.value
      : props.itemEdit.primeiraParcela,
    restosParcelas: restosParcelas.value
      ? restosParcelas.value
      : props.itemEdit.restosParcelas,
  });
  values.route = values.route.toUpperCase();
  pdfStore.editReservation(props.itemIndex, values);
  emit('editR');
});

watch(numberParcels, async (number) => {
  if (number > 0) {
    primeiraParcela.value = (
      parseFloat(tariff.value ? tariff.value : props.itemEdit.rate) /
        parseFloat(
          numberParcels.value
            ? numberParcels.value
            : props.itemEdit.number_plots
        ) +
      parseFloat(rav.value ? rav.value : props.itemEdit.rav) +
      parseFloat(rc.value ? rc.value : props.itemEdit.rc) +
      parseFloat(
        taxa_embarque.value ? taxa_embarque.value : props.itemEdit.taxa_embarque
      )
    ).toFixed(2);
    restosParcelas.value = (
      (parseFloat(
        transactionValue.value
          ? transactionValue.value
          : props.itemEdit.transaction_value
      ) -
        parseFloat(
          primeiraParcela.value
            ? primeiraParcela.value
            : props.itemEdit.primeiraParcela
        )) /
      (parseFloat(
        numberParcels.value ? numberParcels.value : props.itemEdit.number_plots
      ) -
        1)
    ).toFixed(2);
  } else {
    primeiraParcela.value = '0';
    restosParcelas.value = '0';
  }
});
</script>

<style scoped></style>
