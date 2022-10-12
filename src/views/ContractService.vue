<template>
  <div>
    <div class="py-10 container mx-auto px-4">
      <div class="py-5">
        <form @submit.prevent="onSubmit">
          <div class="grid grid-cols-5 gap-5">
            <p class="font-semibold text-2xl text-center col-span-2">
              Contrato de Prestação de Serviços
            </p>
            <div class="col-start-4">
              <button
                class="bg-blue-700 hover:bg-blue-800 w-full text-white font-medium px-5 py-4 disabled:opacity-75"
                type="submit"
                id="createD"
              >
                Gerar documento
              </button>
            </div>
            <div>
              <button
                @click="resetForm()"
                class="bg-red-500 hover:bg-red-600 text-white w-full text-center cursor-pointer font-medium px-5 py-4"
              >
                Limpeza de dados
              </button>
            </div>
          </div>

          <div class="border relative p-5 mb-4 mt-5">
            <span
              class="absolute -top-3 left-2 bg-white px-1 font-light text-gray-400"
              >Dados do cliente</span
            >
            <div class="grid grid-cols-5 gap-7 center">
              <div>
                <TextInput name="name_client" label="Nome cliente" />
              </div>
              <div>
                <DateInput label="DATA DE VIAGEM" name="travelDate" />
              </div>
              <div>
                <TextInput name="destino_reserva" label="DESTINO RESERVA" />
              </div>
              <div>
                <TextInput name="civil_status" label="Estado civil" />
              </div>
              <div>
                <TextInput name="occupation" label="Profissão" />
              </div>
              <div>
                <Select
                  label="Situação de imigração no Brasil"
                  :selected="nationality"
                  :options="typeNationality"
                  @selectValue="
                    (e) => {
                      nationality = e;
                    }
                  "
                />
              </div>
              <div>
                <TextInput
                  name="cpf_number"
                  label="CPF Nº"
                  maska="###.###.###-##"
                />
              </div>
              <div v-if="showPassport">
                <TextInput name="passaporte" label="Passaporte" />
              </div>

              <div v-if="showRg">
                <TextInput name="rne_number" label="RG/RNM" />
              </div>

              <div>
                <TextInput
                  name="phone_number"
                  label="Telefone/Whatsapp"
                  maska="(##) #####-####"
                />
              </div>
              <div>
                <TextInput name="email" label="Email" />
              </div>

              <div>
                <TextInput
                  maska="#####-###"
                  name="cep"
                  label="CEP"
                  @onBlur="searchByCep"
                />
              </div>
              <div>
                <TextInput name="street" label="Rua" />
              </div>
              <div>
                <TextInput name="district" label="Bairro" />
              </div>
              <div class="p-4">
                <span
                  class="font-light text-gray-700 hover:text-gray-900 cursor-default"
                  >{{ searchByCepToString }}</span
                >
              </div>
            </div>
          </div>
        </form>
        <CreateReservations />
        <div class="grid grid-cols-5 gap-2">
          <CreatePassengers class="col-span-2" />
          <CreateService class="col-span-2" />
          <div class="pt-5">
            <div class="flex space-x-5">
              <p class="font-light">Documentos para baixar</p>
              <Tooltip tooltipText="Limpar">
                <span class="cursor-pointer" @click="resetContract">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </span>
              </Tooltip>
            </div>
            <div
              id="listDocuments"
              class="flex flex-col items-center space-y-2"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onUnmounted } from 'vue';
import { useForm } from 'vee-validate';
import pdfMake from 'pdfmake/build/pdfmake';
import axios from 'axios';
import { simpleSchemaContract } from '@/utils/validate';
import Select from '@/components/FormUI/TheSelect.vue';
import TextInput from '@/components/FormUI/TextInput.vue';
import CreateReservations from '@/components/ContractService/CreateReservations.vue';
import CreateService from '@/components/ContractService/CreateService.vue';
import CreatePassengers from '@/components/ContractService/CreatePassengers.vue';
import pdfCreatorDebit from '@/utils/debitPdf';
import pdfCreatorContract from '@/utils/contractPdf';
import { usePdfStore } from '@/stores/pdf';
import { useAlertStore } from '@/stores/alert';
import DateInput from '@/components/FormUI/DateInput.vue';
import Tooltip from '@/components/Partials/TheTooltip.vue';

onUnmounted(() => {
  pdfStore.rebootInfo();
});

const typeNationality = [
  { name: 'Brasileiro(a)', value: 'Brasileiro(a)' },
  { name: 'Naturalizado(a)', value: 'Brasileiro(a) naturalizado(a)' },
  { name: 'Refugiado', value: 'Refugiado' },
  { name: 'Residente', value: 'Residente' },
  { name: 'Pessoa não imigrante', value: 'Pessoa não imigrante' },
  { name: 'Imigrante', value: 'Imigrante' },
];

const nationality = ref({ name: 'Brasileiro(a)', value: 'Brasileiro(a)' });
const localidadeCl = ref('');
const ufCl = ref('');
const cartao = ref('V');
const pdfStore = usePdfStore();
const alertStore = useAlertStore();

const pdfsDebit = ref([]);

const searchByCep = (value) => {
  if (value.length === 9) {
    axios
      .get(`https://viacep.com.br/ws/${value}/json/`)
      .then((response) => {
        const { localidade, uf, erro } = response.data;
        if (!erro) {
          localidadeCl.value = localidade;
          ufCl.value = uf;
        } else {
          localidadeCl.value = '';
          ufCl.value = '';
        }
      })
      .catch(() => {});
  }
};

const showPassport = computed(() => {
  if (
    nationality.value.value === 'Pessoa não imigrante' ||
    nationality.value.value === 'Imigrante'
  ) {
    return true;
  }
  return false;
});

const showRg = computed(() => {
  if (
    nationality.value.value === 'Pessoa não imigrante' ||
    nationality.value.value === 'Imigrante'
  ) {
    return false;
  }
  return true;
});

const searchByCepToString = computed(() => {
  if (localidadeCl.value && ufCl.value) {
    return `${localidadeCl.value} / ${ufCl.value}`;
  }
  return '';
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: simpleSchemaContract,
});

const passageiros = reactive([]);
const destinasePagamento = reactive([]);

const onSubmit = handleSubmit((values) => {
  const mgsPayload = {
    message: 'Deve haver pelo menos um dado adicionado em cada tabela',
    backgrColor: 'bg-red-100',
    textColor: 'text-red-700',
  };
  if (
    !pdfStore.passengers.length ||
    !pdfStore.services.length ||
    !pdfStore.reservations.length
  ) {
    alertStore.showMsg(mgsPayload);
    return;
  }

  pdfMake.fonts = {
    Roboto: {
      normal:
        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics:
        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics:
        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
  };

  Object.assign(values, {
    nationality: nationality.value.value,
    localidadeCl: localidadeCl.value,
    ufCl: ufCl.value,
  });

  const contract = pdfCreatorContract(values);
  generateDocument(
    contract,
    `Contrato de Serviços de Turismo_${values.name_client}`
  );

  pdfStore.reservations.forEach((element, index) => {
    if (element.paymentSelect === 'C') {
      const doc = pdfCreatorDebit({ ...values, ...element });
      generateDocument(doc, `Autorização de Débito_${element.route}`);
    }
  });
});

const generateDocument = (doc, name) => {
  const pdfDocGenerator = pdfMake.createPdf(doc);
  pdfDocGenerator.getDataUrl((dataUrl) => {
    const targetElement = document.getElementById('listDocuments');
    const buttonSubmit = document.getElementById('createD');
    const link = document.createElement('a');
    const aTexto = document.createTextNode(name);
    link.appendChild(aTexto);
    link.setAttribute('class', 'text-blue-500 mt-10 cursor-pointer');
    targetElement.appendChild(link);
    buttonSubmit.setAttribute('disabled', true);

    link.onclick = function () {
      pdfMake.createPdf(doc).open();
    };
  });
};

const resetContract = () => {
  const buttonSubmit = document.getElementById('createD');
  const targetElement = document.getElementById('listDocuments');

  buttonSubmit.removeAttribute('disabled');
  while (targetElement.firstChild) {
    targetElement.removeChild(targetElement.firstChild);
  }
};
</script>

<style scoped></style>
