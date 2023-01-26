<template>
  <Header />
<!-- flex min-h-screen flex-col lg:flex-row bg-white text-gray-800 absolute w-full -->
  <div
    class="lg:flex lg:flex-row lg:justify-between"
  >
<!--    transform bg-white transition-transform duration-150 ease-in lg:fixed lg:z-10 lg:max-w-sm xl:max-w-md
  :class="[
        open
          ? 'translate-y-0 lg:translate-x-0'
          : 'hidden lg:flex lg:-translate-x-full',
      ]"
-->
    <aside
      class="lg:basis-2/6"
      :class="{'hidden' : !open}"
    >
      <slot name="aside"></slot>
      <button
        type="button"
        class="rounded-md text-gray-300 hover:text-black absolute top-10 -right-4 z-10 hidden lg:block"
        @click="open = !open"
      >
        <span class="sr-only">Close panel</span>
        <svg
          v-if="open"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1"
          stroke="gray"
          class="w-9 h-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1"
          stroke="gray"
          class="w-9 h-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </button>
    </aside>
<!--   flex w-full flex-col transition-all duration-150 ease-in lg:relative -->
<!--   :class="[open ? 'mt-0 lg:ml-0 lg:inset-x-[38%] xl:inset-x-[35%] 2xl:inset-x-[30%] lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-lg' : 'lg:px-20 xl:px-1.5']"   -->
    <main
      class="lg:basis-4/6 lg:max-w-screen-sm xl:max-w-screen-lg 2xl:max-w-screen-xl"
    >
<!--     flex flex-col bg-white p-4 -->
      <div class="">
        <slot name="main"></slot>
      </div>
    </main>
  </div>
  <button
    class="bg-blue-700 rounded-full p-2 hover:bg-blue-800 button-float lg:hidden"
    @click="open = !open"
  >
    <transition name="slide-up" mode="out-in">
      <svg
        v-if="!open"
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
import { ref } from 'vue';
import Header from '@/components/Partials/TheHeader.vue';

const open = ref(true);
</script>

<style scoped>
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
</style>
