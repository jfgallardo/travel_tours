<template>
  <div v-if="loading">

  </div>
  <div v-else>
    <p>Datos salvos correctamente. Por favor pongase en contacto con MRTravel</p>
  </div>
</template>

<script setup>
import { useReserveStore } from '@/stores/reservar';
import { usePurchaseStore } from '@/stores/purchase.user';
import { computed, onMounted, ref } from "vue";
import Cookies from 'js-cookie';

onMounted(() => {
  record();
})

const reserverStore = useReserveStore();
const purchaseStore = usePurchaseStore();
const loading = ref(false);

const voos = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  const travel_two = Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;
  return {
    travel_one,
    travel_two,
  };
});

const record = async () => {
  loading.value = true;
  if (purchaseStore.informationAdults.length) await recordAdultData();
  if (purchaseStore.informationTeenagers.length) await recordChildData();
  if (purchaseStore.informationBabies.length) await recordBabyData();
  loading.value = false
};

const recordAdultData = () => {
  purchaseStore.informationAdults.forEach((item) => {
    const body = {
      Adultos: 1,
      Criancas: 0,
      Bebes: 0,
      IdStatus: 1,
      IdMeioPagamento: 1,
      IdPedidoTipo: 1,
      IdStatusPagamento: 1,
      Passageiro: {
        Nome: item.name,
        Sobrenome: item.last_name,
        Nascimento: item.birthday,
        Rg: item.rg || '',
        Cpf: item.cpf_number,
        Passaporte: item.passportNumber || '',
        Sexo: item.sex || '',
        ValidadePassaporte: item.dateIssue || '',
        PaisEmissor: item.countryIssue || '',
      },
      Viagem: [oneWayTrip(), returnTrip()],
    };
    reserverStore.record(body)
  });
};

const recordChildData = () => {
  purchaseStore.informationTeenagers.forEach((item) => {
    const body = {
      Adultos: 0,
      Criancas: 1,
      Bebes: 0,
      IdStatus: 1,
      IdMeioPagamento: 1,
      IdPedidoTipo: 1,
      IdStatusPagamento: 1,
      Passageiro: {
        Nome: item.name,
        Sobrenome: item.last_name,
        Nascimento: item.birthday,
        Rg: item.rg || '',
        Cpf: item.cpf_number,
        Passaporte: item.passportNumber || '',
        Sexo: item.sex || '',
        ValidadePassaporte: item.dateIssue || '',
        PaisEmissor: item.countryIssue || '',
      },
      Viagem: [oneWayTrip(), returnTrip()],
    };
    reserverStore.record(body)
  });
};

const recordBabyData = () => {
  purchaseStore.informationBabies.forEach((item) => {
    const body = {
      Adultos: 0,
      Criancas: 0,
      Bebes: 1,
      IdStatus: 1,
      IdMeioPagamento: 1,
      IdPedidoTipo: 1,
      IdStatusPagamento: 1,
      Passageiro: {
        Nome: item.name,
        Sobrenome: item.last_name,
        Nascimento: item.birthday,
        Rg: item.rg || '',
        Cpf: item.cpf_number,
        Passaporte: item.passportNumber || '',
        Sexo: item.sex || '',
        ValidadePassaporte: item.dateIssue || '',
        PaisEmissor: item.countryIssue || '',
      },
      Viagem: [oneWayTrip(), returnTrip()],
    };
    reserverStore.record(body)
  });
};

const oneWayTrip = () => {
  return {
    Ida: 1,
    IdCia: 1300,
    Trecho: voos.value.travel_one.Voos.map(item => item)
  };
};

const returnTrip = () => {
  return {
    Ida: 2,
    IdCia: 1300,
    Trecho: voos.value.travel_two.Voos.map(item => item),
  };
};
</script>

<style scoped></style>
