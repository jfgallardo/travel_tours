<template>
  <div>
    <Select
      class="pt-4"
      :label="t('roundTripForm.labelClassecabine')"
      :selected="searchOptionsVoo.cabin"
      :options="options"
      @select-value="
        (e) => {
          searchOptionsVoo.cabin = e;
        }
      "
    />
  </div>
</template>

<script setup>
import Select from '@/components/FormUI/TheSelect.vue';
import { useI18n } from 'vue-i18n';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';

const { t } = useI18n();
const searchOptionsVoo = useSearchOptionsVooStore();

const options = [
  { label: 'Econômica', value: 0 },
  //  { label: 'Econômica Premium', value: 'W' },
  { label: 'Executiva', value: 2 },
  { label: 'Primeira Classe', value: 1 },
  // { label: 'Econômica + Premium', value: 'P' },
  { label: 'Todas', value: null },
];
</script>

<style scoped></style>
