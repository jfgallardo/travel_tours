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
import { ref, markRaw, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Cookies from 'js-cookie';
import RoundTrip from '@/components/Aereo/RoundTripForm.vue';
import ManyCities from '@/components/Aereo/ManyCitiesForm.vue';
import OneWay from '@/components/Aereo/OneWayForm.vue';
import LayoutTwoViews from '@/layouts/LayoutTwoViews.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import ButtonTravel from '@/components/Partials/ButtonTravel.vue';
import { usePurchaseStore } from '@/stores/purchase.user';
import { useGeneralInformation } from '@/stores/generalInformation';

const storeSearch = useSearchOptionsVooStore();
const informationGeral = useGeneralInformation();
const purchaseStore = usePurchaseStore();

onMounted(() => {
  //storeSearch.$reset();
  informationGeral.$reset();
  purchaseStore.$reset();
  if (Cookies.get('I')) Cookies.remove('I');
  if (Cookies.get('V')) Cookies.remove('V');
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
