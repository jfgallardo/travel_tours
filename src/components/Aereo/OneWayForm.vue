<template>
  <div>
    <div class="mt-5 flex flex-col space-y-1">
      <div class="px-4">
        <AutoComplete
          :label="t('roundTripForm.labelDesde')"
          :value="searchOptionsVooStore.origin.label"
          @input="
            (e) => {
              searchOptionsVooStore.origin.label = e;
            }
          "
          @select="
            (s) => {
              searchOptionsVooStore.origin.iata = s;
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
          :value="searchOptionsVooStore.destiny.label"
          @input="
            (e) => {
              searchOptionsVooStore.destiny.label = e;
            }
          "
          @select="
            (s) => {
              searchOptionsVooStore.destiny.iata = s;
            }
          "
        />
      </div>

      <div class="grid pt-4 px-4">
        <DateInput
          v-model="searchOptionsVooStore.dateOfDeparture"
          :label="t('roundTripForm.labelIda')"
          :min-date-show="new Date()"
        />
      </div>

      <div class="px-4 pb-4">
        <CabineComponent />
      </div>

      <div class="px-4">
        <Dropddown :label="t('roundTripForm.labelPassageiros')">
          <template #selected>
            <div
              class="flex justify-evenly pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 bg-white border focus:outline-none text-sm"
            >
              <span>{{searchOptionsVooStore.adults}} {{ t('adults', searchOptionsVooStore.adults) }}</span>
              <span>{{searchOptionsVooStore.teenagers}} {{ t('children', searchOptionsVooStore.teenagers) }}</span>
              <span>{{searchOptionsVooStore.babies}} {{ t('babies', searchOptionsVooStore.babies) }}</span>
            </div>
          </template>
          <template #dropdown>
            <div class="flex items-center justify-between">
              <ManageItems
                v-model="searchOptionsVooStore.adults"
                subtitle="+12 anos"
                :label="t('adults')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="searchOptionsVooStore.teenagers"
                subtitle="2-11 anos"
                :label="t('children')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="searchOptionsVooStore.babies"
                subtitle="-2 anos"
                :label="t('babies')"
                @take-off="takeOff"
                @add-up="addUp"
              />
            </div>

            <div class="divide-x"></div>
          </template>
        </Dropddown>
      </div>

      <div class="px-4">
        <Check class="pt-4" :label="t('roundTripForm.aeroportosProximos')" />
        <Check :label="t('roundTripForm.voosDirectos')" />
        <Check
          v-model="searchOptionsVooStore.onlyBaggage"
          label="Apenas com babagem"
        />
      </div>

      <div>
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
import { useRouter, useRoute } from 'vue-router';
import { useMoblixStore } from '@/stores/moblix';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Check from '@/components/FormUI/CheckInput.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import Toastify from 'toastify-js';
import { useI18n } from 'vue-i18n';
import CabineComponent from "@/components/FormUI/CabineComponent.vue";

const moblixStore = useMoblixStore();
const searchOptionsVooStore = useSearchOptionsVooStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

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

const changeDestinations = () => {
  let temporaryString = searchOptionsVooStore.origin.label;
  let temporaryIata = searchOptionsVooStore.origin.iata;

  searchOptionsVooStore.origin.label = searchOptionsVooStore.destiny.label;
  searchOptionsVooStore.origin.iata = searchOptionsVooStore.destiny.iata;

  searchOptionsVooStore.destiny.label = temporaryString;
  searchOptionsVooStore.destiny.iata = temporaryIata;
};

const formatterDateS = (date) => {
  let dateParts = date.split('/');
  return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
};

const consultar = () => {
  let payload = {
    Origem: searchOptionsVooStore.origin.iata,
    Destino: searchOptionsVooStore.destiny.iata,
    Ida: formatterDateS(searchOptionsVooStore.dateOfDeparture),
    Volta: '0001-01-01',
    Adultos: searchOptionsVooStore.adults,
    Criancas: searchOptionsVooStore.teenagers,
    Bebes: searchOptionsVooStore.babies,
    Companhia: 1,
    Cabine: searchOptionsVooStore.cabine,
  };

  if (!payload.Origem || !payload.Destino || !payload.Ida) {
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

  if (route.name === 'AereoFlightQuery') {
    router
      .push({
        name: 'AereoFlightQuery',
        params: {
          source: payload.Origem,
          destiny: payload.Destino,
          departure_date: payload.Ida,
          return_date: '0001-01-01',
        },
        query: {
          adults: payload.Adultos,
          childs: payload.Criancas,
          bebes: payload.Bebes,
          company: 1,
        },
      })
      .then(() => {
        moblixStore.consultaAereo(payload);
      });
  } else {
    router.push({
      name: 'AereoFlightQuery',
      params: {
        source: payload.Origem,
        destiny: payload.Destino,
        departure_date: payload.Ida,
        return_date: '0001-01-01',
      },
      query: {
        adults: payload.Adultos,
        childs: payload.Criancas,
        bebes: payload.Bebes,
        company: 1,
      },
    });
  }
};
</script>
<style scoped></style>
