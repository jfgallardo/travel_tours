<template>
  <div>
    <div>
      <img
        src="@/assets/img/hertz-300x300.jpg"
        class="cursor-pointer"
        @click="hertz = true"
      />
    </div>

    <Modal v-if="hertz" title="Localiza" @close="hertz = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/hertz-popup.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify">
          <ol>
            <li>Possui contrato em português na Flórida;</li>
            <li>
              Para EUA, todas as tarifas contemplam 1 motorista adicional
              grátis;
            </li>
            <li>
              Para Europa, América Latina e demais localidades, solicite a
              inclusão outros condutores adicionais no balcão da locadora, no
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

const hertz = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
