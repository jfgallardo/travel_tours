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

      <div class="flex pt-4 px-4">
        <DateInput
          v-model="searchOptionsVoo.dateOfDeparture"
          :label="t('roundTripForm.labelIda')"
          :min-date-show="new Date()"
          class="w-full"
        />
        <DateInput
          v-model="searchOptionsVoo.dateOfReturn"
          :label="t('roundTripForm.labelVolta')"
          :min-date-show="notBeforeDate"
          class="w-full"
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
              <span
                >{{ searchOptionsVoo.adults }}
                {{ t('adults', searchOptionsVoo.adults) }}</span
              >
              <span
                >{{ searchOptionsVoo.teenagers }}
                {{ t('children', searchOptionsVoo.teenagers) }}</span
              >
              <span
                >{{ searchOptionsVoo.babies }}
                {{ t('babies', searchOptionsVoo.babies) }}</span
              >
            </div>
          </template>
          <template #dropdown>
            <div class="flex items-center justify-between px-4">
              <ManageItems
                v-model="searchOptionsVoo.adults"
                subtitle="+12 anos"
                :label="t('adults')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="searchOptionsVoo.teenagers"
                subtitle="2-11 anos"
                :label="t('children')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="searchOptionsVoo.babies"
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

      <div class="px-5">
        <Check
          v-model="searchOptionsVoo.apenasVoosDiretos"
          :label="t('roundTripForm.voosDirectos')"
          class="pt-4"
        />
        <Check
          v-model="searchOptionsVoo.onlyBaggage"
          :label="t('roundTripForm.apenasComBabagem')"
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
import { computed, inject } from 'vue';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Check from '@/components/FormUI/CheckInput.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import { useWoobaStore } from '@/stores/wooba';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useI18n } from 'vue-i18n';
import CabineComponent from '@/components/FormUI/CabineComponent.vue';
import { useAlertStore } from '@/stores/alert';
import { woobaData, woobaDataMultiple } from '@/utils/unifyDataWooba';
import { useRouter } from "vue-router";

const woobaStore = useWoobaStore();
const searchOptionsVoo = useSearchOptionsVooStore();
const alertStore = useAlertStore();
const { t } = useI18n();
const $cookies = inject('$cookies');
const router = useRouter();

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

const saveCookiesSearch = () => {
  const dataSearch = {
    dateOfDeparture: searchOptionsVoo.dateOfDeparture,
    dateOfReturn: searchOptionsVoo.dateOfReturn,
    origin: searchOptionsVoo.origin,
    destiny: searchOptionsVoo.destiny,
    cabin: searchOptionsVoo.cabin,
    adults: searchOptionsVoo.adults,
    teenagers: searchOptionsVoo.teenagers,
    babies: searchOptionsVoo.babies,
    onlyBaggage: searchOptionsVoo.onlyBaggage,
    quantidadeDeVoos: 10,
    apenasVoosDiretos: searchOptionsVoo.apenasVoosDiretos,
  };
  $cookies.set('dataSearch', dataSearch);
};
const consultar = () => {
  if (
    !searchOptionsVoo.origin.iata ||
    !searchOptionsVoo.destiny.iata ||
    !searchOptionsVoo.getDateIdaFormatter ||
    !searchOptionsVoo.getDateVoltaFormatter
  ) {
    alertStore.showMsg({
      message: 'Por favor, verifique, existen campos vacios o incorrectos',
      backgrColor: 'bg-red-100',
      textColor: 'text-red-700',
    });
    return;
  }

  saveCookiesSearch();
  router.push({name: 'VoosIdaVolta'})

  const body = {
    DataIda: `/Date(${new Date(
      searchOptionsVoo.getDateIdaFormatter
    ).getTime()})/`,
    DataVolta: `/Date(${new Date(
      searchOptionsVoo.getDateVoltaFormatter
    ).getTime()})/`,
    Destino: searchOptionsVoo.destiny.iata,
    Flex: true,
    Origem: searchOptionsVoo.origin.iata,
    QuantidadeAdultos: searchOptionsVoo.adults,
    QuantidadeBebes: searchOptionsVoo.babies,
    QuantidadeCriancas: searchOptionsVoo.teenagers,
    Recomendacao: true,
    ApenasVoosComBagagem: searchOptionsVoo.onlyBaggage,
    ApenasVoosDiretos: searchOptionsVoo.apenasVoosDiretos,
    ...(searchOptionsVoo.cabin.value
      ? { Cabine: searchOptionsVoo.cabin.value }
      : {}),
  };

  woobaStore.loading = true;

  woobaStore
    .consultaOrigemDestino(body)
    .then(({ data }) => {
      let {
        Exception,
        ViagensTrecho1,
        ViagensTrecho2,
        OfertasDesde,
        AirportsIataTrecho1,
        AirportsIataTrecho2,
        Cia,
      } = data.data;

      woobaStore.exception = Exception;
      woobaStore.companies = Cia;
      woobaStore.airportsFilter =
        AirportsIataTrecho1.concat(AirportsIataTrecho2);

      if (!ViagensTrecho2) {
        woobaStore.outboundFlights = woobaData(
          ViagensTrecho1,
          OfertasDesde.trechoOneOferta
        );
        woobaStore.returnFlights = null;
      } else {
        woobaStore.outboundFlights = woobaDataMultiple(
          ViagensTrecho1,
          OfertasDesde.trechoOneOferta
        );
        woobaStore.returnFlights = woobaDataMultiple(
          ViagensTrecho2,
          OfertasDesde.trechoTwoOferta
        );
      }
      woobaStore.loading = false;
    })
    .catch(() => {
      woobaStore.loading = false;
    });
};
</script>
<style scoped></style>
