<template>
  <TheModal @close="$emit('close')">
    <template #header>
      <div class="font-semibold">RESERVA #{{ info.Id }}</div>
    </template>

    <template #body>
      <div class="mx-auto px-4">
        <h2 class="pt-2 font-semibold leading-7 text-indigo-600">Detalhes</h2>
        <div class="flex space-x-5">
          <template v-for="(item, index) in detalhes" :key="index">
            <div class="flex items-center justify-between">
              <template v-for="(t, i) in item.Trecho" :key="i">
                <div>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Origen:</span>
                    {{ t.IataOrigem }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Destino:</span>
                    {{ t.IataDestino }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Salida:</span> {{ t.IdaStr }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Hora:</span>
                    {{ t.Saida.split('T')[1] }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Llegada:</span>
                    {{ t.ChegadaStr }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Hora:</span>
                    {{ t.Chegada.split('T')[1] }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Clase:</span> {{ t.ClasseStr }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">Vuelo:</span> {{ t.NumeroVoo }}
                  </p>
                  <p class="font-light text-sm">
                    <span class="font-semibold">CIA:</span> {{ item.Cia.Nome }}
                  </p>
                </div>
              </template>
            </div>
          </template>
        </div>

        <h2 class="pt-2 font-semibold leading-7 text-indigo-600">Pago</h2>
        <div class="grid grid-cols-2">
          <template v-for="(item, index) in detalhes" :key="index">
            <div>
              <p class="font-light text-sm">Adulto: {{ item.ValorAdulto }}</p>
              <p class="font-light text-sm">Criança: {{ item.ValorCrianca }}</p>
              <p class="font-light text-sm">
                Taxa Servico: {{ item.TaxaServico }}
              </p>
              <p class="font-light text-sm">
                Taxa Embarque: {{ item.TaxaEmbarque }}
              </p>
            </div>
          </template>
        </div>

        <h2 class="pt-2 font-semibold leading-7 text-indigo-600">Passengers</h2>

        <ul role="list" class="divide-y divide-gray-100">
          <li
            v-for="(item, index) in passengers"
            :key="index"
            class="flex justify-between gap-x-6 py-5"
          >
            <div class="flex min-w-0 gap-x-4">
              <img
                class="h-14 w-14 flex-none rounded-full bg-gray-50"
                src="https://img.freepik.com/vetores-gratis/ilustracao-de-usuario-avatar-icone_53876-5907.jpg?w=826&t=st=1692568718~exp=1692569318~hmac=e6e252f82baad4516592633ff31269b7f8d3025593585ebd4d5ff650a6a72cec"
                alt=""
              />
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  {{ item.Nome }} {{ item.Sobrenome }}
                </p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                  Cpf/Rg {{ item.Cpf }}
                </p>
              </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-sm leading-6 text-gray-900">
                Sexo / {{ item.Sexo }}
              </p>
              <p class="mt-1 text-xs leading-5 text-gray-500">
                Birthday: {{ item.Nascimento.split('T')[0] }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </TheModal>
</template>

<script setup>
import TheModal from '@/components/Partials/TheModal.vue';
import { computed } from 'vue';

defineEmits(['close']);

const props = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
});

const passengers = computed(() => {
  if (props.info?.Bilhete?.Passageiro) {
    return props.info?.Bilhete?.Passageiro;
  }
  return [];
});

const detalhes = computed(() => {
  if (props.info?.Bilhete?.Viagem) {
    return props.info?.Bilhete?.Viagem;
  }
  return [];
});
</script>

<style scoped></style>
