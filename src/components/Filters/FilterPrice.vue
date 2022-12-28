<template>
  <div>
    <div class="flex flex-col justify-center space-y-8 p-4 mx-auto">
      <label class="font-semibold text-lg text-center">Range of Price</label>
      <div class="flex">
        <input id="toSlider" step="10" type="range" :value="priceLocal" :min="minPrice" :max="maxPrice" @input="$emit('price', $event.target.value)"/>
      </div>
      <span class="text-center">{{minPriceFormatter}} - {{maxPriceFormatter}}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useCurrencyFormatter } from "@/composables/currencyFormatter";

defineEmits(['price'])

onMounted(() => {
  priceLocal.value = props.maxPrice
})

const props = defineProps({
  minPrice: {
    type: [Number, String],
    default: '100'
  },
  maxPrice: {
    type: [Number, String],
    default: '1000'
  }
});

const priceLocal = ref('')


const minPriceFormatter = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: props.minPrice
  });
})


const maxPriceFormatter = computed(() => {
  return useCurrencyFormatter({
    currency: "BRL",
    value: props.maxPrice
  });
})

</script>

<style scoped>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type=range]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 80%;
  position: absolute;
  background-color: rgba(16, 57, 208, 0.99);
  pointer-events: none;
}

</style>