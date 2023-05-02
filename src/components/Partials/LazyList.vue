<template>
  <Transition name="voo">
    <div v-if="!seeSelectedOption" ref="scrollContainer">
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
                :key-voo-selected="keyVooSelected"
                @he-selected="selectionConfirmed"
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
    <div v-else>
      <button
        class="flex items-center text-blue-600 text-sm font-medium mb-5 hover:cursor-pointer px-2.5 py-1.5 float-right hover:text-blue-800"
        @click="selectDifferentOption"
      >
        Selecione outro voo
        <ArrowPathIcon class="h-4 w-4 ml-1.5" />
      </button>
      <div class="border my-3.5">
        <RenderFlightsMany
          v-if="selectedOption"
          :viagem="selectedOption"
          :type-flight="typeFlight"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import IdaVoltaFlex from '@/components/Aereo/IdaVoltaFlexRender.vue';
import VoosMultipleRender from '@/components/Aereo/VoosMultipleRender.vue';
import IdaVoltaNoFlex from '@/components/Aereo/IdaVoltaNoFlexRender.vue';
import Cookies from 'js-cookie';
import { onMounted, ref, watch } from 'vue';
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

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

const emit = defineEmits(['heSelected']);

const objetosVisibles = ref([]);
const scrollContainer = ref(null);
const tabs = {
  IdaVoltaFlex,
  VoosMultipleRender,
  IdaVoltaNoFlex,
};
const inputCheck = ref([]);
const selectVoo = ref();
const keyVooSelected = ref('');
const seeSelectedOption = ref(false);
const selectedOption = ref(null);

watch(
  () => inputCheck.value,
  (value) => {
    if (value?.length > 0) {
      inputCheck?.value?.forEach((element) => {
        element.checked = false;
      });
      inputCheck.value[0].checked = true;
      selectVoo.value = props.objetos[0];
      keyVooSelected.value = props.objetos[0].Key;
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
  keyVooSelected.value = viagem.Key;
  selectVoo.value = viagem;
};

const clearCheck = (ev) => {
  inputCheck.value.forEach((element) => {
    element.checked = element === ev;
  });
};

const selectionConfirmed = () => {
  selectedOption.value = JSON.parse(Cookies.get(props.typeFlight));
  seeSelectedOption.value = true;
  emit('heSelected');
};
const selectDifferentOption = () => {
  selectedOption.value = {};
  Cookies.remove(props.typeFlight);
  seeSelectedOption.value = false;
  emit('heSelected');
};

const goToPre = () => {
  /*$cookies.set('vooSelectedKey', props.vooDetalhes.Key);
  userStore.vooSelected = props.vooDetalhes;
  router.push({ name: 'PreCheckoutPage' });*/
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

.voo-enter-active,
.voo-leave-active {
  transition: opacity 0.5s ease;
}

.voo-enter-from,
.voo-leave-to {
  opacity: 0;
}
</style>
