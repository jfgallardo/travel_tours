<template>
  <div class="flex items-center justify-around pt-6 px-4">
    <button
      v-for="tab in options"
      ref="button"
      :key="tab.name"
      class="py-3 w-full border border-gray-400"
      :class="{ relative: tab.relative }"
      :name="tab.name"
      @click="changeTab(tab)"
    >
      {{ $t(tab.name) }}
      <!--      <div
        class="text-xs text-center bg-gray-200 opacity-80 rounded-full text-black font-bold absolute py-1 px-2 -top-3.5 -right-2 w-24"
      >
        <span> {{ $t('components.badge-text') }}</span>
      </div>-->
      <span
        class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 absolute -top-3.5 -right-2"
        >{{ $t('components.badge-text') }}</span
      >
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

onMounted(() => {
  button.value[0].classList.add('active');
  emits('selectedButton', props.options[0].component);
});

const emits = defineEmits(['selectedButton']);

const props = defineProps({
  options: {
    type: Array,
    default() {
      return [
        {
          name: 'aereoHomePage.titleRoundTrip',
          component: 'RoundTrip',
          relative: false,
        },
        {
          name: 'aereoHomePage.titleOneWay',
          component: 'OneWay',
          relative: false,
        },
        {
          name: 'aereoHomePage.titleManyCities',
          component: 'ManyCities',
          relative: true,
        },
      ];
    },
  },
});

const button = ref(null);

const cleanRefs = () => {
  for (let i = 0; i < button.value.length; i++) {
    button.value[i].classList.remove('active');
  }
};

const changeTab = (tab) => {
  if (!tab.relative) {
    cleanRefs();
    for (let i = 0; i < button.value.length; i++) {
      if (button.value[i].name === tab.name) {
        button.value[i].classList.add('active');
        emits('selectedButton', tab.component);
      }
    }
  }
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}
</style>
