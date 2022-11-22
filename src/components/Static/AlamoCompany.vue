<template>
  <div>
    <div>
      <img
        src="@/assets/img/alamo-300x300.jpg"
        class="cursor-pointer"
        @click="alamo = true"
      />
    </div>

    <Modal v-if="alamo" title="Localiza" @close="alamo = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/alamo-popup.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify">
          <ol>
            <li>
              Tarifas disponíveis nos Estados Unidos, Canadá, América Latina,
              Caribe e Europa;
            </li>
            <li>Tarifas disponíveis nos Estados Unidos e América Latina;</li>
            <li>
              Totens nos principais aeroportos: o cliente pode seguir
              diretamente até o totem, abrir o contrato em português e seguir
              para o veículo;
            </li>
            <li>
              Possui o serviço de pedágio, pode ser incluso através do
              autoatendimento no totem ou diretamente no balcão;
            </li>
            <li>
              Para EUA, todas as tarifas contemplam 1 motorista adicional
              grátis, para Europa, América Latina e demais localidades, solicite
              a inclusão outros condutores adicionais no balcão da locadora, no
              momento da retirada do veículo;
            </li>
            <li>
              Todos os condutores (inclusive os adicionais) devem ser
              habilitados e maiores de 25 anos. Se menor de 25 anos haverá
              cobrança de taxa (USD 30/dia).
            </li>
            <li>
              Como membro da Clorox® Safer Today Alliance™, a Álamo recebe apoio
              contínuo e orientação científica sobre suas medidas de segurança
              aprimoradas de especialistas da Cleveland Clinic e da CDC
              Foundation. Os clientes encontrarão um lenço desinfetante Clorox®
              de uma contagem em cada veículo alugado em todos os locais nos EUA
              e Canadá. Os lenços desinfetantes Clorox são aprovados pela EPA
              para matar o SARS-CoV-2, o vírus que causa o COVID-19, quando
              usado conforme as instruções. Cada lenço inclui instruções de uso
              e é acompanhado por instruções para usá-lo nas superfícies duras e
              não porosas de alto toque do veículo.
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

const alamo = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
