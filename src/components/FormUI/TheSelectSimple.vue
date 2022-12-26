<template>
  <div>
    <div
      ref="dropdownP"
      class="relative border border-t-0 border-b-0 border-r-0 border-gray-300"
    >
      <button
        :disabled="loading"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-labelledby="listbox-label"
        class="relative bg-white pr-10 py-3 text-left focus:outline-none sm:text-sm h-full w-full"
        type="button"
        @click="hiddenDropdown = !hiddenDropdown"
      >
        <span v-if="selected" class="ml-3 block truncate"> {{ selected.name }} </span>
        <div v-else class="ml-3 block truncate flex items-center space-x-1.5">
          <slot name="showSelected">
            <div
              v-if="loading"
              class="animate-spin h-6 w-6 border-0 border-t-2 rounded-full border-gray-500 mr-1.5"></div>
            <img v-else class="h-5 w-5" src="@/assets/ico/filter-search.svg">
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

      <Transition>
        <ul
          v-if="hiddenDropdown"
          v-click-outside
          aria-activedescendant="listbox-option-3"
          aria-labelledby="listbox-label"
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          role="listbox"
          tabindex="-1"
        >
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
              <span class="font-normal ml-3 block truncate">
                {{ op.name }}
              </span>
              </div>
            </li>
          </slot>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hiddenDropdown = ref(false);
const selected = ref(null);
const emit = defineEmits(["selectValue"]);
const dropdownP = ref(null);

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

const selectOption = (value) => {
  selected.value = value;
  emit("selectValue", value);
  hiddenDropdown.value = false;
};

const vClickOutside = {
  mounted: () => {
    document.addEventListener("click", clickOutListener);
  },
  unmounted: () => {
    document.removeEventListener("click", clickOutListener);
  }
};

const clickOutListener = (evt) => {
  if (!dropdownP.value.contains(evt.target)) {
    hide(selected.value);
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
