<template>
  <div ref="container">
    <div class="relative">
      <span class="absolute top-0 pl-3 mt-1 text-gray-400 text-sm">{{
        label
      }}</span>
      <div
        ref="innerContainer"
        class="flex pt-6 pb-2 pl-5 pr-4 border-gray-400 focus:border-blue-400 w-full bg-white border text-left cursor-default focus:outline-none sm:text-sm"
        @click="hiddenDropdown === false ? handleClick() : handleHide()"
      >
        <div v-if="selected" class="mr-5">
          <span v-if="selected.label"> {{ selected.label }} </span>
          <span v-else>{{ selected }} </span>
        </div>
        <span v-else class="mr-5 text-gray-500">{{ placeholder }}</span>
        <ChevronDown class="absolute right-0 pr-2 ml-2 cursor-pointer" />
      </div>
      <Transition>
        <div
          ref="dropdown"
          v-click-outside
          role="listbox"
          tabindex="-1"
          class="bg-white border border-gray-300 py-1 mt-1 shadow-md rounded-md absolute z-10 w-full max-h-60 overflow-y-auto dropdownMenu"
        >
          <ul>
            <li
              v-for="op in options"
              :key="op.value || op"
              class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1"
              @click="selectOption(op)"
            >
              <span v-if="op.label">{{ op.label }}</span>
              <span v-else>{{ op }}</span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import ChevronDown from '@/components/Icons/ChevronDown.vue';
import { createPopper } from '@popperjs/core';

const hiddenDropdown = ref(false);
const selected = ref(props.selected);
const emit = defineEmits(['selectValue']);
const container = ref(null);
const placeholder = ref('');
const dropdown = ref(null);
const innerContainer = ref(null);

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
    newX
      ? (placeholder.value = 'Loading...')
      : (placeholder.value = 'Seleccione valor');
  },
  { immediate: true }
);

const selectOption = (value) => {
  if (value.value !== 'value_default_empty') {
    selected.value = value;
    emit('selectValue', value);
    hiddenDropdown.value = false;
    handleHide();
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
  if (!container.value.contains(evt.target)) {
    handleHide();
  }
};

const popperInstance = computed(() => {
  return createPopper(innerContainer.value, dropdown.value, {
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

const handleClick = () => {
  dropdown.value.setAttribute('data-show', '');
  popperInstance.value.update();
  hiddenDropdown.value = true;
};

const handleHide = () => {
  dropdown.value.removeAttribute('data-show');
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

.dropdownMenu {
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  z-index: 30;
  min-width: 8rem;
  padding: 0.5rem 0;
  display: none;
}

.dropdownMenu[data-show] {
  display: block;
}
</style>
