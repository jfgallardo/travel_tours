<template>
  <div>
    <div class="mt-5 flex flex-col space-y-1">
      <div class="px-4">
        <AutoComplete
          :label="t('roundTripForm.labelDesde')"
          :value="searchOptionsVoo.origin.label"
          @input="
            (e) => {
              searchOptionsVoo.origin.label = e;
            }
          "
          @select="
            (s) => {
              searchOptionsVoo.origin.iata = s;
            }
          "
        />
      </div>
      <div class="flex justify-center px-4">
        <div
          class="flex items-center justify-center cursor-pointer w-10"
          @click="changeDestinations"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-700 -mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>

      <div class="px-4">
        <AutoComplete
          :label="t('roundTripForm.labelPara')"
          :value="searchOptionsVoo.destiny.label"
          @input="
            (e) => {
              searchOptionsVoo.destiny.label = e;
            }
          "
          @select="
            (s) => {
              searchOptionsVoo.destiny.iata = s;
            }
          "
        />
      </div>

      <div class="grid grid-cols-2 grid-rows-1 pt-4 px-4">
        <DateInput
          v-model="searchOptionsVoo.dateOfDeparture"
          :label="t('roundTripForm.labelIda')"
          :min-date-show="new Date()"
        />
        <DateInput
          v-model="searchOptionsVoo.dateOfReturn"
          :label="t('roundTripForm.labelVolta')"
          :min-date-show="notBeforeDate"
        />
      </div>

      <div class="px-4 pb-4">
        <Select
          class="pt-4"
          :label="t('roundTripForm.labelClassecabine')"
          :selected="searchOptionsVoo.cabin"
          :options="options"
          @selectValue="
            (e) => {
              searchOptionsVoo.cabin = e;
            }
          "
        />
      </div>

      <div class="px-4">
        <Dropddown :label="t('roundTripForm.labelPassageiros')">
          <template #selected>
            <div
              class="flex justify-evenly pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 bg-white border focus:outline-none text-sm"
            >
              <span>{{searchOptionsVoo.adults}} {{ t('adults', searchOptionsVoo.adults) }}</span>
              <span>{{searchOptionsVoo.teenagers}} {{ t('children', searchOptionsVoo.teenagers) }}</span>
              <span>{{searchOptionsVoo.babies}} {{ t('babies', searchOptionsVoo.babies) }}</span>
            </div>
          </template>
          <template #dropdown>
            <div class="flex items-center space-x-10 px-4">
              <ManageItems
                v-model="searchOptionsVoo.adults"
                subtitle="+16 anos"
                :label="t('adults')"
                @takeOff="takeOff"
                @addUp="addUp"
              />

              <ManageItems
                v-model="searchOptionsVoo.teenagers"
                subtitle="4-15 anos"
                :label="t('children')"
                @takeOff="takeOff"
                @addUp="addUp"
              />

              <ManageItems
                v-model="searchOptionsVoo.babies"
                subtitle="1-3 anos"
                :label="t('babies')"
                @takeOff="takeOff"
                @addUp="addUp"
              />
            </div>

            <div class="divide-x"></div>
          </template>
        </Dropddown>
      </div>

      <div class="px-4">
        <Check class="pt-4" :label="t('roundTripForm.aeroportosProximos')" />
        <Check
          v-model="searchOptionsVoo.apenasVoosDiretos"
          :label="t('roundTripForm.voosDirectos')"
        />
        <Check
          v-model="searchOptionsVoo.onlyBaggage"
          label="Solo Bagagem"
        />
      </div>

      <div class="">
        <button
          class="bg-blue-700 hover:bg-blue-800 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400 disabled:cursor-wait"
          :disabled="woobaStore.loading"
          @click="consultar()"
        >
          <span>{{ t('roundTripForm.pesquisarVoos') }}</span>
          <div
            v-if="woobaStore.loading"
            class="absolute right-10 animate-spin h-6 w-6 border-0 border-t-2 border-white rounded-full"
          ></div>
          <ArrowRight v-else fill-color="white" class="absolute right-10" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import { useMoblixStore } from '@/stores/moblix';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Select from '@/components/FormUI/TheSelect.vue';
import Check from '@/components/FormUI/CheckInput.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import { useWoobaStore } from '@/stores/wooba';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import Toastify from 'toastify-js';
import { useI18n } from 'vue-i18n';

//const moblixStore = useMoblixStore();
const woobaStore = useWoobaStore();
const searchOptionsVoo = useSearchOptionsVooStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const addUp = (e) => {
  if (e === t('adults') && searchOptionsVoo.adults < 8) {
    searchOptionsVoo.adults++;
  } else if (e === t('children') && searchOptionsVoo.teenagers < 8) {
    searchOptionsVoo.teenagers++;
  } else if (e === t('babies') && searchOptionsVoo.babies < 8) {
    searchOptionsVoo.babies++;
  }
};

const takeOff = (e) => {
  if (e === t('adults') && searchOptionsVoo.adults > 1) {
    searchOptionsVoo.adults--;
  } else if (e === t('children') && searchOptionsVoo.teenagers > 0) {
    searchOptionsVoo.teenagers--;
  } else if (e === t('babies') && searchOptionsVoo.babies > 0) {
    searchOptionsVoo.babies--;
  }
};

const changeDestinations = () => {
  let temporaryString = searchOptionsVoo.origin.label;
  let temporaryIata = searchOptionsVoo.origin.iata;

  searchOptionsVoo.origin.label = searchOptionsVoo.destiny.label;
  searchOptionsVoo.origin.iata = searchOptionsVoo.destiny.iata;

  searchOptionsVoo.destiny.label = temporaryString;
  searchOptionsVoo.destiny.iata = temporaryIata;
};

const notBeforeDate = computed(() => {
  if (searchOptionsVoo.dateOfDeparture) {
    let dateParts = searchOptionsVoo.dateOfDeparture.split('/');
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  } else {
    return new Date();
  }
});

const formatterDateS = (date) => {
  let dateParts = date.split('/');
  return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
};

const options = [
  { label: 'Econômica', value: 0 },
  { label: 'Executiva', value: 2 },
  { label: 'Primeira Classe', value: 1 },
  { label: 'Todas', value: -1 },
];

const consultar = () => {
  if (
    !searchOptionsVoo.origin.iata ||
    !searchOptionsVoo.destiny.iata ||
    !formatterDateS(searchOptionsVoo.dateOfDeparture) ||
    !formatterDateS(searchOptionsVoo.dateOfReturn)
  ) {
    Toastify({
      text: 'Por favor, verifique, existen campos vacios o incorrectos',
      duration: 3000,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right,  #ff0000, #ff6666)',
      },
    }).showToast();
    return;
  }

  if (route.name === 'VoosIdaVolta') {
    router.push({ name: 'VoosIdaVolta' }).then(() => {
      woobaStore.consultaOrigemDestino();
    });
  } else {
    router.push({ name: 'VoosIdaVolta' });
  }
};
</script>
<style scoped></style>
