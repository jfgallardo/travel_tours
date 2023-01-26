<template>
  <div>
    <div>
      <div ref="fullContainer">
        <div class="relative">
          <span
            v-if="label"
            class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm"
            >{{ label }}</span
          >
          <button
            ref="button"
            aria-expanded="false"
            class="w-full"
            @click="toggle === false ? handleClick() : handleHide()"
          >
            <slot name="selected"></slot>
          </button>
          <Transition name="fade">
            <div ref="dropdown" v-click-outside class="dropdownMenu w-full">
              <slot name="dropdown"></slot>
              <div class="divide-x"></div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { createPopper } from '@popperjs/core';

const vClickOutside = {
  mounted: () => {
    document.addEventListener('click', clickOutListener);
  },
  unmounted: () => {
    document.removeEventListener('click', clickOutListener);
  },
};

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  toggleOut: {
    type: Boolean,
    default: false,
  },
});

const button = ref(null);
const dropdown = ref(null);
const toggle = ref(false);
const fullContainer = ref(null);

watch(
  () => props.toggleOut,
  () => {
    handleHide();
  }
);

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

const handleClick = () => {
  dropdown.value.setAttribute('data-show', '');
  popperInstance.value.update();
  toggle.value = true;
};

const handleHide = () => {
  dropdown.value.removeAttribute('data-show');
  toggle.value = false;
};

const clickOutListener = (evt) => {
  if (!fullContainer.value.contains(evt.target)) {
    handleHide();
  }
};
</script>

<style scoped>
.dropdownMenu {
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  z-index: 50;
  min-width: 10rem;
  padding: 0.5rem 0;
  display: none;
}

.dropdownMenu[data-show] {
  display: block;
}
</style>
