<template>
  <div>
    <div class="mt-5 flex flex-col space-y-1">
      <div class="px-4">
        <AutoComplete
          :label="t('roundTripForm.labelDesde')"
          :value="optionsVoo.origin.label"
          @input="
            (e) => {
              optionsVoo.origin.label = e;
            }
          "
          @select="
            (s) => {
              optionsVoo.origin.iata = s;
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
          :value="optionsVoo.destiny.label"
          @input="
            (e) => {
              optionsVoo.destiny.label = e;
            }
          "
          @select="
            (s) => {
              optionsVoo.destiny.iata = s;
            }
          "
        />
      </div>

      <div class="flex pt-4 px-4">
        <DateInput
          v-model="optionsVoo.dateOfDeparture"
          :label="t('roundTripForm.labelIda')"
          :min-date-show="new Date()"
          class="w-full"
        />
        <DateInput
          v-model="optionsVoo.dateOfReturn"
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
                >{{ optionsVoo.adults }}
                {{ t('adults', optionsVoo.adults) }}</span
              >
              <span
                >{{ optionsVoo.teenagers }}
                {{ t('children', optionsVoo.teenagers) }}</span
              >
              <span
                >{{ optionsVoo.babies }}
                {{ t('babies', optionsVoo.babies) }}</span
              >
            </div>
          </template>
          <template #dropdown>
            <div class="flex items-center justify-between px-4">
              <ManageItems
                v-model="optionsVoo.adults"
                subtitle="+12 anos"
                :label="t('adults')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="optionsVoo.teenagers"
                subtitle="2-11 anos"
                :label="t('children')"
                @take-off="takeOff"
                @add-up="addUp"
              />

              <ManageItems
                v-model="optionsVoo.babies"
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
          v-model="optionsVoo.apenasVoosDiretos"
          :label="t('roundTripForm.voosDirectos')"
          class="pt-4"
        />
        <Check
          v-model="optionsVoo.onlyBaggage"
          :label="t('roundTripForm.apenasComBabagem')"
        />
      </div>

      <div class="">
        <button
          class="bg-blue-700 hover:bg-blue-800 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400 disabled:cursor-wait"
          :disabled="vooStore.loading"
          @click="consultar()"
        >
          <span>{{ t('roundTripForm.pesquisarVoos') }}</span>
          <div
            v-if="vooStore.loading"
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
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Check from '@/components/FormUI/CheckInput.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useI18n } from 'vue-i18n';
import CabineComponent from '@/components/FormUI/CabineComponent.vue';
import { useAlertStore } from '@/stores/alert';
import { woobaData, woobaDataMultiple } from '@/utils/unifyDataWooba';
import { useRouter } from 'vue-router';
import { useVooStore } from '@/stores/voo';

const optionsVoo = useSearchOptionsVooStore();
const alertStore = useAlertStore();
const { t } = useI18n();
const router = useRouter();
const vooStore = useVooStore();

const addUp = (e) => {
  if (e === t('adults') && optionsVoo.adults < 8) {
    optionsVoo.adults++;
  } else if (e === t('children') && optionsVoo.teenagers < 8) {
    optionsVoo.teenagers++;
  } else if (
    e === t('babies') &&
    optionsVoo.babies < 8 &&
    optionsVoo.babies < optionsVoo.adults
  ) {
    optionsVoo.babies++;
  }
};

const takeOff = (e) => {
  if (e === t('adults') && optionsVoo.adults > 1) {
    optionsVoo.adults--;
    if (optionsVoo.babies > optionsVoo.adults) optionsVoo.babies = 0;
  } else if (e === t('children') && optionsVoo.teenagers > 0) {
    optionsVoo.teenagers--;
  } else if (e === t('babies') && optionsVoo.babies > 0) {
    optionsVoo.babies--;
  }
};

const changeDestinations = () => {
  let temporaryString = optionsVoo.origin.label;
  let temporaryIata = optionsVoo.origin.iata;

  optionsVoo.origin.label = optionsVoo.destiny.label;
  optionsVoo.origin.iata = optionsVoo.destiny.iata;

  optionsVoo.destiny.label = temporaryString;
  optionsVoo.destiny.iata = temporaryIata;
};

const notBeforeDate = computed(() => {
  if (optionsVoo.dateOfDeparture) {
    let dateParts = optionsVoo.dateOfDeparture.split('/');
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  } else {
    return new Date();
  }
});
const consultar = () => {
  if (
    !optionsVoo.origin.iata ||
    !optionsVoo.destiny.iata ||
    !optionsVoo.getDateIdaFormatter ||
    !optionsVoo.getDateVoltaFormatter
  ) {
    alertStore.showMsg({
      message: 'Por favor, verifique, existen campos vacios o incorrectos',
      backgrColor: 'bg-red-100',
      textColor: 'text-red-700',
    });
    return;
  }

  router.push({ name: 'VoosIdaVolta' });

  /* const body = {
    DataIda: `/Date(${new Date(
      optionsVoo.getDateIdaFormatter
    ).getTime()})/`,
    DataVolta: `/Date(${new Date(
      optionsVoo.getDateVoltaFormatter
    ).getTime()})/`,
    Destino: optionsVoo.destiny.iata,
    Flex: true,
    Origem: optionsVoo.origin.iata,
    QuantidadeAdultos: optionsVoo.adults,
    QuantidadeBebes: optionsVoo.babies,
    QuantidadeCriancas: optionsVoo.teenagers,
    Recomendacao: true,
    ApenasVoosComBagagem: optionsVoo.onlyBaggage,
    ApenasVoosDiretos: optionsVoo.apenasVoosDiretos,
    ...(optionsVoo.cabin.value
      ? { Cabine: optionsVoo.cabin.value }
      : {}),
  };*/
  const payload = {
    Origem: optionsVoo.origin.iata,
    Destino: optionsVoo.destiny.iata,
    Ida: optionsVoo.getDateIdaFormatter,
    Volta: optionsVoo.getDateVoltaFormatter,
    Adultos: optionsVoo.adults,
    Criancas: optionsVoo.teenagers,
    Bebes: optionsVoo.babies,
    Companhia: [2],
    Cabine: optionsVoo.cabin.value,
  };

  vooStore.loading = true;

  vooStore.checkFlightsRoundTrip(payload, 'ValorTotal');

  /*woobaStore
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
