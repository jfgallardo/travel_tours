<template>
  <div>
    <div>
      <div ref="dropdownP">
        <div class="relative">
          <span class="absolute top-0 pl-3 mt-1 text-gray-400 text-sm">{{
            label
          }}</span>
          <div
            class="flex pt-6 pb-2 pl-5 pr-4 border-gray-400 focus:border-blue-400 w-full bg-white border text-left cursor-default focus:outline-none sm:text-sm"
            @click="hiddenDropdown = !hiddenDropdown"
          >
            <span v-if="selected" class="mr-5"> {{ selected.label }} </span>
            <span v-else class="mr-5 text-gray-500">{{ placeholder }}</span>
            <ChevronDown class="absolute right-0 pr-2 ml-2 cursor-pointer" />
          </div>
          <Transition>
            <div
              v-if="hiddenDropdown"
              v-click-outside
              class="bg-white border border-gray-300 py-1 mt-1 shadow-md rounded-md absolute z-30 w-full max-h-60 overflow-y-auto"
            >
              <ul>
                <li
                  v-for="op in options"
                  :key="op.value"
                  class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1"
                  @click="selectOption(op)"
                >
                  {{ op.label }}
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
import { ref, watch } from 'vue';
import ChevronDown from '@/components/Icons/ChevronDown.vue';

const hiddenDropdown = ref(false);
const selected = ref(props.selected);
const emit = defineEmits(['selectValue']);
const dropdownP = ref(null);
const placeholder = ref('')

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      {
        label: 'Sem dados',
        value: 'value_default_empty',
      },
    ],
  },
  label: {
    type: String,
    default: '',
  },
  selected: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.loading,
  (newX) => {
    newX ? placeholder.value = 'Loading...' : placeholder.value ='Seleccione valor'
  },
  { immediate: true }
);

const selectOption = (value) => {
  if (value.value !== 'value_default_empty') {
    selected.value = value;
    emit('selectValue', value);
    hiddenDropdown.value = false;
  }
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
  if (value) {
    selected.value = value;
    emit('selectValue', value);
    hiddenDropdown.value = false;
  }
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
