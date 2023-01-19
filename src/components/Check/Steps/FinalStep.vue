<template>
  <div>
    <div
      class="flex flex-col items-center justify-center pt-6 mx-auto space-y-6 pb-72 w-1/2 md:w-auto"
    >
      <div class="w-full">
        <TheSelect
          label="Estado *"
          :options="states"
          @select-value="auth.dataBuy.state = $event.value"
        />
      </div>

      <div class="w-full">
        <TheSelect
          label="Ciudade *"
          :options="cities"
          @select-value="auth.dataBuy.city = $event.value"
        />
      </div>

      <div class="w-full">
        <NumberParcelsToPay />
      </div>

      <div class="w-full">
        <TextArea
          placeholder="En caso necessite de atendimento e/ou serviços especiais, informe aqui....."
        />
      </div>

      <div class="w-full">
        <CheckInput>
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
import { useAuthStore } from '@/stores/auth';
//import TextInput from '@/components/FormUI/TextInput.vue';
import NumberParcelsToPay from '@/components/Check/NumberParcelsToPay.vue';
import TextArea from '@/components/FormUI/TextArea.vue';
import CheckInput from '@/components/FormUI/CheckInput.vue';
import TheSelect from '@/components/FormUI/TheSelect.vue';
import { onMounted, ref, watch } from 'vue';

onMounted(() => {
  getStates();
});

const auth = useAuthStore();
const states = ref([]);
const cities = ref([
  {
    label: 'Thinking...',
    value: 0,
  },
]);

watch(
  () => auth.dataBuy.state,
  async (newStates) => {
    cities.value = [
      {
        label: 'Thinking...',
        value: 0,
      },
    ]
    if (newStates.length > 0) {
      try {
        await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${newStates}/distritos`
        )
          .then((response) => response.json())
          .then((data) => {
            cities.value = data.map((o) => ({
              label: o.nome,
              value: o.nome,
            }));
          });
      } catch (error) {
        cities.value = [
          {
            label: 'Error! Could not reach the API',
            value: 0,
          },
        ];
      }
    }
  }
);

const getStates = async () => {
  await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((response) => response.json())
    .then((data) => {
      states.value = data
        .map((o) => ({
          label: `${o.nome} / ${o.sigla}`,
          value: o.sigla,
        }))
        .sort((a, b) => {
          if (a.label > b.label) {
            return 1;
          }
          if (a.label < b.label) {
            return -1;
          }
          return 0;
        });
    });
};
</script>

<style scoped></style>
