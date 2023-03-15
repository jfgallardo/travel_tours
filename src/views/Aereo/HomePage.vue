<template>
  <LayoutTwoViews>
    <template #aside>
      <ButtonTravel @selected-button="changeTab" />
      <div>
        <transition name="fade" mode="out-in">
          <component :is="selectedComponent"></component>
        </transition>
      </div>
    </template>

    <template #main>
      <RouterView />
    </template>
  </LayoutTwoViews>
</template>

<script setup>
import { ref, markRaw, onMounted, inject } from 'vue';
import { RouterView } from 'vue-router';
import RoundTrip from '@/components/Aereo/RoundTripForm.vue';
import ManyCities from '@/components/Aereo/ManyCitiesForm.vue';
import OneWay from '@/components/Aereo/OneWayForm.vue';
import LayoutTwoViews from '@/layouts/LayoutTwoViews.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import ButtonTravel from '@/components/Partials/ButtonTravel.vue';
import { useUserStore } from "@/stores/user";
import { usePassengerStore } from "@/stores/passengerInformation";

const storeSearch = useSearchOptionsVooStore();
const userStore = useUserStore();
const passengerStore = usePassengerStore();
const $cookies = inject('$cookies');

onMounted(() => {
  storeSearch.$reset();
  passengerStore.$reset();
  userStore.resetState();
  if ($cookies.isKey('dataSearch')) setData();
});

let selectedComponent = ref(null);
const selectComponent = ref({
  RoundTrip: RoundTrip,
  ManyCities: ManyCities,
  OneWay: OneWay,
});

const changeTab = (e) => {
  selectedComponent.value = markRaw(selectComponent.value[e]);
};

const setData = () => {
  const search = $cookies.get('dataSearch');
  storeSearch.dateOfDeparture = search.dateOfDeparture || '';
  storeSearch.dateOfReturn = search.dateOfReturn || '';
  storeSearch.origin = search.origin || { label: '', iata: '' };
  storeSearch.destiny = search.destiny || { label: '', iata: '' };
  storeSearch.cabin = search.cabin;
  storeSearch.adults = search.adults;
  storeSearch.teenagers = search.teenagers;
  storeSearch.babies = search.babies;
  storeSearch.onlyBaggage = search.onlyBaggage;
  storeSearch.quantidadeDeVoos = search.quantidadeDeVoos;
  storeSearch.apenasVoosDiretos = search.apenasVoosDiretos;
  storeSearch.multiplosTrechos = search.multiplosTrechos || [
    {
      departureDate: '',
      destino: {
        string: '',
        iata: '',
      },
      origem: {
        string: '',
        iata: '',
      },
    },
    {
      departureDate: '',
      destino: {
        string: '',
        iata: '',
      },
      origem: {
        string: '',
        iata: '',
      },
    },
  ];
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.button-float {
  position: fixed !important;
  bottom: 80px;
  right: 25px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
