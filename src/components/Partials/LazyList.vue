<template>
  <div ref="scrollContainer">
    <TransitionGroup name="list" tag="ul">
      <div v-for="(objeto, index) in objetosVisibles" :key="index">
        <!--        <IdaVoltaFlex :viagem="objeto" />-->
        <component :is="tabs[currentTab]" :viagem="objeto"></component>
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
});

const objetosVisibles = ref([]);
const scrollContainer = ref(null);
const tabs = {
  IdaVoltaFlex,
  VoosMultipleRender,
};

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
