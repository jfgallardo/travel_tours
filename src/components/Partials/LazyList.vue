<template>
  <div v-if="!seeSelectedOption">
    <p class="font-medium p-2.5">
      {{
        typeFlight === 'I'
          ? $t('idaVoltaFlexRender.vuelosDeIda')
          : $t('idaVoltaFlexRender.vuelosDeVuelta')
      }}
    </p>
    <TransitionGroup name="list" tag="ul">
      <template v-for="(objeto, index) in objetosVisibles" :key="index">
        <div
          :class="{
            'flex mb-3.5 border-0 mt-0': currentTab === 'IdaVoltaNoFlex',
          }"
          class="border mt-3.5"
        >
          <div
            v-if="currentTab === 'IdaVoltaNoFlex'"
            class="border border-r-0 border-gray-300 flex items-center"
          >
            <input
              ref="inputCheck"
              type="checkbox"
              class="text-zinc-800 cursor-pointer rounded-full w-5 h-5 focus:ring-0 m-2"
              @click="selectFligth($event, objeto)"
            />
          </div>
          <component
            :is="tabs[currentTab]"
            :viagem="objeto"
            :type-flight="typeFlight"
            :key-voo-selected="keyVooSelected"
            @he-selected="selectionConfirmed"
          ></component>
        </div>
      </template>
    </TransitionGroup>

    <div class="mx-auto text-center">
      <span v-if="!objetos.length" class="text-sm font-semibold"
        >Filtros no arrojaron resultados</span
      >
      <button
        v-if="objetos.length && objetos.length === objetosVisibles.length"
        class="text-center bg-blue-700 text-white px-10 py-2 mt-3.5"
        @click="onTop"
      >
        {{ t('Voltar para começar') }}
      </button>
      <button
        v-if="objetos.length && !(objetos.length === objetosVisibles.length)"
        class="text-center bg-blue-700 text-white px-10 py-2 my-3.5"
        @click="actualizarObjetosVisibles"
      >
        {{ t('Mais') }}
      </button>
    </div>
  </div>
  <div v-else>
    <div
      class="flex items-center justify-between border border-b-0 border-gray-300 p-2.5"
    >
      <p v-if="typeFlight === 'I'" class="font-medium">
        {{ $t('idaVoltaFlexRender.vuelosDeIda') }}
      </p>
      <p v-else class="font-medium">
        {{ $t('idaVoltaFlexRender.vuelosDeVuelta') }}
      </p>
      <button
        class="flex items-center text-black text-sm font-medium px-2.5"
        @click="selectDifferentOption"
      >
        {{ t('Selecione outro voo') }}
        <MagnifyingGlassIcon class="h-5 w-5 ml-1.5 text-black" />
      </button>
    </div>
    <div class="flex flex-col justify-around xl:w-full border border-gray-300">
      <RenderFlightsMany
        v-if="selectedOption"
        :viagem="selectedOption"
        :type-flight="typeFlight"
      />
    </div>
  </div>
</template>

<script setup>
import IdaVoltaFlex from '@/components/Aereo/IdaVoltaFlexRender.vue';
import VoosMultipleRender from '@/components/Aereo/VoosMultipleRender.vue';
import IdaVoltaNoFlex from '@/components/Aereo/IdaVoltaNoFlexRender.vue';
import Cookies from 'js-cookie';
import { onMounted, ref, watch } from 'vue';
import RenderFlightsMany from '@/components/Aereo/RenderFlightsMany.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { useI18n } from 'vue-i18n';

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
const { t } = useI18n();

const objetosVisibles = ref([]);
const tabs = {
  IdaVoltaFlex,
  VoosMultipleRender,
  IdaVoltaNoFlex,
};
const inputCheck = ref([]);
const selectVoo = ref(null);
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
      selectVoo.value = props.objetos[0] ? props.objetos[0] : null;
      keyVooSelected.value = props.objetos[0] ? props.objetos[0].Key : null;
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
    actualizarObjetosVisibles(false);
    onTop();
  }
);

const onTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const actualizarObjetosVisibles = (filter = true) => {
  const cantidadAgregada = filter
    ? Math.min(
        objetosVisibles.value.length + props.cantidadVisible,
        props.objetos.length
      )
    : props.cantidadVisible;

  objetosVisibles.value = props.objetos.slice(0, cantidadAgregada);
  if (inputCheck?.value.length) {
    inputCheck?.value?.forEach((element) => {
      element.checked = false;
    });
    inputCheck.value[0].checked = true;
    selectVoo.value = props.objetos[0] ? props.objetos[0] : null;
      keyVooSelected.value = props.objetos[0] ? props.objetos[0].Key : null;
  }
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
</script>

<style scoped></style>
