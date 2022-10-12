<template>
  <div>
    <div>
      <div class="container" ref="dropdownP">
        <div class="relative">
          <span class="absolute top-0 pl-3 mt-1 text-gray-400 text-sm">{{
            label
          }}</span>
          <div
            @click="hiddenDropdown = !hiddenDropdown"
            class="flex pt-6 pb-2 pl-5 pr-4 border-gray-400 focus:border-blue-400 w-full bg-white border text-left cursor-default focus:outline-none sm:text-sm"
          >
            <span class="flex items-center space-x-3">
              <span v-if="!selected">Selecionar reserva</span>
              <span v-else> {{ selected.id }} ({{ selected.route }})</span>
            </span>
            <ChevronDown class="ml-3 absolute right-0 pr-2 cursor-pointer" />
          </div>
          <Transition>
            <div
              class="bg-white border border-gray-300 py-1 shadow-md rounded-md absolute z-30"
              v-if="hiddenDropdown"
              v-click-outside
            >
              <ul>
                <li
                  v-for="op in options"
                  :key="op.id"
                  class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1"
                  @click="selectOption(op)"
                >
                  <span> {{ op.id }} ({{ op.route }})</span>
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
import { ref, onMounted } from 'vue';
import ChevronDown from '@/components/Icons/ChevronDown.vue';

onMounted(() => {
  selected.value = props.initOption;
});

const hiddenDropdown = ref(false);
const selected = ref(null);
const emit = defineEmits(['selectValue']);
const dropdownP = ref(null);

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
  initOption: {
    type: Object,
    default: null,
  },
});

const selectOption = (value) => {
  selected.value = value;
  emit('selectValue', value.id);
  hiddenDropdown.value = false;
};

const vClickOutside = {
  mounted: () => {
    document.addEventListener('click', clickOutListener);
  },
  unmounted: () => {
    document.removeEventListener('click', clickOutListener);
  },
};

const clickOutListener = (evt) => {
  if (!dropdownP.value.contains(evt.target)) {
    hide(selected.value);
  }
};

const hide = (value) => {
  selected.value = value;
  emit('selectValue', value.id);
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
