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
      v-show="options.length"
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
          <div v-if="opt.nameCity" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            <span
              class="font-normal"
              v-html="opt['nameCity_highligthed'] || opt['nameCity']"
            />
          </div>

          <div v-else class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span
              class="font-normal"
              v-html="opt['nameAirport_highligthed'] || opt['nameAirport']"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, ref, computed } from "vue";

onBeforeUpdate(() => {
  optionsList.value = [];
});

const props = defineProps({
  searchMinLength: {
    type: Number,
    default: 3,
  },
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
});

const emit = defineEmits(["select", "input"]);

const input = ref(null);
const optionsList = ref([]);

let options = ref([]);
let keyword = ref("");
let arrowCounter = ref(0);

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

const onInput = (value) => {
  keyword.value = value;
  emitInput(value);
  if (value.length >= props.searchMinLength) {
    search(value);
  } else {
    resetOptions();
  }
};

const onSelect = () => {
  const selected = options.value[arrowCounter.value];

  if (selected) {
    if (selected.nameCity) {
      emit("select", selected.codeIataCity);
      keyword.value = `${selected["nameCity"]} | ${selected["codeIataCity"]}`;
    } else {
      emit("select", selected.codeIataAirport);
      keyword.value = `${selected["nameAirport"]} | ${selected["codeIataAirport"]}`;
    }
    emitInput(keyword.value);
    resetOptions();
    resetArrowCounter();
  }
};

const emitInput = (value) => {
  emit("input", value);
};

const search = (query) => {
  fetch(
    `https://aviation-edge.com/v2/public/autocomplete?key=b808a1-fd40a7&city=${query}`
  )
    .then((response) => response.json())
    .then((r) => {
      options.value = [];
      let airportsByCities = r.airportsByCities;
      let cities = r.cities;

      cities.filter((city) => {
        let airportsByCity = airportsByCities.filter((airport) => {
          return isMyAirport(airport, city);
        });
        options.value.push(city);
        options.value.push(...airportsByCity);
      });
      highlightOptions();
    });
};

const isMyAirport = (airport, city) => {
  return city.codeIataCity === airport.codeIataCity;
};

const resetKeyword = () => {
  keyword.value = "";
};

const fixScrolling = () => {
  optionsList.value[arrowCounter.value].scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
};

const resetOptions = () => {
  options.value = [];
};

const onClear = () => {
  emit("select", "");
  emitInput("");
  resetKeyword();
  resetOptions();
};

const highlightOptions = () => {
  const search = keyword.value;
  const query = new RegExp(search, "i");

  options.value.forEach((element) => {
    if (element.nameCity) {
      element["nameCity_highligthed"] = element["nameCity"].replace(
        query,
        '<span class="font-bold">$&</span>'
      );
    } else {
      element["nameAirport_highligthed"] = element["nameAirport"].replace(
        query,
        '<span class="font-bold">$&</span>'
      );
    }
  });
};

const onKeydown = (evt) => {
  if (!options.value.length) {
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
  if (tgt && tgt.classList.contains("autocomplete-item")) {
    return;
  }
  resetOptions();
  resetArrowCounter();
};
</script>

<style scoped></style>
