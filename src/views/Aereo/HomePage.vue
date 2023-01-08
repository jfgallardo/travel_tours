<template>
  <div class="flex flex-col lg:flex-row">
    <div
      v-if="openSearch"
      class="lg:w-2/6 2xl:w-1/4 lg:h-5/6 lg:overflow-y-auto lg:fixed lg:left-0 lg:pb-10"
    >
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
          <transition name="fade" mode="out-in">
            <component :is="selectedComponent"></component>
          </transition>
        </div>
      </div>
    </div>
    <div
      class="px-3 mt-4 lg:w-4/6 2xl:w-3/4 lg:h-screen lg:relative lg:top-0 lg:left-1/3 2xl:left-1/4 lg:pl-4"
    >
      <RouterView />
    </div>
  </div>
  <button
    class="bg-blue-700 rounded-full p-2 hover:bg-blue-800 button-float"
    @click="openSearch = !openSearch"
  >
    <transition name="slide-up" mode="out-in">
      <svg
        v-if="!openSearch"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
      >
        <path
          d="M15.5699 18.5001V14.6001"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5699 7.45V5.5"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.57 12.65C17.0059 12.65 18.17 11.4859 18.17 10.05C18.17 8.61401 17.0059 7.44995 15.57 7.44995C14.134 7.44995 12.97 8.61401 12.97 10.05C12.97 11.4859 14.134 12.65 15.57 12.65Z"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.43005 18.5V16.55"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.43005 9.4V5.5"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.42996 16.5501C9.8659 16.5501 11.03 15.386 11.03 13.9501C11.03 12.5142 9.8659 11.3501 8.42996 11.3501C6.99402 11.3501 5.82996 12.5142 5.82996 13.9501C5.82996 15.386 6.99402 16.5501 8.42996 16.5501Z"
          stroke="white"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.16998 14.83L14.83 9.17004"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.83 14.83L9.16998 9.17004"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </transition>
  </button>
</template>

<script setup>
import { ref, markRaw, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import RoundTrip from '@/components/Aereo/RoundTripForm.vue';
import ManyCities from '@/components/Aereo/ManyCitiesForm.vue';
import OneWay from '@/components/Aereo/OneWayForm.vue';
import { useI18n } from 'vue-i18n';

onMounted(() => {
  selectedComponent.value = markRaw(RoundTrip);
  roundtrip.value.classList.add('active');
});

let selectedComponent = ref(null);

const roundtrip = ref(null);
const go = ref(null);
const manycities = ref(null);
const { t } = useI18n();
const openSearch = ref(true);

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
  bottom: 45px;
  right: 15px;
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
