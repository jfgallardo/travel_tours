<template>
  <div class="relative">
    <nav
      class="fixed top-0 right-0 left-0 z-30 bg-white border-b border-gray-300 grid grid-cols-1 grid-rows-2"
    >
      <div class="flex items-center justify-around border-b border-gray-300">
        <div class="flex items-center h-full">
          <div class="border-r border-gray-300 h-full py-2">
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
          <div>
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
          <div>
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
          <RouterLink :to="{ name: 'LandingPage' }"> Home </RouterLink>
          <RouterLink to="/">{{ t("header.ofertas") }}</RouterLink>
          <RouterLink to="/">{{ t("header.duvidas") }}</RouterLink>
          <RouterLink to="/">{{ t("header.contato") }}</RouterLink>
        </div>

        <div class="flex items-center justify-center pr-2 h-full">
          <div class="border-r border-gray-300 h-full">
            <button class="flex items-center p-2">
              <Transaction class="mr-1 h-5 w-5" />
              <span class="hidden md:block">
                {{ t("header.intercambio") }}
              </span>
            </button>
          </div>
          <div class="border-r border-gray-300 h-full">
            <button class="flex items-center p-2">
              <UserCircle class="mr-1 h-5 w-5" />
              <span class="hidden md:block">
                {{ t("header.conecte-se") }}
              </span>
            </button>
          </div>
          <div class="ml-2">
            <Dropdowni18 />
          </div>
        </div>

        <div class="md:hidden">
          <button
            type="button"
            @click="hiddenOf = !hiddenOf"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
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

      <div class="absolute" v-if="hiddenOf">
        <div class="space-y-1 pt-2 pb-3 text-right px-5">
          <RouterLink
            class="text-gray-900 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            :to="{ name: 'LandingPage' }"
          >
            Home
          </RouterLink>
          <RouterLink
            class="text-gray-900 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/"
            >{{ t("header.ofertas") }}</RouterLink
          >
          <RouterLink
            class="text-gray-900 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/"
            >{{ t("header.duvidas") }}</RouterLink
          >
          <RouterLink
            class="text-gray-900 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            to="/"
            >{{ t("header.contato") }}</RouterLink
          >
        </div>
      </div>
      <MainSubheading v-if="!($route.name === 'AereoFlightQuery')" />
      <QuerySubHeader v-if="$route.name === 'AereoFlightQuery'" />
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import MainSubheading from "@/components/Partials/TheMainSubheading.vue";
import Dropdowni18 from "@/components/Partials/TheDropdowni18.vue";
import Transaction from "@/components/Icons/Transaction.vue";
import UserCircle from "@/components/Icons/UserCircle.vue";
import QuerySubHeader from "@/components/Partials/TheQuerySubheading.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { t } = useI18n();

const hiddenOf = ref(false);
</script>

<style scoped>
.mrtecnologiaeservicos:hover {
  fill: black;
}
</style>

<!--  <div
      class="grid grid-cols-1 grid-rows-2 fixed top-0 right-0 left-0 z-30 bg-white border-b border-gray-300"
    >
      <div>
        <div
          class="flex items-center justify-between w-full h-full border-b border-gray-300"
        >
          <div class="flex">
            <RouterLink :to="{ name: 'Landing' }" class="py-2">
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
            <a
              href="https://www.mrtecnologiaeservicos.com/"
              target="_blank"
              class="py-2 border-l border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 74.14 72.64"
                class="h-6 w-20 mrtecnologiaeservicos"
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
            <RouterLink :to="{ name: 'Landing' }" class="py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 177.48 94.68"
                class="h-6 w-20 mrtecnologiaeservicos"
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
          <div class="w-full">
            <ul class="flex space-x-8 py-2 justify-around">
              <li>
                <RouterLink :to="{ name: 'Landing' }"> Home </RouterLink>
              </li>
              <li>
                <RouterLink to="/">{{ t("header.ofertas") }}</RouterLink>
              </li>
              <li>
                <RouterLink to="/">{{ t("header.duvidas") }}</RouterLink>
              </li>
              <li>
                <RouterLink to="/">{{ t("header.contato") }}</RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <div class="flex py-2 space-x-6 px-6 border-l border-gray-300">
              <button class="flex items-center border-r pr-4 border-gray-300">
                <Transaction class="mr-1 h-5 w-5" />
                {{ t("header.intercambio") }}
              </button>
              <button class="flex items-center border-r pr-4 border-gray-300">
                <UserCircle class="mr-1 h-5 w-5" />
                {{ t("header.conecte-se") }}
              </button>
              <Dropdowni18 />
            </div>
          </div>
        </div>
      </div>
      <div>
          <MainSubheading v-if="!($route.name === 'FlightQuery')" />
          <QuerySubHeader v-if="$route.name === 'FlightQuery'" />
      </div>
    </div> -->
