<template>
  <div class="flex items-start p-4 space-x-3.5">
    <div class="flex flex-col space-y-3.5">
      <span class="text-xs font-extrabold">Llegada a partir de: </span>
      <RadioInput
        v-for="option in arrivalString"
        :id="option.value"
        :key="option.value"
        v-model="itemSelectedArrival"
        :selected-value="itemSelectedArrival"
        :value="option.value"
        :name="nameArrivalDate"
        :label="option.label"
      />
    </div>

    <div class="flex flex-col space-y-3.5">
      <span class="text-xs font-extrabold">Salida a partir de: </span>
      <RadioInput
        v-for="option in departureString"
        :id="option.value"
        :key="option.value"
        v-model="itemSelectedDeparture"
        :selected-value="itemSelectedDeparture"
        :value="option.value"
        :name="nameDepartureDate"
        :label="option.label"
      />
    </div>
  </div>

  <div>
    <button
      class="float-right bg-none font-semibold px-3.5 py-2.5"
      @click="clear"
    >
      Limpiar
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import RadioInput from '@/components/FormUI/RadioInput.vue';

const emit = defineEmits(['selectArrival', 'selectDeparture']);

const props = defineProps({
  arrivalDate: {
    type: Array,
    default: () => [],
  },
  departureDate: {
    type: Array,
    default: () => [],
  },
  nameArrivalDate: {
    type: String,
    default: '',
  },
  nameDepartureDate: {
    type: String,
    default: '',
  },
});

const itemSelectedArrival = ref('');
const itemSelectedDeparture = ref('');

const arrivalString = computed(() => {
  return props.arrivalDate.map((item) => {
    const fecha = new Date(item);
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';
    const horas12 = horas % 12 || 12;
    const horaAmPm = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${ampm}`;
    return {
      label: horaAmPm,
      value: item,
    };
  });
});

const departureString = computed(() => {
  return props.departureDate.map((item) => {
    const fecha = new Date(item);
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';
    const horas12 = horas % 12 || 12;
    const horaAmPm = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${ampm}`;
    return {
      label: horaAmPm,
      value: item,
    };
  });
});

const clear = () => {
  itemSelectedArrival.value = '';
  itemSelectedDeparture.value = '';
};

watch(
  () => itemSelectedArrival.value,
  (value) => {
    emit('selectArrival', value);
  },
  { immediate: true }
);

watch(
  () => itemSelectedDeparture.value,
  (value) => {
    emit('selectDeparture', value);
  },
  { immediate: true }
);
</script>

<style scoped></style>
