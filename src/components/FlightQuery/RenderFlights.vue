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
import { ref, onMounted } from 'vue';
import Flight from '@/components/FlightQuery/FlightComponent.vue';

const emit = defineEmits(['selectVoo']);

onMounted(() => {
  if (inputCheck.value.length > 0) {
    inputCheck.value[0].checked = true;
    emit('selectVoo', props.flights[0]);
  }
});

const inputCheck = ref([]);
const clearCheck = (ev) => {
  inputCheck.value.forEach((element) => {
    if (element != ev) {
      element.checked = false;
    } else {
      element.checked = true;
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
