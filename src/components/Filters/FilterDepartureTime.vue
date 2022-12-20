<template>
  <div class="p-4 flex flex-col space-y-3.5">
    <div>
      <h2 class="pl-2 text-lg font-semibold">Ida <span class="font-light text-xs text-gray-500">a partir de</span></h2>
      <div>
        <input id="ida-time" v-model="time.initTime" :class="inputClassList" type="time" @input="$emit('time', time)">
      </div>
    </div>
    <div>
      <h2 class="pl-2 text-lg font-semibold">Volta <span class="font-light text-xs text-gray-500">a partir de</span></h2>
      <div>
        <input id="volta-time" v-model="time.endTime" :class="inputClassList" type="time" @input="$emit('time', time)">
      </div>
    </div>
    <div>
      <button class="float-right bg-none font-semibold" @click="clear">Limpiar</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const emits = defineEmits(['time', 'clear']);
const props = defineProps({
  times: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  if (props.times){
    time.value.initTime = props.times.initTime
    time.value.endTime = props.times.endTime
  }
})

const time = ref({
  initTime: "",
  endTime: ""
});

const clear = () => {
  time.value.initTime = ""
  time.value.endTime = ""
  emits('clear')
}

const inputClassList = computed(() => {
  return [
    "appearance-none w-full transition duration-150 ease-in-out",
    getTextSizeClass.value,
    getTextColorClass.value,
    getBorderColorClass.value
  ];
});

const getTextSizeClass = computed(() => {
  return "text-sm leading-5";
});
const getTextColorClass = computed(() => {
  return "text-gray-800 placeholder-gray-400";
});
const getBorderColorClass = computed(() => {
  return "focus:outline-none border border-gray-400 focus:border-blue-400";
});
</script>

<style scoped>

</style>