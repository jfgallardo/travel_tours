<template>
  <div>
    <TextInput
      v-model="passportLocal"
      :label="$t('passport.noPasaporte')"
      maska="Z"
      tokens="Z:[A-Za-z0-9]:multiple"
    />
  </div>
  <div>
    <DateInput v-model="dateIssueLocal" :label="$t('passport.dateOfIssue')" />
  </div>
  <div>
    <Select
      :options="countries"
      :label="$t('passport.countryOfIssue')"
      :selected="sCountryOfIssue"
      @select-value="$emit('update:countryOfIssue', $event)"
    />
  </div>
  <div>
    <Select
      :options="countries"
      :label="$t('passport.countryOfResidence')"
      :selected="sCountryOfResidence"
      @select-value="$emit('update:countryOfResidence', $event)"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Select from '@/components/FormUI/TheSelect.vue';

const emit = defineEmits([
  'update:passport',
  'update:validateDate',
  'update:dateIssue',
  'update:countryOfIssue',
  'update:countryOfResidence',
]);

onMounted(() => {
  getCountries();
});

const sCountryOfResidence = ref(props.countryOfResidence);
const sCountryOfIssue = ref(props.countryOfIssue);

const props = defineProps({
  passport: {
    type: String,
    default: '',
  },
  validateDate: {
    type: String,
    default: '',
  },
  dateIssue: {
    type: String,
    default: '',
  },
  countryOfIssue: {
    type: Object,
    default: () => {},
  },
  countryOfResidence: {
    type: Object,
    default: () => {},
  },
});

const passportLocal = computed({
  get() {
    return props.passport;
  },
  set(value) {
    emit('update:passport', value);
  },
});

const validateDateLocal = computed({
  get() {
    return props.validateDate;
  },
  set(value) {
    emit('update:validateDate', value);
  },
});

const dateIssueLocal = computed({
  get() {
    return props.dateIssue;
  },
  set(value) {
    emit('update:dateIssue', value);
  },
});

const countries = ref([]);

const getCountries = async () => {
  await fetch('https://servicodados.ibge.gov.br/api/v1/paises/')
    .then((response) => response.json())
    .then((data) => {
      countries.value = data.map((o) => {
        return {
          label: o.nome.abreviado,
          value: o.id['ISO-3166-1-ALPHA-3'],
        };
      });
    });
};
</script>
<style scoped></style>
