<template>
  <div>
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <input
        v-model="value"
        v-maska="maska"
        :value="modelValue"
        :type="typeField"
        :class="inputClassList"
        :placeholder="placeholder"
        :disabled="disableField"
        @blur="$emit('onBlur', $event.target.value)"
      />
      <span class="text-red-500 text-sm absolute -bottom-5 left-2">{{
        errorMessage
      }}</span>
      <span v-if="textR" class="absolute right-0 top-0 bg-blue-700 text-white px-2 py-0.5 font-serif text-sm rounded-l-md opacity-80">
        {{textR}}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';
import { toRef, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: '',
  },
  maska: {
    type: [String, Object],
  },
  placeholder: {
    type: String,
    default: '',
  },
  disableField: {
    type: Boolean,
    default: false,
  },
  textR: {
    type: String,
    default: ''
  },
  typeField: {
    type: String,
    default: "text"
  }
});

const nameRef = toRef(props, 'name');
const { errorMessage, value } = useField(nameRef, undefined);

const inputClassList = computed(() => {
  return [
    'appearance-none w-full transition duration-150 ease-in-out',
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
