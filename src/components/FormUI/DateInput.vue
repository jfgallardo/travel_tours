<template>
  <DatePicker
    ref="calendar"
    v-model.string="value"
    mode="date"
    :min-date="minDateShow"
    :popover="false"
    title-position="left"
    :attributes="attributes"
    :locale="locale"
  >
    <template #default="{ togglePopover, inputValue, inputEvents }">
      <div class="w-full">
        <div class="relative">
          <div
            class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none"
          >
            <CalendarIcon class="h-5 w-5" />
          </div>
          <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
            $t(label)
          }}</span>
          <input
            :value="inputValue"
            type="text"
            :class="inputClassList"
            readonly
            @click="togglePopover"
            v-on="inputEvents"
          />
        </div>
      </div>
    </template>
  </DatePicker>
</template>
<script setup>
import { computed, ref } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { CalendarIcon } from '@heroicons/vue/24/solid';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  minDateShow: {
    type: [Date, String, Number],
    default: new Date(),
  },
});

const emit = defineEmits(['update:modelValue']);
const calendar = ref(null);
const attributes = ref([]);
const { locale } = useI18n();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputClassList = computed(() => {
  return [
    'appearance-none w-full block transition duration-150 ease-in-out',
    getTextSizeClass.value,
    getTextColorClass.value,
    getBorderColorClass.value,
    getPaddingClass.value,
  ];
});

const getTextSizeClass = computed(() => {
  return 'text-sm leading-5';
});
const getTextColorClass = computed(() => {
  return 'text-gray-800 placeholder-gray-400';
});
const getBorderColorClass = computed(() => {
  return 'focus:outline-none border border-gray-400 focus:border-blue-400';
});
const getPaddingClass = computed(() => {
  return 'h-10 pr-6 pl-4 pt-9 pb-4';
});
</script>
