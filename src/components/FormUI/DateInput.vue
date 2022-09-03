<template>
  <div>
    <!-- <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <input
        type="date"
        :class="inputClassList"
        :min="dateMin"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div> -->
    <div class="relative">
      <div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
          label
      }}</span>
      <input type="text" :class="inputClassList" :min="dateMin" :value="modelValue"
        @input="emitValue($event.target.value)">
      <span v-if="error" class="text-sm absolute left-2 text-red-400">Fecha Invalida</span>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";

const error = ref(false)
const emit = defineEmits(['update:modelValue'])
const localV = ref("")

const props = defineProps({
  dateMin: {
    type: String,
    default: new Date().toLocaleDateString("en-CA"),
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emitValue = (value) => {
  localV.value = value
  emit('update:modelValue', value)
}

watch(localV, async (newQuestion, oldQuestion) => {
  let regexp = /^(\d{4})(\/|-)(0[1-9]|1[0-2])\2([0-2][0-9]|3[0-1])$/;

  if (!regexp.test(newQuestion)) {
    console.log('true')
    error.value = true
  } else {
    console.log('false')
    error.value = false
  }
})

const inputClassList = computed(() => {
  return [
    "appearance-none w-full block transition duration-150 ease-in-out",
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


<!--  <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
        <input datepicker type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date">
      </div> -->