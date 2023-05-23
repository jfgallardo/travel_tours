<template>
  <div class="relative" :class="[showSubHeader ? 'pb-2' : 'pb-0']">
    <nav
      :class="[showRegisterSubH ? 'grid-rows-3' : 'grid-rows-2']"
      class="fixed top-0 right-0 left-0 z-50 bg-white border-b border-gray-300 grid grid-cols-1"
    >
      <div class="flex items-center justify-between border-b">
        <div class="flex items-center h-full">
          <div class="md:border-r md:border-gray-300 h-full flex items-center">
            <RouterLink :to="{ name: 'LandingPage' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 106.76 60.04"
                class="h-6 w-20"
                fill="blue"
              >
                <path
                  class="cls-1"
                  d="M50.91,39.97l9.19,14.43c2.19,3.51,6.04,5.65,10.18,5.65h11.17l-11.13-17.4c-1.06-1.66-2.9-2.67-4.87-2.67h-14.54Z"
                />
                <path
                  class="cls-1"
                  d="M61.09,27.73L47.14,5.6c-2.2-3.49-6.03-5.6-10.15-5.6h-10.84l23.95,38.37c3.12-3.62,6.8-7.59,10.99-10.63Z"
                />
                <path
                  class="cls-1"
                  d="M55.31,60.04h-11.17c-4.14,0-7.99-2.13-10.18-5.65L0,0H10.84C14.96,0,18.79,2.11,20.99,5.6L55.31,60.04Z"
                />
                <path
                  class="cls-1"
                  d="M91.3,36.23c2.93-.89,5.55-2.5,7.67-4.61,3.35-3.35,5.42-7.97,5.42-13.09C104.39,8.31,96.1,.02,85.88,.02h-29.73c0,8.47,6.31,15.65,14.72,16.67,1.41,.17,2.73,.29,3.92,.36h0l-4.96-9.92,5.47-.2,6.41,8.38,3.04-.72c2.19-.52,5.81-.55,8.04-.07l.81,.18c.65,.14,.86,.96,.36,1.4l-.86,.75c-1.65,1.44-3.71,2.28-5.79,2.82l-4.34,1.06-2.1,10.37-5.01,2.39,.18-11.49h0c-5.78,3.39-15.8,8.75-20.72,14.99l12.46,.07c4.66,0,9.01,2.36,11.55,6.27l6.43,9.91c2.76,4.25,7.48,6.81,12.54,6.81h8.46l-15.46-23.8Z"
                />
              </svg>
            </RouterLink>
          </div>
          <div class="md:border-r md:border-gray-300 h-full flex items-center">
            <a href="https://www.mrtecnologiaeservicos.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 74.14 72.64"
                class="hidden md:block h-6 w-20 mrtecnologiaeservicos"
                fill="#636569"
              >
                <polygon
                  points="46.93 72.64 27.22 72.64 27.22 21.59 46.93 0 46.93 72.64"
                />
                <polygon
                  points="19.71 72.64 0 72.64 0 21.59 19.71 0 19.71 72.64"
                />
                <polygon
                  points="53.97 72.64 74.14 52.93 74.14 52.93 74.14 72.64 53.97 72.64"
                />
                <polygon
                  points="54.43 21.59 54.43 61 74.14 41.62 74.14 0 54.43 21.59"
                />
              </svg>
            </a>
          </div>
          <div class="border-r border-gray-300 h-full flex items-center">
            <RouterLink :to="{ name: 'LandingPage' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 177.48 94.68"
                class="hidden md:block h-6 w-20 mrtecnologiaeservicos"
                fill="#636569"
              >
                <path
                  class="cls-1"
                  d="M89.76,94.68h-9.08V30.39l-37.28,55.56L9.14,31.29v63.4H0V0L43.69,69.57,89.76,.1V94.68Z"
                />
                <path
                  class="cls-1"
                  d="M177.48,94.68h-14.88l-48.99-38.04v-6.6h29.94c5.64,0,10.43-1.97,14.35-5.91,3.92-3.94,5.88-8.82,5.88-14.63s-1.96-10.69-5.88-14.63c-3.92-3.94-8.71-5.91-14.35-5.91h-33.37V94.68h-9.52V0h42.89c5.39,0,10.35,1.35,14.88,4.05,4.52,2.7,8.13,6.28,10.83,10.74,2.7,4.46,4.05,9.37,4.05,14.72s-1.35,10.21-4.05,14.69c-2.7,4.48-6.31,8.07-10.83,10.77-4.52,2.7-9.48,4.05-14.88,4.05h-12.01l45.94,35.67Z"
                />
              </svg>
            </RouterLink>
          </div>
        </div>

        <div
          class="items-center justify-around w-full h-full hidden md:flex border-r border-gray-300"
        >
          <RouterLink :to="{ name: 'LandingPage' }"> Home</RouterLink>
          <Badge :top="false">
            <RouterLink to="#">{{ t('header.ofertas') }}</RouterLink>
          </Badge>
          <RouterLink :to="{ name: 'MainQuestionsPage' }"
            >{{ t('header.duvidas') }}
          </RouterLink>
          <RouterLink :to="{ name: 'ContactPage' }"
            >{{ t('header.contato') }}
          </RouterLink>
        </div>

        <div class="flex items-center justify-center md:pr-2">
          <!-- <div class="border-r border-gray-300 h-full">
            <div class="flex items-center p-2">
              <Transaction class="mr-1 h-5 w-5" />
              <span class="hidden md:block">
                {{ t('header.intercambio') }}
              </span>
            </div>
          </div> -->
            <Dropddown class="border-r border-gray-300">
              <template #selected>
                <button
                  v-if="authStore.userLogged"
                  class="flex items-center p-2"
                >
                  <UserCircle class="mr-1 h-5 w-5" />
                  <span>Welcome</span>
                </button>
                <button v-else class="flex items-center p-2">
                  <UserCircle class="mr-1 h-5 w-5" />
                  <span>
                    {{ t('header.conecte-se') }}
                  </span>
                </button>
              </template>
              <template #dropdown>
                <Login />
              </template>
            </Dropddown>
            <Dropdowni18 />
        </div>

        <div class="md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="hiddenOf = !hiddenOf"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="hiddenOf" class="absolute w-full z-50">
        <div class="pt-2 pb-3 text-center px-5 bg-white">
          <div class="flex items-center justify-end">
            <svg
              class="fill-current h-6 w-6"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              @click="hiddenOf = false"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </div>

          <RouterLink
            class="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            :to="{ name: 'LandingPage' }"
            @click="hiddenOf = false"
          >
            Home
          </RouterLink>
          <Badge :top="false">
            <RouterLink
              class="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              to="#"
              @click="hiddenOf = false"
              >{{ t('header.ofertas') }}
            </RouterLink>
          </Badge>
          <RouterLink
            class="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            :to="{ name: 'MainQuestionsPage' }"
            @click="hiddenOf = false"
            >{{ t('header.duvidas') }}
          </RouterLink>
          <RouterLink
            :to="{ name: 'ContactPage' }"
            class="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            @click="hiddenOf = false"
            >{{ t('header.contato') }}
          </RouterLink>
        </div>
      </div>
      <MainSubheading v-if="showMainSubheading" />
      <QuerySubHeader v-if="showSubHeader" />
      <RegisterSubH v-if="showRegisterSubH" />
      <PaymentHeader v-if="showPaymentHeader" />
      <PreCheckOutSubheading v-if="showPreCheckOutSubheading" />
      <CheckOutSubheading v-if="showCheckOutSubheading" />
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import MainSubheading from '@/components/Partials/TheMainSubheading.vue';
import Dropdowni18 from '@/components/Partials/TheDropdowni18.vue';
import UserCircle from '@/components/Icons/UserCircle.vue';
import QuerySubHeader from '@/components/Partials/TheQuerySubheading.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import Login from '@/components/Auth/TheLogin.vue';
import RegisterSubH from '@/components/Partials/TheRegisterSubH.vue';
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import PreCheckOutSubheading from '@/components/Partials/PreCheckOutSubheading.vue';
import CheckOutSubheading from '@/components/Partials/CheckOutSubheading.vue';
import Badge from '@/components/Partials/TheBadge.vue';
import PaymentHeader from '@/components/Partials/ThePaymentHeader.vue';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const { t } = useI18n();
const authStore = useAuthStore();
const hiddenOf = ref(false);

const showMainSubheading = computed(() => {
  return (
    !(route.name === 'VooHome') &&
    !(route.name === 'VoosMultiple') &&
    route.name !== 'RegisterPage' &&
    !(route.name === 'PreCheckoutPage') &&
    !(route.path === '/checkout') &&
    !(route.name === 'CheckPage')
  );
});
const showSubHeader = computed(() => {
  return route.name === 'VooHome' || route.name === 'VoosMultiple';
});
const showRegisterSubH = computed(() => {
  return route.name === 'RegisterPage';
});
const showPreCheckOutSubheading = computed(() => {
  return route.name === 'PreCheckoutPage';
});
const showCheckOutSubheading = computed(() => {
  return route.path === '/checkout';
});
const showPaymentHeader = computed(() => {
  return route.name === 'CheckPage';
});
</script>

<style scoped>
.mrtecnologiaeservicos:hover {
  fill: black;
}
</style>
