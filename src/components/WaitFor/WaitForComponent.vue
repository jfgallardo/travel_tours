<template>
  <div class="custom-container">
    <div class="flex space-x-2 p-3.5 justify-center items-center">
      <div
        class="bg-blue-600 p-2 w-4 h-4 rounded-full animate-bounce blue-circle"
      ></div>
      <div
        class="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"
      ></div>
      <div
        class="bg-red-600 p-2 w-4 h-4 rounded-full animate-bounce red-circle"
      ></div>
    </div>
    <Transition>
      <div class="mt-2.5 font-semibold text-lg">
        {{ text }}
      </div>
    </Transition>
  </div>

  <Modal v-if="modal" @close="modal = false">
    <template #header>
      <div>Pagamento necesario</div>
    </template>
    <template #body>
      <div class="font-light p-2 py-4">
        Boleto generado correctamente, por favor realize el pago.
      </div>
    </template>
    <template #footer>
      <div>
        <button
          class="float-right bg-blue-700 p-2 text-white hover:bg-blue-800"
          @click="goTicket"
        >
          Realizar pagamento
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useGeneralInformation } from '@/stores/generalInformation';
import { useAuthStore } from '@/stores/auth';
import { usePayPixStore } from '@/stores/payPix';
import { usePayBoletoStore } from '@/stores/payBoleto';
import { useRouter } from 'vue-router';
import { usePayCardStore } from '@/stores/payCard';
import { usePurchaseStore } from '@/stores/purchase.user';
import { useReserveStore } from '@/stores/reservar';

import Modal from '@/components/Partials/TheModal.vue';
import Cookies from 'js-cookie';

const informationStore = useGeneralInformation();
const auth = useAuthStore();
const pixStore = usePayPixStore();
const boletoStore = usePayBoletoStore();
const cardStore = usePayCardStore();
const router = useRouter();
const purchaseStore = usePurchaseStore();
const reserverStore = useReserveStore();

const modal = ref(false);
const ticket = ref('');

onMounted(async () => {
  if (informationStore.paymentMethod === 8) {
    await paymentPix();
  } else if (informationStore.paymentMethod === 3) {
    await paymentBoleto();
  } else if (informationStore.paymentMethod === 5) {
    text.value =
      'Registro de vuelo efectuado correctamente, dirigase a la agencia para realizar el pago.';
    router.push('/aereo');
  } else if (informationStore.paymentMethod === 1) {
    await paymentCard();
  }
});

const text = ref(
  'Aguarde, se está verificando su forma de pago, en segundos finalizamos su compra.'
);

const totalP = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  const travel_two = Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;

  if (travel_one && travel_two)
    return (travel_one.Preco + travel_two.Preco).toFixed(3) * 100;
  return travel_one.Preco.toFixed(3) * 100;
});

const voos = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  const travel_two = Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;
  return {
    travel_one,
    travel_two,
  };
});

const goTicket = () => {
  const enlace = document.createElement('a');
  enlace.href = ticket.value;
  enlace.target = '_blank';
  enlace.click();
  modal.value = false;
  saveReservation();
};

const paymentPix = async () => {
  const dataPix = {
    name: informationStore.detailsUser.nameBuy,
    cpfCnpj: informationStore.detailsUser.cpf,
    email: auth.userLogged.email,
    phone:
      informationStore.detailsUser.idd +
      informationStore.detailsUser.codeArea +
      informationStore.detailsUser.phone,
    value: informationStore.detailsUser.parcelas.value,
  };

  pixStore.paymentPix(dataPix).then(({ data }) => {
    let enlace = document.createElement('a');
    enlace.href = data.invoiceUrl.replace(/\\/g, '');
    enlace.target = '_blank';
    enlace.click();
  });
};

const paymentBoleto = async () => {
  /*  const dataBoleto = {
    name: informationStore.detailsUser.nameBuy,
    cpfCnpj: informationStore.detailsUser.cpf,
    email: auth.userLogged.email,
    phone:
      informationStore.detailsUser.idd +
      informationStore.detailsUser.codeArea +
      informationStore.detailsUser.phone,
    value: informationStore.detailsUser.parcelas.value,
  }; */

  /* boletoStore.paymentBoleto(dataBoleto).then(({ data }) => {
    let enlace = document.createElement('a');
    enlace.href = data.bankSlipUrl.replace(/\\/g, '');
    enlace.target = '_blank';
    enlace.click();
    router.push('/aereo');
  }); */

  const billing = {
    name: informationStore.detailsUser.nameBuy,
    address: {
      country: 'br',
      state: informationStore.detailsUser.state,
      city: informationStore.detailsUser.city,
      neighborhood: informationStore.detailsUser.complement,
      street: informationStore.detailsUser.address,
      street_number: informationStore.detailsUser.number,
      zipcode: informationStore.detailsUser.cep.replace(/-/g, ''),
    },
  };

  const items = [
    {
      id: 'r123',
      title: 'Reservas de vuelo',
      unit_price: parseInt(totalP.value),
      quantity: 1,
      tangible: false,
    },
  ];

  const phone_number =
    informationStore.detailsUser.codeArea + informationStore.detailsUser.phone;

  const customer = {
    external_id: '#3311',
    name: informationStore.detailsUser.nameBuy,
    type: 'individual',
    country: 'br',
    email: auth.userLogged.email,
    documents: [
      {
        type: 'cpf',
        number: informationStore.detailsUser.cpf,
      },
    ],
    phone_numbers: [`+55${phone_number.replace(/-/g, '')}`],
    birthday: informationStore.detailsUser.birthday.split('T')[0],
  };

  const body = {
    amount: parseInt(totalP.value),
    payment_method: 'boleto',
    customer,
    billing,
    items,
    installments: informationStore.detailsUser.parcelas.value,
  };

  boletoStore.paymentBoleto(body).then(({ data }) => {
    text.value = 'Generando boleto, espere por favor.';
    setTimeout(() => {
      modal.value = true;
      ticket.value = data.boleto_url;
    }, 3000);
  });
};

const paymentCard = async () => {
  const body = {
    card_number: informationStore.card.cardNumber,
    card_holder_name: informationStore.card.cardName,
    card_expiration_date: informationStore.card.cardExpiration,
    card_cvv: informationStore.card.cardSecurityCode,
  };
  // eslint-disable-next-line no-undef
  pagarme.client
    .connect({ encryption_key: 'ek_live_jZ1CyABCijg0QdCTGSUfYzeIPT9p0e' })
    .then((client) => client.security.encrypt(body))
    .then((card_hash) => {
      const billing = {
        name: informationStore.detailsUser.nameBuy,
        address: {
          country: 'br',
          state: informationStore.detailsUser.state,
          city: informationStore.detailsUser.city,
          neighborhood: informationStore.detailsUser.complement,
          street: informationStore.detailsUser.address,
          street_number: informationStore.detailsUser.number,
          zipcode: informationStore.detailsUser.cep.replace(/-/g, ''),
        },
      };

      const items = [
        {
          id: 'r123',
          title: 'Reservas de vuelo',
          unit_price: parseInt(totalP.value),
          quantity: 1,
          tangible: false,
        },
      ];

      const phone_number =
        informationStore.detailsUser.codeArea +
        informationStore.detailsUser.phone;

      const customer = {
        external_id: '#3311',
        name: informationStore.detailsUser.nameBuy,
        type: 'individual',
        country: 'br',
        email: auth.userLogged.email,
        documents: [
          {
            type: 'cpf',
            number: informationStore.detailsUser.cpf,
          },
        ],
        phone_numbers: [`+55${phone_number.replace(/-/g, '')}`],
        birthday: informationStore.detailsUser.birthday.split('T')[0],
      };

      const dataCard = {
        amount: parseInt(totalP.value),
        payment_method: 'credit_card',
        async: false,
        card_hash,
        customer,
        billing,
        items,
        installments: informationStore.detailsUser.parcelas.value,
      };

      cardStore
        .paymentCard(dataCard)
        .then(({ data }) => {
          if (data.status === 'authorized') {
            text.value = 'Tarjeta aprovada. Salvando reserva.';
            saveReservation();
          } else if (data.status === 'refused') {
            text.value = data.acquirer_response_message;
            setTimeout(() => {
              text.value =
                'Por favor, ralize la compra de su reserva nuevamente.';
              setTimeout(() => {
                router.push('/aereo');
              }, 2000);
            }, 5000);
          }
        })
        .catch();
    });

  /*  pixStore.paymentCard(dataCard).then(({ data }) => {
    let enlace = document.createElement('a');
    enlace.href = data.invoiceUrl.replace(/\\/g, '');
    enlace.target = '_blank';
    enlace.click();
    router.push('/aereo');
  }); */
};

const saveReservation = () => {
  text.value = 'Salvando datos de la reserva, aguarde por favor';
  const ida = {
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
    ValorParcelaPS: +voos.value.travel_one.Preco,
  };

  let volta = null;

  if (voos.value.travel_two) {
    volta = {
      Email: auth.userLogged?.email,
      Passageiros: passageiros(),
      Ida: { Token: voos.value.travel_two.RateToken },
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
      TokenConsultaIda: voos.value.travel_two.TokenConsultaMBX,
      IdMeioPagamento: informationStore.paymentMethod,
      ValorParcelaPS: +voos.value.travel_two.Preco,
    };
  }

  reserverStore.record({ ida: ida, volta: volta }).then(() => {
    text.value = 'Reserva realizada correctamente';
    setTimeout(() => {
      router.push('/aereo');
    }, 3000);
  });
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
      Sexo: item.sexo.value,
    };
    passengerList.push(pass);
  });
  return passengerList;
};
</script>

<style scoped>
.blue-circle {
  animation-delay: 0.1s;
}
.green-circle {
  animation-delay: 0.2s;
}
.red-circle {
  animation-delay: 0.3s;
}

.custom-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
