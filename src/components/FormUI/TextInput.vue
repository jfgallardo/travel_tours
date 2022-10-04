<template>
  <div>
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <input
        v-model="value"
        type="text"
        :class="inputClassList"
        v-maska="maska"
        :placeholder="placeholder"
        :disabled="disableField"
        @blur="$emit('onBlur', $event.target.value)"
      />
      <span class="text-red-500 text-sm absolute -bottom-5 left-2">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { toRef, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  name: {
    type: String,
  },
  label: {
    type: String,
    default: "",
  },
  maska: {
    type: [String, Object],
  },
  placeholder: {
    type: String,
    default: "",
  },
  disableField: {
    type: Boolean,
    default: false,
  },
});

const nameRef = toRef(props, "name");
const { errorMessage, value } = useField(nameRef, undefined);

const inputClassList = computed(() => {
  return [
    "appearance-none w-full transition duration-150 ease-in-out",
    getTextSizeClass.value,
    getTextColorClass.value,
    getBorderColorClass.value,
    getPaddingClass.value,
  ];
});

const getTextSizeClass = computed(() => {
  return "text-sm leading-5";
});
const getTextColorClass = computed(() => {
  return "text-gray-800 placeholder-gray-400";
});
const getBorderColorClass = computed(() => {
  return "focus:outline-none border border-gray-400 focus:border-blue-400";
});
const getPaddingClass = computed(() => {
  return "h-10 pr-6 pl-4 pt-9 pb-4";
});
</script>
