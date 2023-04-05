<template>
  <div>
    <div>
      <img
        src="@/assets/img/dollarthrifty-300x300.jpg"
        class="cursor-pointer"
        @click="dollar = true"
      />
    </div>

    <Modal v-if="dollar" title="Localiza" @close="dollar = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/dollarthrifty-popup.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify px-12 py-2.5">
          <ol>
            <li>
              Tarifas disponíveis nos Estados Unidos, América Latina e Europa;
            </li>
            <li>Possui contrato em português na Flórida;</li>
            <li>
              Para EUA, todas as tarifas contemplam 1 motorista adicional
              grátis. Para Europa, América Latina e demais localidades, solicite
              a inclusão outros condutores adicionais no balcão da locadora, no
              momento da retirada do veículo;
            </li>
            <li>
              Todos os condutores (inclusive os adicionais) devem ser
              habilitados e maiores de 25 anos. Se menor de 25 anos haverá
              cobrança de taxa (USD 30/dia).
            </li>
          </ol>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Modal from '@/components/Partials/TheModal.vue';

const dollar = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
