<template>
  <div class="relative">
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <input
        type="text"
        ref="input"
        :value="value"
        :class="inputClassList"
        @input="onInput($event.target.value)"
        @keydown="onKeydown"
        @blur="onBlur"
        :placeholder="placeholder"
      />

      <button
        v-if="keyword"
        type="button"
        class="absolute top-0 inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 focus:outline-none hover:text-gray-400"
        @click="onClear()"
      >
        <svg
          class="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path
            stroke-linecap="round"
            stroke-width="1.5"
            d="M1 1l6 6m0-6L1 7"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="options.length"
      class="absolute right-0 mt-2 w-full rounded-md shadow-lg z-50 overflow-y-scroll"
      style="max-height: 200px"
    >
      <ul class="py-1 rounded-md bg-white shadow-xs">
        <li
          v-for="(opt, index) in options"
          :key="index"
          tabindex="0"
          @click="onSelect()"
          @mouseover="setArrowCounter(index)"
          class="autocomplete-item block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer"
          :class="{ 'bg-gray-200': arrowCounter === index }"
          :ref="
            (el) => {
              optionsList[index] = el;
            }
          "
        >
          <div class="flex items-center justify-start">
            <span
              class="font-normal"
              v-html="opt['ciudade_highligthed'] || opt['ciudade']"
            />

            &nbsp;
            <span class="hidden md:block text-center">
              - {{ opt['aeroporto'] }}</span
            >

            <span
              >&nbsp;(
              <span
                class="font-normal"
                v-html="opt['iata_highligthed'] || opt['iata']"
              />
              )
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, ref, computed } from 'vue';
import { axiosLocalAPI } from '@/plugins/axios';

onBeforeUpdate(() => {
  optionsList.value = [];
});

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['select', 'input']);

const input = ref(null);
const optionsList = ref([]);

let options = ref([]);
let keyword = ref('');
let arrowCounter = ref(0);

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

const onInput = (value) => {
  keyword.value = value;
  emitInput(value);
  if (value.length === 0) {
    resetOptions();
  }
  search(value);
};

const onSelect = () => {
  const selected = options.value[arrowCounter.value];

  if (selected) {
    emit('select', selected.iata);
    keyword.value = `${selected['ciudade']} | ${selected['iata']}`;
    emitInput(keyword.value);
    resetOptions();
    resetArrowCounter();
  }
};

const emitInput = (value) => {
  emit('input', value);
};

const search = (query) => {
  axiosLocalAPI.get(`v1/search-keyword/${query}`).then(({ data }) => {
    options.value = data;
    highlightOptions();
  });
};

const resetKeyword = () => {
  keyword.value = '';
};

const fixScrolling = () => {
  optionsList.value[arrowCounter.value].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start',
  });
};

const resetOptions = () => {
  options.value = [];
};

const onClear = () => {
  emit('select', '');
  emitInput('');
  resetKeyword();
  resetOptions();
};

const highlightOptions = () => {
  const search = keyword.value;
  const query = new RegExp(search, 'i');

  options.value.forEach((element) => {
    element['ciudade_highligthed'] = element['ciudade'].replace(
      query,
      '<span class="font-bold">$&</span>'
    );

    element['iata_highligthed'] = element['iata'].replace(
      query,
      '<span class="font-bold">$&</span>'
    );
  });
};

const onKeydown = (evt) => {
  if (!options.value.length) {
    return;
  }

  switch (evt.code) {
    case 'ArrowDown':
      evt.preventDefault();
      onArrowDown();
      break;
    case 'ArrowUp':
      evt.preventDefault();
      onArrowUp();
      break;
    case 'Enter':
      onSelect();
      break;
    case 'Escape':
      onEsc();
      break;
  }
};

const onArrowDown = () => {
  if (arrowCounter.value < options.value.length - 1) {
    arrowCounter.value += 1;
  }
  fixScrolling();
};

const onArrowUp = () => {
  if (arrowCounter.value > 0) {
    arrowCounter.value -= 1;
  }
  fixScrolling();
};

const setArrowCounter = (index) => {
  arrowCounter.value = index;
};
const resetArrowCounter = () => {
  arrowCounter.value = 0;
};

const onEsc = () => {
  input.value.blur();
  resetArrowCounter();
  resetOptions();
};

const onBlur = (evt) => {
  const tgt = evt.relatedTarget;
  if (tgt && tgt.classList.contains('autocomplete-item')) {
    return;
  }
  resetOptions();
  resetArrowCounter();
};
</script>

<style scoped></style>

<!-- <template>
  <div class="relative">
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <input
        type="text"
        ref="input"
        :value="keyword"
        :class="inputClassList"
        @input="onInput($event.target.value)"
        @keydown="onKeydown"
        @blur="onBlur"
        :placeholder="placeholder"
      />

      <button
        v-if="keyword"
        type="button"
        class="absolute top-0 inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 focus:outline-none hover:text-gray-400"
        @click="onClear()"
      >
        <svg
          class="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path
            stroke-linecap="round"
            stroke-width="1.5"
            d="M1 1l6 6m0-6L1 7"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="mutableOptions.length"
      class="absolute right-0 mt-2 w-full rounded-md shadow-lg z-50 overflow-y-scroll"
      style="max-height: 200px"
    >
      <ul class="py-1 rounded-md bg-white shadow-xs">
        <li
          v-for="(opt, index) in mutableOptions"
          :key="index"
          tabindex="0"
          @click="onSelect()"
          @mouseover="setArrowCounter(index)"
          class="autocomplete-item block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer"
          :class="{ 'bg-gray-200': arrowCounter === index }"
          :ref="
            (el) => {
              optionsList[index] = el;
            }
          "
        >
          <div v-if="opt.nameCity" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>

            <span
              class="font-normal"
              v-html="opt['nameCity_highligthed'] || opt['nameCity']"
            />
          </div>

          <div v-else class="flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>

            <span
              class="font-normal"
              v-html="opt[`${labelKey}_highlighted`] || opt[labelKey]"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, ref, computed, watch } from "vue";
import * as _ from "lodash"
import endpoint from "@/utils/endPointIata";

onBeforeUpdate(() => {
  optionsList.value = [];
});

/* PROPS */
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  labelKey: {
    type: String,
    default: "",
  },
  valueKey: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["select", "input", "shouldSearch"]);

const input = ref(null);
const optionsList = ref([]);

let keyword = ref("");
let arrowCounter = ref(0);
let originalOptions = ref([]);

watch(
  () => props.value,
  (first, second) => {
    keyword.value = first;
  }
);

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

/* METHODS */
const onInput = (vl) => {
  keyword.value = vl;
  emitInput();

  if (vl.length >= 3) {
    if (!originalOptions.value.length) {
      endpoint(vl).then(function(values) {
        originalOptions.value = _.unionBy(values[0].data.cities, values[0].data.airportsByCities, 'codeIataAirport')
        originalOptions.value.unshift(values[1].data[0])
  }).catch((error) => {console.log(error)})
  
    } else {
      searchInternally();
    }
  } else {
    resetOptions();
  }
};

const searchInternally = () => {
  const search = keyword.value;
  originalOptions.value = originalOptions.value.filter(
    (o) => o[props.labelKey].toLowerCase().search(search.toLowerCase()) >= 0
  );
  highlightOptions();
};

const highlightOptions = () => {
  const search = keyword.value;
  const query = new RegExp(search, "i");

  originalOptions.value.forEach((element) => {
    element[`${props.labelKey}_highlighted`] = element[props.labelKey].replace(
      query,
      '<span class="font-bold">$&</span>'
    );
  });
};

const resetOptions = () => {
  originalOptions.value = [];
};

const onKeydown = (evt) => {
  if (!originalOptions.value.length) {
    return;
  }

  switch (evt.code) {
    case "ArrowDown":
      evt.preventDefault();
      onArrowDown();
      break;
    case "ArrowUp":
      evt.preventDefault();
      onArrowUp();
      break;
    case "Enter":
      onSelect();
      break;
    case "Escape":
      onEsc();
      break;
  }
};

const onEsc = () => {
  input.value.blur();
  resetArrowCounter();
  resetOptions();
};

const onArrowDown = () => {
  if (arrowCounter.value < originalOptions.value.length - 1) {
    arrowCounter.value += 1;
  }
  fixScrolling();
};

const onArrowUp = () => {
  if (arrowCounter.value > 0) {
    arrowCounter.value -= 1;
  }
  fixScrolling();
};

const onBlur = (evt) => {
  const tgt = evt.relatedTarget;
  if (tgt && tgt.classList.contains("autocomplete-item")) {
    return;
  }
  resetOptions();
  resetArrowCounter();
};

const setArrowCounter = (index) => {
  arrowCounter.value = index;
};

const fixScrolling = () => {
  optionsList.value[arrowCounter.value].scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
};

const resetArrowCounter = () => {
  arrowCounter.value = 0;
};

const onSelect = () => {
  const selected = originalOptions.value[arrowCounter.value];
  const selectedOption = props.options.find(
    (o) => o[props.valueKey] === selected[props.valueKey]
  );

  if (selectedOption) {
    emit("select", selectedOption);
    keyword.value = selectedOption[props.labelKey];
    emitInput();
    resetOptions();
    resetArrowCounter();
  }
};

const emitInput = () => {
  emit("input", keyword.value);
};

const resetKeyword = () => {
  keyword.value = "";
  emitInput();
};

const onClear = () => {
  emit("select", null);
  resetKeyword();
  resetOptions();
};
</script>

<style scoped></style> -->
