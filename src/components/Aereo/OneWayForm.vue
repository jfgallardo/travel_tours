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
          <ArrowDownIcon class="h-8 w-5 text-gray-700 -mr-1" />
          <ArrowUpIcon class="h-8 w-5 text-gray-700 -mr-1" />
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

      <div class="flex pt-4 px-4">
        <DateInput
          v-model="searchOptionsVooStore.dateOfDeparture"
          label="roundTripForm.labelIda"
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
                >{{ searchOptionsVooStore.adults }}
                {{ t('adults', searchOptionsVooStore.adults) }}</span
              >
              <span
                >{{ searchOptionsVooStore.teenagers }}
                {{ t('children', searchOptionsVooStore.teenagers) }}</span
              >
              <span
                >{{ searchOptionsVooStore.babies }}
                {{ t('babies', searchOptionsVooStore.babies) }}</span
              >
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
        <Check :label="t('roundTripForm.voosDirectos')" class="pt-4" />
        <Check
          v-model="searchOptionsVooStore.onlyBaggage"
          :label="t('roundTripForm.apenasComBabagem')"
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
import { useRouter } from 'vue-router';
import { useMoblixStore } from '@/stores/moblix';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Check from '@/components/FormUI/CheckInput.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import { useI18n } from 'vue-i18n';
import CabineComponent from '@/components/FormUI/CabineComponent.vue';
import { useAlertStore } from '@/stores/alert';
import { useWoobaStore } from '@/stores/wooba';
import { woobaData, woobaDataMultiple } from '@/utils/unifyDataWooba';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';
import { useVooStore } from '@/stores/voo';

const moblixStore = useMoblixStore();
const searchOptionsVooStore = useSearchOptionsVooStore();
const router = useRouter();
const { t } = useI18n();
const alertStore = useAlertStore();
const woobaStore = useWoobaStore();
const vooStore = useVooStore();

const addUp = (e) => {
  if (e === t('adults') && searchOptionsVooStore.adults < 8) {
    searchOptionsVooStore.adults++;
  } else if (e === t('children') && searchOptionsVooStore.teenagers < 8) {
    searchOptionsVooStore.teenagers++;
  } else if (
    e === t('babies') &&
    searchOptionsVooStore.babies < 8 &&
    searchOptionsVooStore.babies < searchOptionsVooStore.adults
  ) {
    searchOptionsVooStore.babies++;
  }
};

const takeOff = (e) => {
  if (e === t('adults') && searchOptionsVooStore.adults > 1) {
    searchOptionsVooStore.adults--;
    if (searchOptionsVooStore.babies > searchOptionsVooStore.adults)
      searchOptionsVooStore.babies = 0;
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

const consultar = () => {
  if (
    !searchOptionsVooStore.origin.iata ||
    !searchOptionsVooStore.destiny.iata ||
    !searchOptionsVooStore.getDateIdaFormatter
  ) {
    alertStore.showMsg({
      message: 'Por favor, verifique, existen campos vacios o incorrectos',
      backgrColor: 'bg-red-100',
      textColor: 'text-red-700',
    });
    return;
  }

  router.push({ name: 'VooHome' });

  /*  const body = {
    DataIda: `/Date(${new Date(
      searchOptionsVooStore.getDateIdaFormatter
    ).getTime()})/`,
    Destino: searchOptionsVooStore.destiny.iata,
    Flex: true,
    Origem: searchOptionsVooStore.origin.iata,
    QuantidadeAdultos: searchOptionsVooStore.adults,
    QuantidadeBebes: searchOptionsVooStore.babies,
    QuantidadeCriancas: searchOptionsVooStore.teenagers,
    Recomendacao: true,
    ApenasVoosComBagagem: searchOptionsVooStore.onlyBaggage,
    ApenasVoosDiretos: searchOptionsVooStore.apenasVoosDiretos,
    ...(searchOptionsVooStore.cabin.value
      ? { Cabine: searchOptionsVooStore.cabin.value }
      : {}),
  };*/

  const payload = {
    Origem: searchOptionsVooStore.origin.iata,
    Destino: searchOptionsVooStore.destiny.iata,
    Ida: searchOptionsVooStore.getDateIdaFormatter,
    Volta: '0001-01-01',
    Adultos: searchOptionsVooStore.adults,
    Criancas: searchOptionsVooStore.teenagers,
    Bebes: searchOptionsVooStore.babies,
    Companhia: -1,
    Cabine: searchOptionsVooStore.cabin.value,
  };

  vooStore.loading = true;

  vooStore.checkFlightsRoundTrip(payload);

  /* woobaStore
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
    });*/
};
</script>
<style scoped></style>
