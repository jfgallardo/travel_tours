<template>
  <div ref="scrollContainer">
    <TransitionGroup name="list" tag="ul">
      <div v-for="(objeto, index) in objetosVisibles" :key="index">
        <div class="flex items-center border mt-5">
                    <div v-if="currentTab === 'IdaVoltaNoFlex'" class="px-1.5">
            <input
              ref="inputCheck"
              type="checkbox"
              class="text-zinc-800 cursor-pointer rounded-full w-5 h-5 focus:ring-0 m-2"
              @click="selectFligth($event, objeto)"
            />
          </div>
          <div class="w-full">
            <component
              :is="tabs[currentTab]"
              :viagem="objeto"
              :type-flight="typeFlight"
              @he-selected="$emit('heSelected', $event)"
            ></component>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div class="mx-auto text-center">
      <button
        v-if="objetos.length === objetosVisibles.length"
        class="text-center bg-blue-700 text-white px-10 py-2 mt-3.5"
        @click="onTop"
      >
        Retornar al inicio
      </button>
      <button
        v-else
        class="text-center bg-blue-700 text-white px-10 py-2 mt-3.5"
        @click="actualizarObjetosVisibles"
      >
        More
      </button>
    </div>
  </div>
</template>

<script setup>
import IdaVoltaFlex from '@/components/Aereo/IdaVoltaFlexRender.vue';
import VoosMultipleRender from '@/components/Aereo/VoosMultipleRender.vue';
import IdaVoltaNoFlex from '@/components/Aereo/IdaVoltaNoFlexRender.vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  objetos: {
    type: Array,
    required: true,
  },
  cantidadVisible: {
    type: Number,
    default: 10,
  },
  currentTab: {
    type: String,
    default: 'IdaVoltaFlex',
  },
  typeFlight: {
    required: true,
    type: String,
    default: '',
  },
});

defineEmits(['heSelected']);

const objetosVisibles = ref([]);
const scrollContainer = ref(null);
const tabs = {
  IdaVoltaFlex,
  VoosMultipleRender,
  IdaVoltaNoFlex,
};
const inputCheck = ref([]);
const selectVoo = ref();

watch(
  () => inputCheck.value,
  (value) => {
    if (value?.length > 0) {
      inputCheck.value[0].checked = true;
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  actualizarObjetosVisibles();
});

watch(
  () => props.objetos,
  () => {
    actualizarObjetosVisibles();
    onTop();
  }
);

const onTop = () => {
  scrollContainer.value.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};

const actualizarObjetosVisibles = () => {
  const cantidadAgregada = Math.min(
    objetosVisibles.value.length + props.cantidadVisible,
    props.objetos.length
  );
  objetosVisibles.value = props.objetos.slice(0, cantidadAgregada);
};
const selectFligth = (ev, viagem) => {
  clearCheck(ev.target);
  selectVoo.value = viagem;
};

const clearCheck = (ev) => {
  inputCheck.value.forEach((element) => {
    element.checked = element === ev;
  });
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
