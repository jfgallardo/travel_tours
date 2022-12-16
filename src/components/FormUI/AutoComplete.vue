<template>
  <div class="relative">
    <div class="relative">
      <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
          label
        }}</span>
      <input
          ref="input"
          v-debounce:500ms="onInput"
          :class="inputClassList"
          :placeholder="placeholder"
          :value="value"
          type="text"
          @blur="onBlur"
          @keydown="onKeydown"
      />

      <div
          v-if="loading"
          class="absolute top-4 inset-y-0 right-0 pr-3 py-1 rounded-md flex items-center justify-center space-x-1.5">
        <svg
            class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
          <path
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
        </svg>
        <span class="animate-pulse text-sm">Searching...</span>
      </div>

      <button
          v-if="keyword"
          class="absolute -top-6 inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 focus:outline-none hover:text-gray-400"
          type="button"
          @click="onClear()"
      >
        <svg
            class="h-2 w-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 8 8"
        >
          <path
              d="M1 1l6 6m0-6L1 7"
              stroke-linecap="round"
              stroke-width="1.5"
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
            :class="{ 'bg-gray-200': arrowCounter === index }"
            class="autocomplete-item px-4 py-2 text-sm text-gray-700 cursor-pointer"
            tabindex="0"
            @click="onSelect()"
            @mouseover="setArrowCounter(index)"
        >
          <div class="flex">
            <p>
              <span
                  class="font-normal"
                  v-html="opt['nome_highligthed'] || opt.Nome"
              />
              (<span
                class="font-normal"
                v-html="opt['iata_highligthed'] || opt.Iata"
            />)
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeUpdate, ref} from 'vue';
import {axiosClientAPI} from '@/plugins/axios';

onBeforeUpdate(() => {
  optionsList.value = [];
});

defineProps({
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
const loading = ref(false);

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
    loading.value = false
    resetOptions();
  } else if (value.length > 2) {
    loading.value = false
    search(value);
  } else {
    loading.value = true
  }
};

const onSelect = () => {
  const selected = options.value[arrowCounter.value];

  if (selected) {
    emit('select', selected.Iata);
    keyword.value = `${selected.Cidade} | ${selected.Iata}`;
    emitInput(keyword.value);
    resetOptions();
    resetArrowCounter();
  }
};

const emitInput = (value) => {
  emit('input', value);
};

const search = (query) => {
  loading.value = true;
  axiosClientAPI.get(`api/v1/search-keyword/${query}`).then(({data}) => {
    options.value = data.Data;
    highlightOptions();
  }).finally(() => {
    loading.value = false
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
  loading.value = false
  emit('select', '');
  emitInput('');
  resetKeyword();
  resetOptions();
};

const highlightOptions = () => {
  const search = keyword.value;
  const query = new RegExp(search, 'i');

  options.value.forEach((element) => {
    element['nome_highligthed'] = element.Nome.replace(
        query,
        '<span class="font-bold">$&</span>'
    );

    element['iata_highligthed'] = element.Iata.replace(
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
