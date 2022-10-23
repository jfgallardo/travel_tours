<template>
  <div>
    <div
      class="grid md:grid-cols-2 md:grid-rows-2 gap-5 place-items-center py-4"
    >
      <div class="grid grid-cols-2 place-items-center">
        <div class="row-span-2">
          <PlaneLine />
        </div>
        <div class="place-self-start">
          <ul class="mb-5">
            <li class="font-medium">Miami FL, FLL</li>
            <li>Fort Lauderdale Hollywood International Airport</li>
            <li>Viernes, 9 Sep, 2022</li>
            <li>Blue - AD8703</li>
          </ul>
        </div>
        <div class="place-self-start">
          <ul>
            <li class="font-medium">Campinas - Viracopos, VCP</li>
            <li>Viracopos International Airport</li>
            <li>Viernes, 9 Sep, 2022</li>
            <li>Blue - AD8703</li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col space-y-5">
        <div class="flex items-center space-x-4">
          <p class="text-lg font-light p-1">
            FFL <span class="font-bold">9:30 AM</span>
          </p>
          <p class="text-lg font-light">1 Parada</p>
          <p class="text-lg font-light">
            <span class="font-bold">10:25 PM</span> SDU
          </p>
        </div>

        <div>
          <p class="text-lg font-light">
            DURACÃO TOTAL <span class="font-bold">1hr 5min</span>
          </p>
        </div>

        <div>
          <p class="text-lg font-light">
            QTD. DE MILHAS <span class="font-bold">7000</span>
          </p>
        </div>

        <div>
          <p class="text-lg font-light">
            CLASE <span class="font-bold">Economica</span>
          </p>
        </div>

        <div>
          <p class="text-lg font-light">
            AEROLINEA <span class="font-bold">Blue</span>
          </p>
        </div>

        <div class="text-lg font-light">
          <p>1 BAGAGEM DE ATÉ 23KG</p>
          <p>1 BAGAGEM DE MÃO</p>
        </div>
      </div>
      <div class="flex items-center justify-between w-full px-8">
        <div>
          <span class="text-lg font-light">1 Oferta Desde</span><br />
          <span class="text-3xl font-medium"> $300</span>
        </div>
        <div>
          <span class="text-lg font-light">Passantes</span><br />
          <span class="text-3xl font-medium">3A, 2C</span>
        </div>
        <div>
          <span class="text-lg font-light">Total</span><br />
          <span class="text-3xl font-medium">$1200</span>
        </div>
      </div>
      <div>
        <div class="flex items-center space-x-8">
          <div>
            <qrcode-vue :value="value"></qrcode-vue>
          </div>
          <div>
            <button
              class="bg-blue-700 hover:bg-blue-800 text-white py-4 px-12 font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onUpdated } from 'vue';
import QrcodeVue from 'qrcode.vue';
import PlaneLine from '@/components/Aereo/PlaneLine.vue';

onUpdated(() => {
  value.value = `${window.location.protocol}//${window.location.host}/`;
});

const value = ref('');
</script>
<style></style>
