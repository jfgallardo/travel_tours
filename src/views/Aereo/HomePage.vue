<template>
  <div class="flex flex-col lg:flex-row">
    <div class="lg:w-2/6 2xl:w-1/4 lg:h-5/6 lg:overflow-y-auto lg:fixed lg:left-0 lg:pb-10 ">
      <div class="border-r border-gray-300 pt-8">
        <div class="grid grid-cols-3 grid-rows-1 px-4">
          <button
            ref="roundtrip"
            class="py-3 border border-gray-400"
            @click="changeTab(RoundTrip, roundtrip)"
          >
            {{ t('aereoHomePage.titleRoundTrip') }}
          </button>
          <button
            ref="go"
            class="py-3 border-y border-gray-400"
            @click="changeTab(OneWay, go)"
          >
            {{ t('aereoHomePage.titleOneWay') }}
          </button>
          <button
            ref="manycities"
            class="py-3 border border-gray-400"
            @click="changeTab(ManyCities, manycities)"
          >
            {{ t('aereoHomePage.titleManyCities') }}
          </button>
        </div>
        <div>
          <component :is="selectedComponent"></component>
        </div>
      </div>
    </div>
    <div class="px-3 mt-4 lg:w-4/6 2xl:w-3/4 lg:h-screen lg:relative lg:top-0 lg:left-1/3 2xl:left-1/4 lg:pl-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw, onMounted } from "vue";
import { RouterView } from 'vue-router';
import RoundTrip from '@/components/Aereo/RoundTripForm.vue';
import ManyCities from '@/components/Aereo/ManyCitiesForm.vue';
import OneWay from '@/components/Aereo/OneWayForm.vue';
import { useI18n } from 'vue-i18n';
import {useRoute} from 'vue-router';


onMounted(() => {
  selectedComponent.value = markRaw(RoundTrip);
  roundtrip.value.classList.add('active');
});

let selectedComponent = ref(null);

const roundtrip = ref(null);
const go = ref(null);
const manycities = ref(null);
const { t } = useI18n();
const route = useRoute();

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
</style>
