<template>
  <div class="relative">
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <input
        ref="input"
        type="text"
        :value="value"
        :class="inputClassList"
        :placeholder="placeholder"
        @input="onInput($event.target.value)"
        @keydown="onKeydown"
        @blur="onBlur"
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
      class="absolute right-0 mt-2 w-full rounded-md z-50 overflow-y-scroll"
      style="max-height: 200px"
    >
      <ul class="py-1 rounded-md bg-white">
        <li
          v-for="(opt, index) in options"
          :key="index"
          :ref="
            (el) => {
              optionsList[index] = el;
            }
          "
          tabindex="0"
          class="autocomplete-item px-4 py-2 text-sm text-gray-700 cursor-pointer"
          :class="{ 'bg-gray-200': arrowCounter === index }"
          @click="onSelect()"
          @mouseover="setArrowCounter(index)"
        >
          <div class="flex">
            <p>
              {{ opt['ciudade'] }} - {{ opt['aeroporto'] }} (<span
                class="font-normal"
                v-html="opt['iata_highligthed'] || opt['iata']"
              />)
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, ref, computed } from 'vue';
import { axiosClientAPI } from '@/plugins/axios';

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
  if (value.length > 0) {
    search(value);
  }
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
  axiosClientAPI.get(`api/v1/search-keyword/${query}`).then(({ data }) => {
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
    /* element['ciudade_highligthed'] = element['ciudade'].replace(
      query,
      '<span class="font-bold">$&</span>'
    ); */

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

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
