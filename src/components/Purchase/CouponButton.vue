<template>
  <div>
    <div class="relative">
      <span class="text-gray-800 font-bold text-sm">{{
          label
        }}</span>
      <input
          v-model="value"
          v-maska="maska"
          name="coupon"
          type="text"
          :class="inputClassList"
          :placeholder="placeholder"
          :disabled="disableField"
          @blur="coupon = $event.target.value"
      />
      <button class="text-white bg-blue-700 hover:bg-blue-800 absolute right-0 h-10 w-10 pl-3" @click="setCoupon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>
      <span class="text-red-500 text-sm absolute -bottom-5 left-2">{{
          errors.coupon
        }}</span>
    </div>
  </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { computed } from 'vue';
import Toastify from "toastify-js";

defineProps({
  label: {
    type: String,
    default: '',
  },
  maska: {
    type: [String, Object],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disableField: {
    type: Boolean,
    default: false,
  },
});

const simpleSchema = {
  coupon(value) {
    if (!value) {
      return 'Este campo não pode estar vazio';
    }
    return true;
  },
};

const { errors, handleSubmit  } = useForm({
  validationSchema: simpleSchema,
});

const { value } = useField('coupon');
const setCoupon = handleSubmit( values => {
  Toastify({
    text: `Cupom ${values.coupon} aplicado`,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right,  #0BAB64, #3BB78F)',
    },
    onClick: function () {},
  }).showToast();
})

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
  return 'h-10';
});
</script>
