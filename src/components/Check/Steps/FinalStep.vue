<template>
  <div>
    <div
      class="flex flex-col items-center justify-center pt-6 mx-auto space-y-6 md:w-auto"
    >
      <div v-if="platform === 1" class="w-full">
        <SelectSimple
          label="Parcelas"
          :options="optionsSelect"
          :selected="informationStore.detailsUser.parcelas"
          @select-value="informationStore.detailsUser.parcelas = $event"
        />
      </div>
      <div v-else class="w-full">
        <NumberParcelsToPay />
      </div>

      <div class="w-full">
        <TextArea
          placeholder="En caso necessite de atendimento e/ou serviços especiais, informe aqui....."
        />
      </div>

      <div class="w-full">
        <CheckInput v-model="informationStore.acceptConditions">
          <template #label>
            Declaro que li e aceito as
            <span class="underline decoration-solid">condiçoes de compra</span>
            e
            <span class="underline decoration-solid"
              >política de privacidade</span
            >
          </template>
        </CheckInput>
      </div>
    </div>
  </div>
</template>

<script setup>
import NumberParcelsToPay from '@/components/Check/NumberParcelsToPay.vue';
import TextArea from '@/components/FormUI/TextArea.vue';
import CheckInput from '@/components/FormUI/CheckInput.vue';
import { computed } from 'vue';
import Cookies from 'js-cookie';
import SelectSimple from '@/components/FormUI/TheSelect.vue';
import { useGeneralInformation } from '@/stores/generalInformation';

const informationStore = useGeneralInformation();

const platform = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  return travel_one.Platform;
});

const totalP = computed(() => {
  const travel_one = JSON.parse(Cookies.get('I'));
  const travel_two = Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null;

  if (travel_one && travel_two) return travel_one.Preco + travel_two.Preco;
  return travel_one.Preco;
});

const optionsSelect = computed(() => {
  return [
    {
      label: `Valor total (${totalP.value.toFixed(3)})`,
      value: totalP.value.toFixed(3),
    },
    {
      label: `2 Parcelas de (${(totalP.value / 2).toFixed(3)})`,
      value: (totalP.value / 2).toFixed(3),
    },
    {
      label: `3 Parcelas de (${(totalP.value / 3).toFixed(3)})`,
      value: (totalP.value / 3).toFixed(3),
    },
    {
      label: `4 Parcelas de (${(totalP.value / 4).toFixed(3)})`,
      value: (totalP.value / 4).toFixed(3),
    },
    {
      label: `5 Parcelas de (${(totalP.value / 5).toFixed(3)})`,
      value: (totalP.value / 5).toFixed(3),
    },
    {
      label: `6 Parcelas de (${(totalP.value / 6).toFixed(3)})`,
      value: (totalP.value / 6).toFixed(3),
    },
    {
      label: `7 Parcelas de (${(totalP.value / 7).toFixed(3)})`,
      value: (totalP.value / 7).toFixed(3),
    },
    {
      label: `8 Parcelas de (${(totalP.value / 8).toFixed(3)})`,
      value: (totalP.value / 8).toFixed(3),
    },
    {
      label: `9 Parcelas de (${(totalP.value / 9).toFixed(3)})`,
      value: (totalP.value / 9).toFixed(3),
    },
    {
      label: `10 Parcelas de R$${(totalP.value / 10).toFixed(3)}`,
      value: (totalP.value / 10).toFixed(3),
    },
  ];
});
</script>

<style scoped></style>
