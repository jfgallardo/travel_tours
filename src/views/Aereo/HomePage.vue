<template>
  <LayoutTwoViews>
    <template #aside>
      <div class="flex items-center justify-around">
        <button
          ref="roundtrip"
          class="py-3 w-full border border-gray-400 lg:border-l-0"
          @click="changeTab(RoundTrip, roundtrip)"
        >
          {{ t('aereoHomePage.titleRoundTrip') }}
        </button>
        <button
          ref="go"
          class="py-3 w-full border-y border-gray-400"
          @click="changeTab(OneWay, go)"
        >
          {{ t('aereoHomePage.titleOneWay') }}
        </button>
        <button
          ref="manycities"
          class="py-3 px-1.5 w-full border border-gray-400 lg:border-r-0"
          @click="changeTab(ManyCities, manycities)"
        >
          {{ t('aereoHomePage.titleManyCities') }}
        </button>
      </div>
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
import { ref, markRaw, onMounted, onUpdated } from 'vue';
import { RouterView } from 'vue-router';
import RoundTrip from '@/components/Aereo/RoundTripForm.vue';
import ManyCities from '@/components/Aereo/ManyCitiesForm.vue';
import OneWay from '@/components/Aereo/OneWayForm.vue';
import { useI18n } from 'vue-i18n';
import LayoutTwoViews from '@/layouts/LayoutTwoViews.vue';

onMounted(() => {
  selectedComponent.value = markRaw(RoundTrip);
  roundtrip.value.classList.add('active');
});

onUpdated(() => {
  if (roundtrip.value) {
    roundtrip.value.classList.add('active');
  }
});

let selectedComponent = ref(null);

const roundtrip = ref(null);
const go = ref(null);
const manycities = ref(null);
const { t } = useI18n();

const cleanRefs = () => {
  roundtrip.value.classList.remove('active');
  go.value.classList.remove('active');
  manycities.value.classList.remove('active');
};

const changeTab = (newTab, ref) => {
  cleanRefs();
  ref.classList.add('active');
  selectedComponent.value = markRaw(newTab);
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}

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
