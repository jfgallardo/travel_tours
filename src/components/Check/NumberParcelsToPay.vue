<template>
  <div>
    <div
      v-if="rateStore.loading"
      class="border border-gray-400 h-10 pr-6 pl-4 pt-9 pb-4 flex space-x-3.5 items-end animate-pulse"
    >
      <span class="text-sm">Cargando formas de financiamento</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    </div>
    <div
      v-else
      class="border border-gray-400 h-10 pr-6 pl-4 pt-9 pb-4 flex items-end cursor-pointer"
      @click="modal = true"
    >
      <span class="text-sm">Selecione em quantas parcelas deseja pagar</span>
    </div>
    <div
      v-if="informationStore.card.planDeFinanciamento"
      class="border border-gray-400 border-t-0 flex flex-col h-20 justify-center px-4"
    >
      <div class="flex items-center space-x-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="blue"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="text-blue-700 font-semibold"
          >{{ informationStore.card.planDeFinanciamento.Parcelas }} de $
          {{ informationStore.card.planDeFinanciamento.PrimeiraParcela }} -
          {{
            informationStore.card.planDeFinanciamento.vlJurosCalculado === 0
              ? 'SEM JUROS'
              : `R$ ${informationStore.card.planDeFinanciamento.vlJurosCalculado}  Juros`
          }}</span
        >
      </div>

      <span class="ml-9"
        >Total a pagar: R$
        {{
          informationStore.card.planDeFinanciamento.PrimeiraParcela +
          informationStore.card.planDeFinanciamento.DemaisParcelas *
            (informationStore.card.planDeFinanciamento.Parcelas - 1)
        }}</span
      >
    </div>
  </div>

  <Modal v-if="modal" @close="modal = false">
    <template #body>
      <div>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Formas de financiamento
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Seleccione la que mas se ajusta a sus intereses
            </p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 sm:justify-items-center"
              >
                <dt class="text-sm font-medium text-gray-500">Parcelas</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  PrimeiraParcela
                </dd>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  DemaisParcelas
                </dd>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  CoeficienteJuros
                </dd>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  vlJurosCalculado
                </dd>
              </div>
              <div
                v-for="item in planosDeFinanciamento.Financiamentos"
                :key="item.Id"
                class="bg-white hover:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6 sm:justify-items-center cursor-pointer"
                @click="selectItem(item)"
              >
                <dt class="text-sm font-medium text-gray-500">
                  {{ item.Parcelas }}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  R$ {{ item.PrimeiraParcela }}
                </dd>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  R$ {{ item.DemaisParcelas }}
                </dd>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  R$ {{ item.CoeficienteJuros }}
                </dd>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0">
                  R$ {{ item.vlJurosCalculado }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </template>
    <template #header>
      <span>Parcelas</span>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '@/components/Partials/TheModal.vue';
import { computed, ref } from 'vue';
import { useRateStore } from '@/stores/rate';
import { useGeneralInformation } from '@/stores/generalInformation';

const modal = ref(false);
const rateStore = useRateStore();
const informationStore = useGeneralInformation();
const planosDeFinanciamento = computed(() => {
  const planos = informationStore.info.PlanosDeFinanciamento ?? [];
  return planos.find(
    (o) => o.Bandeira === informationStore.card.bainderaSelected.value
  );
});

const selectItem = (item) => {
  informationStore.card.planDeFinanciamento = item;
};
</script>

<style lang="scss" scoped></style>
