<template>
  <div class="mt-5">
    <div class="flex flex-col space-y-5">
      <div class="flex flex-col space-y-3.5 px-4">
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
            <div class="flex items-center justify-between px-4">
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

        <CabineComponent />
      </div>

      <div class="flex flex-col space-y-2 px-4">
        <TransitionGroup name="list">
          <template
            v-for="(trecho, index) in searchOptionsVooStore.multiplosTrechos"
            :key="index"
          >
            <div class="grid gap-2.5 relative">
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
          :disabled="woobaStore.loading"
          @click="consultar()"
        >
          <span>{{ t('roundTripForm.pesquisarVoos') }}</span>
          <div
            v-if="woobaStore.loading"
            class="absolute right-2 animate-spin h-6 w-6 border-0 border-t-2 border-white rounded-full"
          ></div>
          <ArrowRight v-else fill-color="white" class="absolute right-2" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import CabineComponent from '@/components/FormUI/CabineComponent.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useI18n } from 'vue-i18n';
import { useAlertStore } from '@/stores/alert';
import { woobaDataVoosMultiple } from '@/utils/unifyDataWooba';
import { useRouter } from 'vue-router';
import { useWoobaStore } from '@/stores/wooba';
import { useFormatterDateWooba } from '@/composables/formatter';

const searchOptionsVooStore = useSearchOptionsVooStore();
const { t } = useI18n();
const $cookies = inject('$cookies');
const alertStore = useAlertStore();
const router = useRouter();
const woobaStore = useWoobaStore();

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

const saveCookiesSearch = () => {
  const dataSearch = {
    cabin: searchOptionsVooStore.cabin,
    adults: searchOptionsVooStore.adults,
    teenagers: searchOptionsVooStore.teenagers,
    babies: searchOptionsVooStore.babies,
    multiplosTrechos: searchOptionsVooStore.multiplosTrechos,
  };
  $cookies.set('dataSearch', dataSearch);
};

const addV = () => {
  if (searchOptionsVooStore.multiplosTrechos.length < 5) {
    searchOptionsVooStore.multiplosTrechos.push({
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
    alertStore.showMsg({
      message: 'Você só pode adicionar até cinco (5) voos',
      backgrColor: 'bg-red-100',
      textColor: 'text-red-700',
    });
  }
};

const deleteField = (i) => {
  searchOptionsVooStore.multiplosTrechos.splice(i, 1);
};

const consultar = () => {
  const t1 = searchOptionsVooStore.multiplosTrechos[0];
  const t2 = searchOptionsVooStore.multiplosTrechos[1];

  if (
    !t1.departureDate ||
    !t1.destino.string ||
    !t1.destino.iata ||
    !t1.origem.string ||
    !t1.origem.iata ||
    !t2.departureDate ||
    !t2.destino.string ||
    !t2.destino.iata ||
    !t2.origem.string ||
    !t2.origem.iata
  ) {
    alertStore.showMsg({
      message: 'Por favor, verifique, existen campos vacios o incorrectos',
      backgrColor: 'bg-red-100',
      textColor: 'text-red-700',
    });
    return;
  }

  saveCookiesSearch();
  router.push({ name: 'VoosMultiple' });

  const body = {
    ApenasVoosComBagagem: searchOptionsVooStore.onlyBaggage,
    ApenasVoosDiretos: false,
    BuscarVoosComBagagem: true,
    BuscarVoosSemBagagem: true,
    ...(searchOptionsVooStore.cabin.value
      ? { Cabine: searchOptionsVooStore.cabin.value }
      : {}),
    Flex: true,
    MultiplosTrechos: searchOptionsVooStore.multiplosTrechos.map((o) => {
      return {
        Data: `/Date(${new Date(
          useFormatterDateWooba(o.departureDate)
        ).getTime()})/`,
        Destino: o.destino.iata,
        Origem: o.origem.iata,
      };
    }),
    QuantidadeAdultos: searchOptionsVooStore.adults,
    QuantidadeBebes: searchOptionsVooStore.babies,
    QuantidadeCriancas: searchOptionsVooStore.teenagers,
    QuantidadeDeVoos: 100,
    Recomendacao: true,
    Sistema: 0,
  };

  woobaStore.loading = true;

  woobaStore
    .consultaMultiploTrecho(body)
    .then(({ data }) => {
      let {
        Exception,
        ViagensTrecho1,
        OfertasDesde,
        AirportsIataTrecho1,
        AirportsIataTrecho2,
        Cia,
      } = data.data;
      woobaStore.exception = Exception;
      woobaStore.companies = Cia;
      woobaStore.airportsFilter =
        AirportsIataTrecho1.concat(AirportsIataTrecho2);

      woobaStore.outboundFlights = woobaDataVoosMultiple(
        ViagensTrecho1,
        OfertasDesde.trechoOneOferta
      );
      woobaStore.returnFlights = null;
      woobaStore.loading = false;
    })
    .catch(() => {
      woobaStore.loading = false;
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
