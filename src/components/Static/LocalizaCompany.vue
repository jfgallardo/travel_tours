<template>
  <div>
    <div>
      <img
        src="@/assets/img/localiza-300x300.jpg"
        class="cursor-pointer"
        @click="localiza = true"
      />
    </div>

    <Modal v-if="localiza" title="Localiza" @close="localiza = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/localiza-popup.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify">
          <ol>
            <li>Diárias a partir de R$ 152,22 reais;</li>
            <li>
              Até 03 condutores adicionais grátis e online nas locações mensais;
            </li>
            <li>
              Tarifas mensais com opções de 3000km (no portal), 4000 e 5000km
              (com a Central do Carro);
            </li>
            <li>Localiza fast (cliente não passa no balcão);</li>
            <li>
              Conect Car (Pedágio) - não fatura esse item mesmo em faturamento
              total;
            </li>
            <li>
              Localiza Way é um smartphone que oferece diversas facilidade como:
              wifi, bluetooth, música, GPS, onde estacionar, agências mais
              próximas e etc;
            </li>
            <li>
              Localiza Pass permite passagem livre nos pedágios e
              estacionamentos, evitando filas. Contratação no balcão da locadora
            </li>
          </ol>

          <p class="text-sm mt-2">
            **Atenção: cartão para caução apenas em nome do condutor. Cartões de
            terceiros não serão aceitos para pré-autorização.
          </p>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Modal from '@/components/Partials/TheModal.vue';

const localiza = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
