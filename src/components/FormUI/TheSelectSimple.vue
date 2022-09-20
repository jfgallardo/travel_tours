<template>
  <div>
    <div
      class="relative border border-t-0 border-b-0 border-r-0 border-gray-300"
      ref="dropdownP"
    >
      <button
        type="button"
        class="relative bg-white pr-10 py-3 text-left focus:outline-none sm:text-sm h-full w-full"
        @click="hiddenDropdown = !hiddenDropdown"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span class="ml-3 block truncate"> {{ selected.name }} </span>
        <span
          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <ChevronDown class="ml-3 absolute right-0 pr-2 cursor-pointer" />
        </span>
      </button>

      <Transition>
        <ul
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          v-if="hiddenDropdown"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
          v-click-outside
        >
          <li
            v-for="op in options"
            :key="op.value"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-200"
            id="listbox-option-0"
            role="option"
            @click="selectOption(op)"
          >
            <div class="flex items-center">
              <span class="font-normal ml-3 block truncate">
                {{ op.name }}
              </span>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import ChevronDown from "@/components/Icons/ChevronDown.vue";

const hiddenDropdown = ref(false);
const selected = ref(props.options[0]);
const emit = defineEmits(["selectValue"]);
const dropdownP = ref(null);

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
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
  },
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
