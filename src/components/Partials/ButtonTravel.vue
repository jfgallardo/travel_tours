<template>
  <div class="flex items-center justify-around pt-6 px-4">
    <button
      v-for="tab in options"
      ref="button"
      :key="tab.name"
      class="py-3 w-full border border-gray-400"
      :name="tab.name"
      @click="changeTab(tab)"
    >
      {{ $t(tab.name) }}
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

onMounted(() => {
  button.value[0].classList.add('active');
  emits('selectedButton', props.options[0].component);
})

const emits = defineEmits(['selectedButton']);

const props = defineProps({
  options: {
    type: Array,
    default() {
      return [
        {
          name: 'aereoHomePage.titleRoundTrip',
          component: 'RoundTrip'
        },
        {
          name: 'aereoHomePage.titleOneWay',
          component: 'OneWay'
        },
        {
          name: 'aereoHomePage.titleManyCities',
          component: 'ManyCities'
        },
      ];
    },
  },
});

const button = ref(null)

const cleanRefs = () => {
  for (let i = 0; i < button.value.length; i++) {
    button.value[i].classList.remove('active');
  }
};

const changeTab = (tab) => {
  cleanRefs();
  for (let i = 0; i < button.value.length; i++) {
    if (button.value[i].name === tab.name) {
      button.value[i].classList.add("active")
      emits('selectedButton', tab.component)
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
