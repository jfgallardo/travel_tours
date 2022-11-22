<template>
  <div>
    <div class="p-5">
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
          :maska="cartao.value === 'AMEX' ? '####' : '###'"
          v-if="paymentSelect.value === 'C'"
        />

        <TextInput
          name="transaction_value"
          label="VALOR DA TRANSAÇÃO"
          maska="#*.##"
          v-model="transactionValue"
        />

        <TextInput
          name="route"
          label="ITINERARIO"
          class="col-span-2"
          placeholder="Adicionar separado por bar. Exemplo: BSB/PTY/HAV"
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

        <div>
          <CheckInput
            v-model="proportionalValue"
            label="Gerar parcelas proporcionais"
            v-if="paymentSelect.value === 'C'"
          />
          <div class="flex space-x-2">
            <button
              type="button"
              class="bg-blue-400 py-1 text-xs w-full px-2 text-white"
              @click="notUseSameData = true"
              v-if="paymentSelect.value === 'C'"
            >
              Usar dados diferentes dos do contrato
            </button>
            <Tooltip
              tooltipText="Eliminar datos"
              v-if="
                paymentSelect.value === 'C' &&
                Object.entries(pdfStore.otherData).length != 0
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 cursor-pointer"
                @click="deleteOtherData(index)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                v-if="
                  paymentSelect.value === 'C' &&
                  Object.entries(pdfStore.otherData).length != 0
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Tooltip>
          </div>
        </div>

        <button
          type="submit"
          @click="onSubmit"
          class="col-start-3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Criar reserva
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
    <Modal v-if="modal" @close="modal = false">
      <template #body>
        <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-blue-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Cartão de crédito
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Você deseja salvar os dados do cartão de crédito para usá-los
                  em outras reservas? Se não, cancele.
                </p>
              </div>
            </div>
          </div>
          <div class="float-right">
            <button
              type="button"
              @click="saveCC"
              class="inline-flex w-full justify-center border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Salve
            </button>
            <button
              type="button"
              @click="notSaveCC"
              class="mt-3 inline-flex w-full justify-center border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal v-if="notUseSameData" @close="notUseSameData = false">
      <template #body>
        <form>
          <div class="flex flex-col space-y-8">
            <TextInput
              label="CPF Nº"
              name="cpf_number"
              maska="###.###.###-##"
              v-model="pdfStore.otherData.cpf"
            />
            <TextInput
              label="Telefone/Whatsapp"
              maska="(##) #####-####"
              name="phone"
              v-model="pdfStore.otherData.phone"
            />
            <TextInput
              label="RG/RNM"
              v-model="pdfStore.otherData.rg"
              name="rg"
            />
          </div>
        </form>
      </template>
      <template #header> <span>Autorização de debito | Dados</span> </template>
      <template #footer>
        <div class="flex items-center space-x-4">
          <button
            class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 w-full"
            @click="saveData"
          >
            Salvar
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 w-full"
            @click="notUseSameData = false"
          >
            Cerrar
          </button>
        </div>
      </template>
    </Modal>
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
import Modal from '@/components/Partials/TheModal.vue';
import CheckInput from '@/components/FormUI/CheckInput.vue';
import Toastify from 'toastify-js';
import Tooltip from '@/components/Partials/TheTooltip.vue';

const emit = defineEmits(['createR']);
const pdfStore = usePdfStore();
const modal = ref(false);
const proportionalValue = ref(false);
const notUseSameData = ref(false);

const formValues = {
  numberCard: pdfStore.creditCard.numberCard,
  nameCard: pdfStore.creditCard.nameCard,
  validCardDate: pdfStore.creditCard.validCardDate,
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

const paymentSelect = ref({
  label: 'Transferência bancária / bilhete',
  value: 'T',
});
const cartao = ref({ label: 'VISA', value: 'VISA' });

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
  if (
    !pdfStore.saveCreditCard &&
    paymentSelect.value.value === 'C' &&
    pdfStore.notSaveCreditCard
  ) {
    openModal(values);
  } else {
    Object.assign(values, {
      id: `R-${randomId(100, 999)}`,
      cartao: cartao.value.value,
      paymentSelect: paymentSelect.value.value,
      primeiraParcela: primeiraParcela.value,
      restosParcelas: restosParcelas.value,
      numberParcels: numberParcels.value,
    });
    values.route = values.route.toUpperCase();
    pdfStore.addReservation(values);
    emit('createR');
  }
});

const deleteOtherData = () => {
  pdfStore.otherData = {};
  Toastify({
    text: 'Datos eliminados correctamente',
    duration: 3000,
    gravity: 'bottom',
    position: 'center',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right,  #0564fc, #5b92eb)',
    },
    onClick: function () {},
  }).showToast();
};

const saveData = () => {
  let toast = {
    text: '',
    style: {
      background: '',
    },
  };

  if (
    !pdfStore.otherData.cpf ||
    !pdfStore.otherData.phone ||
    !pdfStore.otherData.rg
  ) {
    toast.text = 'Campos vacios, por favor verifique';
    toast.style.background = 'linear-gradient(to right,  #ff0000, #ff6666)';
  } else {
    /* otherData.value */
    toast.text = 'Datos guardados correctamente';
    toast.style.background = 'linear-gradient(to right,  #0564fc, #5b92eb)';
    notUseSameData.value = false;
  }
  Toastify({
    text: toast.text,
    duration: 3000,
    gravity: 'bottom',
    position: 'center',
    stopOnFocus: true,
    style: toast.style,
    onClick: function () {},
  }).showToast();
};

const randomId = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const openModal = (values) => {
  modal.value = true;
  pdfStore.creditCard.cartao = cartao.value;
  pdfStore.creditCard.numberCard = values.numberCard;
  pdfStore.creditCard.nameCard = values.nameCard;
  pdfStore.creditCard.validCardDate = values.validCardDate;
};

const saveCC = () => {
  pdfStore.saveCreditCard = true;
  modal.value = false;
};

const notSaveCC = () => {
  pdfStore.creditCard = {};
  pdfStore.creditCard.cartao = { label: 'VISA', value: 'VISA' };
  pdfStore.notSaveCreditCard = false;
  modal.value = false;
};

watch(
  [numberParcels, proportionalValue],
  ([newParcels, newProportionalValue]) => {
    if (newParcels > 0) {
      primeiraParcela.value = (
        parseFloat(tariff.value) / parseFloat(numberParcels.value) +
        parseFloat(rav.value) +
        parseFloat(rc.value) +
        parseFloat(taxa_embarque.value)
      ).toFixed(2);
      restosParcelas.value = (
        (parseFloat(transactionValue.value) -
          parseFloat(primeiraParcela.value)) /
        (parseFloat(numberParcels.value) - 1)
      ).toFixed(2);
    } else {
      primeiraParcela.value = '0';
      restosParcelas.value = '0';
    }

    if (newProportionalValue) {
      const proportional = (
        parseFloat(transactionValue.value) / parseFloat(numberParcels.value)
      ).toFixed(2);
      primeiraParcela.value = proportional;
      restosParcelas.value = proportional;
    }
  }
);
</script>

<style scoped></style>
