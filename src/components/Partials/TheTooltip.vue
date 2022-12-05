<template>
  <div class="tooltip">
    <div
      class="w-fit"
      aria-describedby="tooltip"
      @mouseenter="handleShow($event)"
      @mouseleave="handleHide($event)"
      @focus="handleShow($event)"
      @blur="handleHide($event)"
    >
      <slot></slot>
    </div>
    <div class="tooltipText" role="tooltip">
      {{ tooltipText }}
      <div class="tooltipArrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { createPopper } from '@popperjs/core';

defineProps({
  tooltipText: {
    type: String,
    default: '',
  },
});

const container = ref(null);
const tooltip = ref(null);

const insertElement = (btn, tip) => {
  container.value = btn;
  tooltip.value = tip;
};

const popperInstance = computed(() => {
  return createPopper(container.value, tooltip.value, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
    strategy: 'absolute',
  });
});

const handleShow = (e) => {
  if (container.value === null && tooltip.value === null) {
    insertElement(
      e.target,
      e.target.parentElement.querySelector('.tooltipText')
    );
  }
  tooltip.value.setAttribute('data-show', '');
  popperInstance.value.update();
};
const handleHide = (e) => {
  if (container.value === null && tooltip.value === null) {
    insertElement(
      e.target,
      e.target.parentElement.querySelector('.tooltipText')
    );
  }
  tooltip.value.removeAttribute('data-show');
};
</script>

<style scoped>
.tooltipText {
  background: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  display: none;
}

.tooltipText[data-show] {
  display: block;
}

.tooltipArrow,
.tooltipArrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.tooltipArrow {
  visibility: hidden;
}

.tooltipArrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.tooltipText[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

.tooltipText[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

.tooltipText[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

.tooltipText[data-popper-placement^='right'] > #arrow {
  left: -4px;
}
</style>
