<template>
  <div>
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <input
        v-model="value"
        v-maska
        :data-maska="maska"
        :data-maska-tokens="tokens"
        :value="modelValue"
        :type="typeField"
        :class="inputClassList"
        :placeholder="placeholder"
        :disabled="disableField"
        @input="validateInput"
        @blur="$emit('onBlur', $event.target.value)"
      />
      <Transition>
        <div
          v-if="!valid"
          class="text-red-500 font-semibold text-sm absolute -bottom-5 pl-1"
        >
          <span v-for="(errorMessage, index) in errorMessages" :key="index">
            * {{ errorMessage }} &nbsp;
          </span>
        </div>
      </Transition>

      <span
        v-if="textR"
        class="absolute right-0 top-0 bg-blue-700 text-white px-2 py-0.5 font-serif text-sm rounded-l-md opacity-80"
      >
        {{ textR }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  maska: {
    type: [String, Object],
  },
  tokens: {
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
    default: '',
  },
  typeField: {
    type: String,
    default: 'text',
  },
  validations: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'isValid']);
const valid = ref(true);
const errorMessages = ref([]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const validateInput = () => {
  const messages = [];
  let isValid = true;

  Object.keys(props.validations).forEach((key) => {
    const validationFn = props.validations[key];
    const { valid: validationValid, message: validationMessage } = validationFn(
      props.modelValue
    );
    if (!validationValid) {
      messages.push(validationMessage);
      isValid = false;
    }
  });

  valid.value = isValid;
  emit('isValid', isValid);
  errorMessages.value = messages;
};

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

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
