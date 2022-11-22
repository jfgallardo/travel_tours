<template>
  <div>
    <div>
      <img
        src="@/assets/img/europcar-300x300.jpg"
        class="cursor-pointer"
        @click="europCar = true"
      />
    </div>

    <Modal v-if="europCar" title="Localiza" @close="europCar = false">
      <template #header>
        <div class="flex items-center justify-center w-full">
          <img src="@/assets/img/europcar-popup.jpg" />
        </div>
      </template>
      <template #body>
        <div class="font-light mt-4 text-justify">
          <ol>
            <li>
              Presente nos principais destinos internacionais e em mais de 140
              países, como: Argentina, Chile, Croácia, Curaçao, República
              Dominicana, Equador, Israel, Estados Unidos, Uruguai, Austrália,
              Bélgica, República Tcheca, Dinamarca, Finlândia, França, Alemanha,
              Islândia, Irlanda, Itália, Nova Zelândia, Noruega, Polônia,
              Portugal, África do Sul, Suécia, Suiça, Espanha, Turquia, Reino
              Unidos e Emirados Árabes Unidos.
            </li>
            <li>
              Categoria de carros Selection - modelos de luxo e de últim
              ageração das marcas mais prestigiadas do mundo.
            </li>
            <li>
              Quiosques de autoatendimento e serviço personalizado em diversos
              idiomas e nas principais localidades.
            </li>
            <li>Compormisso de limpeza completa e segurança</li>
            <b class="text-sm">
              Enquanto o mundo enfrenta tempos de pandemia devido à COVID-19,
              adotou medidas rigorosas para oferecer uma experiência de viagem
              segura e flexível.
            </b>
            <br />
            <b class="text-sm">
              “Programa de Segurança”, o compromisso nº 1:
            </b>
            <li>Política de “zero contato”;</li>
            <li>Limpeza e desinfeção rigorosas de estações e veículos;</li>
            <li>Processos e práticas de distanciamento social;</li>
            <li>
              Todos os veículos são limpos intensivamente com desinfetantes
              orgânicos aprovados, atentos às áreas do condutor e passageiros;
            </li>
            <li>
              A porta do condutor é selada com uma fita adesiva autocolante
              ”Clean & Safe”;
            </li>
          </ol>

          <p class="text-sm mt-2">**Atenção: Não aplica IRRF.</p>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Modal from '@/components/Partials/TheModal.vue';

const europCar = ref(false);
</script>
<style scoped>
ol {
  list-style-type: circle;
}
</style>
