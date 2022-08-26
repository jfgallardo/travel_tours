<template>
  <div>
    <div
      class="flex flex-col items-center justify-center px-4 py-8 mx-auto space-y-4"
    >
      <div class="font-bold text-lg">
        AUTORIZAÇÃO DE DÉBITO EM CARTÃO DE CRÉDITO
      </div>

      <div class="space-y-9">
        <Form
          @submit="onSubmit"
          v-slot="{ setFieldValue, values }"
          :initial-values="formValues"
        >
          <div class="grid grid-cols-4 grid-rows-4 gap-6">
            <Select
              label="CARTÃO DE CRÉDITO"
              class="col-span-2"
              :options="options"
              @selectValue="
                (e) => {
                  cartao = e.value;
                }
              "
            />

            <button
              class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-4"
            >
              Gerar documento
            </button>

            <button
              type="reset"
              class="bg-red-500 hover:bg-red-600 text-white text-center cursor-pointer font-medium px-5 py-4"
            >
              Limpeza de dados
            </button>

            <TextInput
              nameValue="numberCard"
              rulesValue="required|digitsCard"
              label="NÚMERO DO CARTÃO"
              maska="####-####-####-####"
            />
            <TextInput
              nameValue="nameCard"
              rulesValue="required|alpha_spaces"
              label="NOME TITULAR"
            />
            <TextInput
              nameValue="validCardDate"
              rulesValue="required|validCard"
              label="VALIDADE DO CARTÃO"
              placeholder="MM/AA"
              maska="##/##"
            />

            <TextInput
              nameValue="codeCard"
              rulesValue="required"
              label="CVV/CVC"
              maska="####"
            />

            <TextInput
              nameValue="cpfNumber"
              rulesValue="required|cpfNumber"
              class="col-span-2"
              label="CPF Nº"
              maska="###.###.###-##"
            />
            <TextInput
              nameValue="rneNumber"
              class="col-span-2"
              label="RG/RNM"
            />

            <TextInput
              nameValue="phoneNumber"
              rulesValue="required|phone"
              class="col-span-2"
              label="TELEFONE"
              maska="(##) #####-####"
            />
            <TextInput
              nameValue="transactionValue"
              rulesValue="required"
              label="VALOR DA TRANSAÇÃO"
              maska="#*.##"
            />

            <TextInput
              nameValue="dataTransacao"
              rulesValue="required|invaliDate"
              label="DATA DA TRANSAÇÃO"
              typeValue="date"
            />

            <TextInput
              nameValue="valorPrimeiraParcela"
              rulesValue="required|minValue:transactionValue"
              class="col-span-2"
              label="VALOR DE PRIMEIRA PARCELA"
              maska="#*.##"
            />
            <TextInput
              nameValue="numberParcela"
              maska="##"
              rulesValue="required"
              label="Nº DE PARCELAS"
              @input="
                setFieldValue(
                  'restosParcelas',
                  calculate(
                    values.transactionValue,
                    values.valorPrimeiraParcela,
                    values.numberParcela
                  )
                )
              "
            />
            <TextInput
              nameValue="restosParcelas"
              rulesValue="required"
              label="RESTOS DE PARCELAS"
            />
          </div>
        </Form>

        <div class="grid grid-cols-2 grid-rows-1 gap-4">
          <div>
            <Form @submit="addPassageiro">
              <div class="flex">
                <TextInput
                  nameValue="inputPassageiros"
                  rulesValue="required"
                  class="basis-4/5"
                  label="Passageiros"
                />
                <button
                  class="basis-1/5 bg-blue-700 hover:bg-blue-800 cursor-pointer text-center text-white"
                >
                  Adicionar
                </button>
              </div>
              <ul class="py-5">
                <TransitionGroup>
                  <li v-for="(passageiro, index) in passageiros" :key="index">
                    <div class="flex items-center justify-between px-3">
                      <span>Nome: {{ passageiro.name }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 cursor-pointer"
                        @click="deletePassageiro(index)"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </li>
                </TransitionGroup>
              </ul>
            </Form>
          </div>

          <div>
            <Form @submit="addDestinasePagamento">
              <div class="flex">
                <TextInput
                  nameValue="inputdestinasePagamento"
                  rulesValue="required"
                  class="basis-4/5"
                  label="Autorização destina-se ao pagamento de"
                />
                <button
                  class="basis-1/5 bg-blue-700 hover:bg-blue-800 cursor-pointer text-center text-white"
                >
                  Adicionar
                </button>
              </div>
              <ul class="py-5">
                <TransitionGroup>
                  <li v-for="(item, index) in destinasePagamento" :key="index">
                    <div class="flex items-center justify-between px-3">
                      <span>{{ item.value }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 cursor-pointer"
                        @click="deletePagamento(index)"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </li>
                </TransitionGroup>
              </ul>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import TextInput from "@/components/FormUI/TextInput.vue";
import Select from "@/components/FormUI/TheSelect.vue";
import pdfMake from "pdfmake/build/pdfmake";
import pdfCreator from "@/utils/debit-generator-pdf";
import { reactive, ref } from "vue";

const options = [
  {
    name: "VISA",
    value: "V",
    src: "https://cdn1.iconfinder.com/data/icons/picons-social/57/social_visa_round-512.png",
  },
  {
    name: "MASTERCARD",
    value: "M",
    src: "https://img.caminofinancial.com/wp-content/uploads/2019/08/22155232/%C3%ADcono-con-dos-tarjetas-de-cr%C3%A9dito.webp",
  },
  {
    name: "AMEX",
    value: "A",
    src: "https://thumbs.dreamstime.com/b/credit-card-blue-round-flat-design-vector-icon-isolated-white-background-bank-finance-illustration-eps-179946186.jpg",
  },
  {
    name: "OTROS",
    value: "O",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT54I_iKsD4Ub9mTPoUK3JrDefB6FAavrfZ-Q&usqp=CAU",
  },
];

const cartao = ref("V");
const passageiros = reactive([]);
const destinasePagamento = reactive([]);

const addPassageiro = (value, { resetForm }) => {
  passageiros.push({ name: value.inputPassageiros });
  resetForm();
};

const addDestinasePagamento = (value, { resetForm }) => {
  destinasePagamento.push({ value: value.inputdestinasePagamento });
  resetForm();
};

const deletePagamento = (index) => {
  destinasePagamento.splice(index, 1);
};
const deletePassageiro = (index) => {
  passageiros.splice(index, 1);
};

const onSubmit = (values, actions) => {
  destinasePagamento.push({
    value: `Quantidade de passageiros: ${passageiros.length}`,
  });

  const doc = pdfCreator(
    passageiros,
    destinasePagamento,
    Object.assign(values, { cartao: cartao.value })
  );
  pdfMake.fonts = {
    Roboto: {
      normal:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
      bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
      italics:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
      bolditalics:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
    },
  };
  pdfMake.createPdf(doc).open();
  destinasePagamento.length = 0;

  actions.setValues({
    numberCard: values.numberCard,
    nameCard: values.nameCard,
    validCardDate: values.validCardDate,
    cpfNumber: values.cpfNumber,
    rneNumber: values.rneNumber,
    phoneNumber: values.phoneNumber,
    transactionValue: "",
    dataTransacao: "",
    valorPrimeiraParcela: "",
    numberParcela: "",
    restosParcelas: "",
  });
};

const calculate = (transactionValue, valorPrimeiraParcela, numberParcela) => {
  if (!transactionValue || !valorPrimeiraParcela || numberParcela < 2)
    return "";
  return (
    (parseFloat(transactionValue) - parseFloat(valorPrimeiraParcela)) /
    (parseFloat(numberParcela) - 1)
  ).toFixed(2);
};

const formValues = {
  transactionValue: "0",
  rneNumber: "",
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
