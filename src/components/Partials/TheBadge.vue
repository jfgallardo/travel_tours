<template>
  <div class="relative z-40">
    <div @mouseover="showB = false" @mouseout="showB = true">
      <slot></slot>
    </div>
    <div
      class="text-xs text-center mr-5 mt-5 bg-gray-200 opacity-80 rounded-full text-black font-bold absolute py-1 px-2 top-0 left-0 w-24"
      :class="{ hidden: showB, 'mr-5 mt-5': !top, '-mr-5 -mt-5': top }"
    >
      <span> {{ t('components.badge-text') }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

defineProps({
  top: {
    type: Boolean,
    default: true
  },
})
const showB = ref(true);
</script>

<!--class="text-xs text-center -mr-5 -mt-5 bg-gray-200 opacity-80 rounded-full text-black font-bold absolute py-1 px-2 top-0 left-0 w-24"-->