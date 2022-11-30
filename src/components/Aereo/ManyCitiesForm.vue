<template>
  <div class="mt-5">
    <div class="flex flex-col space-y-5">
      <div class="flex items-center justify-between space-x-5 px-4">
        <Dropddown :label="t('roundTripForm.labelPassageiros')" class="w-1/2">
          <template #selected>
            <div
              class="flex justify-evenly pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 bg-white border focus:outline-none text-sm"
            >
              <span>{{ t('adults', searchOptionsVooStore.adults) }}</span>
              <span>{{ t('children', searchOptionsVooStore.teenagers) }}</span>
              <span>{{ t('babies', searchOptionsVooStore.babies) }}</span>
            </div>
          </template>
          <template #dropdown>
            <div class="flex items-center space-x-10 px-4">
              <ManageItems
                v-model="searchOptionsVooStore.adults"
                subtitle="+16 anos"
                :label="t('adults')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="searchOptionsVooStore.teenagers"
                subtitle="4-15 anos"
                :label="t('children')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="searchOptionsVooStore.babies"
                subtitle="1-3 anos"
                :label="t('babies')"
                @take-off="takeOff"
                @add-up="addUp"
              />
            </div>

            <div class="divide-x"></div>
          </template>
        </Dropddown>

        <Select
          class="w-1/2"
          :label="t('roundTripForm.labelClassecabine')"
          :selected="searchOptionsVooStore.cabin"
          :options="options"
          @select-value="
            (e) => {
              searchOptionsVooStore.cabin = e;
            }
          "
        />
      </div>

      <div class="flex flex-col space-y-2 px-4">
        <TransitionGroup name="list">
          <template v-for="(trecho, index) in multiplosTrechos" :key="index">
            <div class="flex space-x-1 relative">
              <AutoComplete
                :label="t('roundTripForm.labelDesde')"
                :value="trecho.origem.string"
                @input="
                  (e) => {
                    trecho.origem.string = e;
                  }
                "
                @select="
                  (s) => {
                    trecho.origem.iata = s;
                  }
                "
              />

              <AutoComplete
                :label="t('roundTripForm.labelPara')"
                :value="trecho.destino.string"
                @input="
                  (e) => {
                    trecho.destino.string = e;
                  }
                "
                @select="
                  (s) => {
                    trecho.destino.iata = s;
                  }
                "
              />

              <DateInput
                v-model="trecho.departureDate"
                :label="t('roundTripForm.labelIda')"
                :min-date-show="new Date()"
              />

              <svg
                v-if="trecho.close"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 absolute -top-2 -right-4 cursor-pointer text-gray-500"
                @click="deleteField(index)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </template>
        </TransitionGroup>
      </div>

      <div class="flex space-x-2">
        <button
          class="bg-gray-400 hover:bg-gray-500 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400"
          @click="addV"
        >
          <span>{{ t('manyCities.adicionarVoo') }}</span>
        </button>
        <button
          class="bg-blue-700 hover:bg-blue-800 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400 disabled:cursor-wait"
          :disabled="moblixStore.loading"
          @click="consultar()"
        >
          <span>{{ t('roundTripForm.pesquisarVoos') }}</span>
          <div
            v-if="moblixStore.loading"
            class="absolute right-10 animate-spin h-6 w-6 border-0 border-t-2 border-white rounded-full"
          ></div>
          <ArrowRight v-else fill-color="white" class="absolute right-10" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import Select from '@/components/FormUI/TheSelect.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import { useMoblixStore } from '@/stores/moblix';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import Toastify from 'toastify-js';
import { useI18n } from 'vue-i18n';

const moblixStore = useMoblixStore();
const searchOptionsVooStore = useSearchOptionsVooStore();
const { t } = useI18n();

const multiplosTrechos = ref([
  {
    departureDate: '',
    destino: {
      string: '',
      iata: '',
    },
    origem: {
      string: '',
      iata: '',
    },
  },
  {
    departureDate: '',
    destino: {
      string: '',
      iata: '',
    },
    origem: {
      string: '',
      iata: '',
    },
  },
]);

const options = [
  { label: 'Econômica', value: 0 },
  { label: 'Executiva', value: 2 },
  { label: 'Primeira Classe', value: 1 },
  { label: 'Todas', value: -1 },
];

const addUp = (e) => {
  if (e === t('adults') && searchOptionsVooStore.adults < 8) {
    searchOptionsVooStore.adults++;
  } else if (e === t('children') && searchOptionsVooStore.teenagers < 8) {
    searchOptionsVooStore.teenagers++;
  } else if (e === t('babies') && searchOptionsVooStore.babies < 8) {
    searchOptionsVooStore.babies++;
  }
};

const takeOff = (e) => {
  if (e === t('adults') && searchOptionsVooStore.adults > 1) {
    searchOptionsVooStore.adults--;
  } else if (e === t('children') && searchOptionsVooStore.teenagers > 0) {
    searchOptionsVooStore.teenagers--;
  } else if (e === t('babies') && searchOptionsVooStore.babies > 0) {
    searchOptionsVooStore.babies--;
  }
};

const addV = () => {
  if (multiplosTrechos.value.length < 5) {
    multiplosTrechos.value.push({
      close: true,
      departureDate: '',
      destino: {
        string: '',
        iata: '',
      },
      origem: {
        string: '',
        iata: '',
      },
    });
  } else {
    Toastify({
      text: 'Você só pode adicionar até cinco (5) voos',
      duration: 3000,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right,  #0564fc, #5b92eb)',
      },
      onClick: function () {},
    }).showToast();
  }
};

const deleteField = (i) => {
  multiplosTrechos.value.splice(i, 1);
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
