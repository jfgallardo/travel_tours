<template>
  <div>
    <div>
      <img
        src="@/assets/img/unidas-300x300.jpg"
        class="cursor-pointer"
        @click="unidas = true"
      />
    </div>

    <Modal v-if="unidas" title="Localiza" @close="unidas = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/unidas-popup.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify">
          <ol>
            <li>
              <b>Tipos de veículos:</b> a locadora possui uma frota
              diversificada, com modelos desde veículos básicos aos
              intermediários, de luxo e blindados. Também possui carros
              elétricos, e VUC's para transporte de cargas leves;
            </li>
            <li>
              <b>Venda livre:</b> a Unidas possibilita efetuar reservas* do
              grupo AM ao grupo E e garante a retirada do carro reservado ou um
              upgrade free caso o grupo contratado não esteja disponível;
            </li>
            <li>
              <b>Carbono Neutro:</b> ao alugar seu carro com a Unidas, o
              conudtor pode contribuir no combate às mudanças climáticas,
              neutralizando os gases de efeito estufa gerados pela sua reserva
              com apenas R$1,99/diária.
            </li>
            <b class="text-lg"> E mais: </b>
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

const unidas = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
