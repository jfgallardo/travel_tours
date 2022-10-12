<template>
  <div>
    <div
      v-for="fligth in flights"
      :key="fligth.Token"
      class="flex items-center border-b border-gray-300"
    >
      <div class="p-4">
        <input
          ref="inputCheck"
          type="checkbox"
          class="text-zinc-800 cursor-pointer rounded-full w-5 h-5 focus:ring-0"
          @click="selectFligth($event, fligth)"
        />
      </div>
      <Flight v-bind="fligth" />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
const Flight = defineAsyncComponent(() =>
  import('@/components/FlightQuery/FlightComponent.vue')
);

const emit = defineEmits(['selectVoo']);

const inputCheck = ref([]);
const clearCheck = (ev) => {
  inputCheck.value.forEach((element) => {
    if (element != ev) {
      element.checked = false;
    }
  });
};

const selectFligth = (ev, fligth) => {
  clearCheck(ev.target);
  if (ev.target.checked) {
    emit('selectVoo', fligth);
  } else {
    emit('selectVoo', null);
  }
};

const props = defineProps({
  flights: {
    type: Array,
    default: () => [],
  },
});
</script>

<style></style>
