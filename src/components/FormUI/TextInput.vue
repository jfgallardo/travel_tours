<template>
  <div>
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
          label
      }}</span>
      <Field :name="nameValue" :rules="rulesValue" :class="inputClassList" :placeholder="placeholder"
        :type="typeValue" v-maska="maska" />
      <Transition>
        <ErrorMessage :name="nameValue" class="text-red-500 text-sm absolute -bottom-6 left-0" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { computed } from "vue";

const props = defineProps({
  nameValue: {
    type: String,
    default: "",
  },
  rulesValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  typeValue: {
    type: String,
    default: "text",
  },
  maska: {
    type: [String, Object],
  },
});

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

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
