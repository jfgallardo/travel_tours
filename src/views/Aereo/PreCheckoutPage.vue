<template>
  <div>
    <div class="mx-auto px-4 pb-20">
      <div class="flex">
        <div class="basis-4/6">
          <PreCheckOut :viagem="userStore.vooSelected" />
          <div class="h-12 w-full bg-black flex items-center space-x-3 justify-center cursor-pointer" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </svg>
            <p class="text-white">Veja outras opções de voos</p>
          </div>
        </div>
        <div class="basis-4/12">2</div>
      </div>
      <div class="flex">
        <div class="basis-4/6">3</div>
        <div class="basis-4/12">4</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import PreCheckOut from '@/components/Aereo/PreCheckOut.vue';

const userStore = useUserStore();
</script>

<style scoped></style>
