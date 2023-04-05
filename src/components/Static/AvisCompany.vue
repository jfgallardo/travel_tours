<template>
  <div>
    <div>
      <img
        src="@/assets/img/avisbudget-300x300.jpg"
        class="cursor-pointer"
        @click="avis = true"
      />
    </div>

    <Modal v-if="avis" title="Localiza" @close="avis = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/avisbudget.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify px-12 py-2.5">
          <ol>
            <li>
              Tarifas disponíveis nos Estados Unidos, América Latina e Europa;
            </li>
            <li>
              Nos balcões o contrato é aberto através de um tablet, e, na
              Flórida, possuem contratos em português;
            </li>
            <li>
              Possui o serviço de pedágio e o mesmo deve ser habilitado no
              balcão;
            </li>
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

const avis = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
