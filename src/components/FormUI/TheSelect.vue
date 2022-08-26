<template>
  <div>
    <div>
      <div class="container">
        <div class="relative">
          <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
            label
          }}</span>
          <div
            @click="hiddenDropdown = !hiddenDropdown"
            class="flex pt-6 pb-2 pl-5 pr-4 border-gray-400 focus:border-blue-400 w-full bg-white border text-left cursor-default focus:outline-none sm:text-sm"
          >
            <span class="flex items-center space-x-3">
              <img
                v-if="selected.src"
                :src="selected.src"
                class="flex-shrink-0 h-6 w-6 rounded-full"
              />
              <span> {{ selected.name }} </span>
            </span>
            <ChevronDown class="ml-3 absolute right-0 pr-2 cursor-pointer" />
          </div>
          <Transition>
            <div
              class="bg-white border border-gray-300 py-1 shadow-md rounded-md absolute z-30"
              v-if="hiddenDropdown"
            >
              <ul>
                <li
                  v-for="op in options"
                  :key="op.value"
                  class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1"
                  @click="selectOption(op)"
                >
                  {{ op.name }}
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import ChevronDown from "@/components/Icons/ChevronDown.vue";

const hiddenDropdown = ref(false);
const selected = ref(props.options[0]);
const emit = defineEmits(["selectValue"]);

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
