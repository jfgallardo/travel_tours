<template>
  <div ref="fullContainer">
    <div
      class="relative border border-t-0 border-b-0 border-r-0 border-gray-300"
    >
      <button
        ref="button"
        :disabled="loading"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-labelledby="listbox-label"
        class="relative bg-white py-3 text-left focus:outline-none text-sm xl:text-base h-full w-full"
        type="button"
        @click="toggle === false ? handleClick($event) : handleHide($event)"
      >
        <span v-if="selected" class="ml-3 block"> {{ selected.name }} </span>
        <div v-else class="px-1 block flex items-center space-x-1.5">
          <slot name="showSelected">
            <div
              v-if="loading"
              class="animate-spin h-4 w-4 border-0 border-t-2 rounded-full border-gray-500 mr-1.5"></div>
            <img v-else class="h-4 w-4" src="@/assets/ico/filter-search.svg">
            <span class="text-gray-500">{{ placeholder }}</span>
          </slot>
        </div>

        <button
          v-if="selected"
          class="text-gray-400 hover:text-gray-800 ml-3 absolute inset-y-0 right-0 right-2.5 flex items-center cursor-default"
          type="button"
          @click="clearFilter"
        >
          <svg
            class="h-2.5 w-2.5"
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
      </button>
    </div>
    <div>
      <Transition>
        <div
          ref="dropdown"
          v-click-outside
          aria-activedescendant="listbox-option-3"
          aria-labelledby="listbox-label"
          class="absolute z-10 mt-1 bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm dropdownMenu"
          role="listbox"
          tabindex="-1"
        >
          <div id="arrow" data-popper-arrow></div>
          <slot>
            <li
              v-for="op in options"
              id="listbox-option-0"
              :key="op.value"
              class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-200"
              role="option"
              @click="selectOption(op)"
            >
              <div class="flex items-center">
              <span class="font-normal ml-3 block">
                {{ op.name }}
              </span>
              </div>
            </li>
          </slot>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { createPopper } from "@popperjs/core";

const hiddenDropdown = ref(false);
const selected = ref(null);
const emit = defineEmits(["selectValue"]);

const button = ref(null);
const dropdown = ref(null);
const fullContainer = ref(null);
const toggle = ref(false);

defineProps({
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const vClickOutside = {
  mounted: () => {
    document.addEventListener("click", clickOutListener);
  },
  unmounted: () => {
    document.removeEventListener("click", clickOutListener);
  }
};


const selectOption = (value) => {
  selected.value = value;
  emit("selectValue", value);
  hiddenDropdown.value = false;
};


const clickOutListener = (evt) => {
  if (!fullContainer.value.contains(evt.target)) {
    handleHide(evt);
  }
};

const hide = (value) => {
  selected.value = value;
  emit("selectValue", value);
  hiddenDropdown.value = false;
};
const clearFilter = () => {
  selected.value = null;
};

const popperInstance = computed(() => {
  return createPopper(button.value, dropdown.value, {
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          padding: 4,
        },
      },
      {
        name: 'flip',
        options: {
          padding: 4,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  });
});

const handleClick = (e) => {
  dropdown.value.setAttribute('data-show', '');
  popperInstance.value.update();
  toggle.value = true;
};

const handleHide = (e) => {
  dropdown.value.removeAttribute('data-show');
  toggle.value = false;
};
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

.dropdownMenu {
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  display: none;
}

.dropdownMenu[data-show] {
  display: block;
}
</style>
