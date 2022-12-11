<template>
<div>
  <table class="table-fixed border-2 border-gray-200 w-full border-spacing-2 border-separate">
    <tbody>
    <tr>
      <td>
        <div>
          <h3 class="font-semibold px-5">Informações do passageiro</h3>
        </div>
      </td>
    </tr>
    <tr>
      <td class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2">
        <template v-for="(i, index) in informationAdults" :key="index">
          <CollapseAccording class="w-full">
            <template #header> {{ t('adults') }} #{{index+1}}</template>
            <template #body>
              <form class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4 w-full">
                <Select :options="tratamentoOptions" label="Tratamento" :selected="tratamento"/>
                <TextInput v-model="i.name" label="Primeiro Nome *"/>
                <TextInput v-model="i.last_name" label="Sobrenome Completo *"/>
                <TextInput v-model="i.cpf_number" label="CPF *" />
                <DateInput v-model="i.birthday" label="Date Nascimento *" />
              </form>
            </template>
          </CollapseAccording>
        </template>
        <div v-if="searchOpions.teenagers > 0">
          <template v-for="(i, index) in informationTeenagers" :key="index">
            <CollapseAccording class="w-full">
              <template #header> {{ t('children') }} #{{index+1}}</template>
              <template #body>
                <form class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4 w-full">
                  <Select :options="tratamentoOptions" label="Tratamento" :selected="tratamento"/>
                  <TextInput v-model="i.name" label="Primeiro Nome *"/>
                  <TextInput v-model="i.last_name" label="Sobrenome Completo *"/>
                  <TextInput v-model="i.cpf_number" label="CPF *" />
                  <DateInput v-model="i.birthday" label="Date Nascimento *" />
                </form>
              </template>
            </CollapseAccording>
          </template>
        </div>
        <div v-if="searchOpions.babies > 0">
          <template v-for="(i, index) in informationBabies" :key="index">
            <CollapseAccording class="w-full">
              <template #header> {{ t('babies') }} #{{index+1}}</template>
              <template #body>
                <form class="grid grid-cols-2 grid-rows-3 xl:grid-cols-3 xl:grid-rows-2 gap-4 w-full">
                  <Select :options="tratamentoOptions" label="Tratamento" :selected="tratamento"/>
                  <TextInput v-model="i.name" label="Primeiro Nome *"/>
                  <TextInput v-model="i.last_name" label="Sobrenome Completo *"/>
                  <TextInput v-model="i.cpf_number" label="CPF *" />
                  <DateInput v-model="i.birthday" label="Date Nascimento *" />
                </form>
              </template>
            </CollapseAccording>
          </template>
        </div>
        <div class="flex items-center justify-center">
          <RouterLink :to="{name: 'CheckPage'}" class="bg-blue-700 hover:bg-blue-800 text-white px-12 py-2">Finalizar Compra</RouterLink>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script setup>
import CollapseAccording from "@/components/Static/CollapseAccording.vue";
import Select from "@/components/FormUI/TheSelect.vue";
import {onMounted, ref} from "vue";
import TextInput from "@/components/FormUI/TextInput.vue";
import DateInput from "@/components/FormUI/DateInput.vue";
import {useSearchOptionsVooStore} from "@/stores/searchOptionsVoo";
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router'

onMounted(() => {
  getArrayData();
})
const { t } = useI18n();
const searchOpions = useSearchOptionsVooStore()
const tratamentoOptions = [
  { label: 'Brasileiro(a)', value: 'Brasileiro(a)' },
]
const tratamento = ref({ label: 'Brasileiro(a)', value: 'Brasileiro(a)' })

const informationAdults = ref([])
const informationTeenagers = ref([])
const informationBabies = ref([])

const getArrayData = () => {
  for (let i = 0; i < searchOpions.adults; i++) {
    informationAdults.value.push({
      treatment: '',
      nome: '',
      last_name: '',
      cpf_number: '',
      birthday: ''
    })
  }

  if (searchOpions.teenagers > 0) {
    for (let i = 0; i < searchOpions.teenagers; i++) {
      informationTeenagers.value.push({
        treatment: '',
        nome: '',
        last_name: '',
        cpf_number: '',
        birthday: ''
      })
    }
  }
  if (searchOpions.babies > 0) {
    for (let i = 0; i < searchOpions.babies; i++) {
      informationBabies.value.push({
        treatment: '',
        nome: '',
        last_name: '',
        cpf_number: '',
        birthday: ''
      })
    }
  }

}

</script>

<style scoped>

</style>