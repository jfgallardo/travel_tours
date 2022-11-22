<template>
  <div>
    <div>
      <img
        src="@/assets/img/movida-300x300.jpg"
        class="cursor-pointer"
        @click="movida = true"
      />
    </div>

    <Modal v-if="movida" title="Localiza" @close="movida = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/movida-popup.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify">
          <ol>
            <li>
              <b>Tipos de veículos:</b> de carros básicos a luxuosos a Movida
              conta com uma frota nova, completa e variada, incluindo veículos
              de carga, blindados, híbridos e elétricos. Distribuída em
              diferentes grupos, para atender a qualquer tipo de necessidade,
              incluindo também categoria de carro elétrico (Grupo XE). Os
              veículos elétricos poderão ser locados somente em algumas lojas
              nas cidades de São Paulo, Campinas e Rio de Janeiro. Consulte!
            </li>
            <li>
              <b>Movida Cargo:</b> a Movida trás uma categoria para transporte
              de cargas muito diversa contando com veículos que atende de 80
              pacotes a 190 pacotes (Grupo MJ).
            </li>
            <li>
              <b>Carbon Free:</b> Todas as reservas feitas com a CVC Corp contam
              com o programa de sustentabilidade para neutralização de CO² a
              zero.
            </li>
            <li>
              <b>Web check in:</b> muita agilidade e o seu cliente não precisa
              passar no balcão, basta inserir o CPF da reserva e baixar o
              aplicativo da Movida;
            </li>
            <b class="text-lg"> E mais: </b>

            <li>Até 03 condutores adicionais grátis e online;</li>
            <li>Tarifas mensais a partir de 21 dias e com 4500km;</li>
            <li>Tarifas a partir de R$129,90 reais;</li>
            <li>
              Tarifa mensal com franquia de Km de 4500 a maior Km liberada em
              sistema;
            </li>
            <li>Permite que um terceiro passe o cartão para caução;</li>
            <li>
              Permite retirada para menores de 21 e com carteira provisória;
            </li>
            <li>
              O valor da caução pode ser alterado de acordo com o perfil do
              condutor;
            </li>
            <li>Possui Proteção Vidros e Pneus.</li>
          </ol>
          <p class="text-sm mt-2">
            *Válido para lojas da corporação, exceto em feriados e datas
            comemorativas.
          </p>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Modal from '@/components/Partials/TheModal.vue';

const movida = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
