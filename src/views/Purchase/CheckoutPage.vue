<template>
  <div>
    <LayoutTwoViews>
      <template #aside>
        <div class="flex items-center justify-center py-9 px-8">
          <ClockOffers />
        </div>
        <div class="px-4">
          <!--     VUELO DE IDA       -->
          <table
            class="table-fixed border border-gray-200 w-full border-spacing-2 border-separate"
          >
            <tbody>
              <tr>
                <td class="flex items-center justify-between lg:space-x-3.5">
                  <div class="flex items-center space-x-2.5 lg:text-center">
                    <img
                      class="h-6 w-6"
                      src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
                      alt="Icon Voo"
                    />
                    <h3 class="font-semibold">{{ t('Vuelo de Ida') }}</h3>
                  </div>
                  <div>
                    <h3 class="font-semibold lg:text-center">
                      {{ travels.travel_one.Origem }}
                    </h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  class="flex items-center justify-between border-t-2 border-gray-200 p-2"
                >
                  <div class="text-sm lg:flex lg:flex-col lg:items-start">
                    <h3>{{ travels.travel_one.Origem }}</h3>
                    <h3 class="font-bold lg:text-start">
                      {{ departureTime }} {{ departureTimeDayPeriod }}
                    </h3>
                    <h3>{{ dateStringIdaSaida }}</h3>
                  </div>
                  <div class="text-sm text-center">
                    <div class="bg-gray-100 px-9 py-1.5">
                      <h3 class="font-bold">{{ ParadaIda }}</h3>
                      <h3>{{ duracaoVoosIda }}</h3>
                    </div>
                  </div>
                  <div class="text-sm lg:flex lg:flex-col lg:items-end">
                    <h3>
                      {{ travels.travel_one.Destino }}
                    </h3>
                    <h3 class="font-bold lg:text-end">
                      {{ check.checkIn }} {{ check.checkInDayPeriod }}
                    </h3>
                    <h3>{{ dateStringIdaChegada }}</h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="border-t-2 border-gray-200 p-2 text-sm">
                  <div class="flex items-center justify-between">
                    <h3>{{ t('querySubHeading.clase') }}</h3>
                    <h3 class="font-semibold">
                      {{ travels.travel_one.Cabine }}
                    </h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('Aerolínea') }}</h3>
                    <h3 class="font-semibold">
                      {{ travels.travel_one.CiaMandatoria }}
                    </h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2"
                >
                  <div class="flex items-center justify-between">
                    <h3>{{ t('Fees') }}</h3>
                    <h4 class="font-semibold">
                      {{ travels.travel_one.Tarifas ? 'Tem' : 0 }}
                    </h4>
                  </div>

                  <div
                    v-if="
                      travels.travel_one.Baggage &&
                      travels.travel_one.Baggage.length
                    "
                    class="flex flex-col items-start space-y-1.5"
                  >
                    <template
                      v-for="tar in travels.travel_one.Baggage"
                      :key="tar.Tipo"
                    >
                      <div
                        v-if="tar.Quantidade > 0"
                        class="flex items-center justify-between w-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-6 h-6 text-blue-700"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="font-medium">
                          {{ tar.TextoBagagem }}
                        </span>
                      </div>
                    </template>
                  </div>
                  <template v-else>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>

                      <span>NO BAGAGEM</span>
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>

          <!--     VUELO DE VUELTA       -->
          <table
            v-if="travels.travel_two"
            class="table-fixed border border-t-0 border-gray-200 w-full border-spacing-2 border-separate"
          >
            <tbody>
              <tr>
                <td class="flex items-center justify-between lg:space-x-3.5">
                  <div class="flex items-center space-x-2.5 lg:text-center">
                    <img
                      class="h-6 w-6"
                      src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                      alt="Icon Voo"
                    />
                    <h3 class="font-semibold">
                      {{ t('detailsPage.vueloDevolta') }}
                    </h3>
                  </div>
                  <div>
                    <h3 class="font-semibold">
                      {{ travels.travel_two.Origem }}
                    </h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  class="flex items-center justify-between border-t-2 border-gray-200 p-2"
                >
                  <div class="text-sm lg:flex lg:flex-col lg:items-start">
                    <h3>{{ travels.travel_two.Origem }}</h3>
                    <h3 class="font-bold lg:text-start">
                      {{ departureTimeVolta }} {{ departureTimeDayPeriodVolta }}
                    </h3>
                    <h3>{{ dateStringIdaSaidaVolta }}</h3>
                  </div>
                  <div class="text-sm text-center">
                    <div class="bg-gray-100 px-9 py-1.5">
                      <h3 class="font-bold">{{ ParadaVolta }}</h3>
                      <h3>{{ duracaoVoosVolta }}</h3>
                    </div>
                  </div>
                  <div class="text-sm lg:flex lg:flex-col lg:items-end">
                    <h3>
                      {{ travels.travel_two.Destino }}
                    </h3>
                    <h3 class="font-bold lg:text-end">
                      {{ checkVolta.checkInVolta }}
                      {{ checkVolta.checkInDayPeriodVolta }}
                    </h3>
                    <h3>{{ dateStringIdaChegadaVolta }}</h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="border-t-2 border-gray-200 p-2 text-sm">
                  <div class="flex items-center justify-between">
                    <h3>{{ t('querySubHeading.clase') }}</h3>
                    <h3 class="font-semibold">
                      {{ travels.travel_two.Cabine }}
                    </h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('Aerolínea') }}</h3>
                    <h3 class="font-semibold">
                      {{ travels.travel_two.CiaMandatoria }}
                    </h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2"
                >
                  <div class="flex items-center justify-between">
                    <h3>{{ t('Fees') }}</h3>
                    <h4 class="font-semibold">
                      {{ travels.travel_two.Tarifas ? 'Tem' : 0 }}
                    </h4>
                  </div>
                  <div
                    v-if="
                      travels.travel_two.Baggage &&
                      travels.travel_two.Baggage.length
                    "
                    class="flex flex-col items-start space-y-1.5"
                  >
                    <template
                      v-for="tar in travels.travel_two.Baggage"
                      :key="tar.Tipo"
                    >
                      <div
                        v-if="tar.Quantidade > 0"
                        class="flex items-center justify-between w-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-6 h-6 text-blue-700"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="font-medium">
                          {{ tar.TextoBagagem }}
                        </span>
                      </div>
                    </template>
                  </div>
                  <template v-else>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>

                      <span>NO BAGAGEM</span>
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="table-fixed border border-t-0 border-gray-200 w-full border-spacing-2 border-separate"
          >
            <tbody>
              <tr>
                <td class="flex flex-col space-y-1.5 p-2">
                  <div>
                    <h3 class="font-bold">Passantes</h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('adults', searchStore.adults) }}</h3>
                    <h3 class="font-semibold">{{ searchStore.adults }}</h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('children', searchStore.teenagers) }}</h3>
                    <h3 class="font-semibold">
                      {{ searchStore.teenagers }}
                    </h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('babies', searchStore.babies) }}</h3>
                    <h3 class="font-semibold">{{ searchStore.babies }}</h3>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="table-fixed border border-t-0 border-gray-200 w-full border-spacing-2 border-separate"
          >
            <tbody>
              <tr>
                <td class="flex flex-col space-y-1.5 p-2">
                  <div>
                    <h3 class="font-bold">Tus Checões</h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('Total para todos os passageiros') }}</h3>
                    <h3 class="font-semibold">{{ valorTotalPassenger }}</h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('Taxas e encargos') }}</h3>
                    <h3 class="font-semibold">{{ valorTaxas }}</h3>
                  </div>
                  <div class="flex items-center justify-between">
                    <h3>{{ t('Bagagem') }}</h3>
                    <h3 class="font-semibold">{{ valorBagagem }}</h3>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  class="flex items-center justify-between border-t-2 border-gray-200 p-2 pb-5"
                >
                  <CouponButton
                    label="Tem um cupom?"
                    class="w-full"
                    placeholder="Insira seu cupom"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="table-fixed border border-y-0 lg:border-b border-gray-200 w-full border-spacing-2 border-separate"
          >
            <tbody>
              <tr>
                <td class="flex flex-col space-y-1.5 p-2">
                  <div class="flex items-center justify-between">
                    <h1 class="font-bold text-xl">{{ t('Valor total') }}</h1>
                    <h1>{{ valorTotal }}</h1>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template #main>
        <RouterView />
      </template>
    </LayoutTwoViews>
  </div>
</template>

<script setup>
import CouponButton from '@/components/Purchase/CouponButton.vue';
import { computed } from 'vue';
import moment from 'moment/min/moment-with-locales';
import momentDurationFormatSetup from 'moment-duration-format';
import { useI18n } from 'vue-i18n';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import { RouterView } from 'vue-router';
import LayoutTwoViews from '@/layouts/LayoutTwoViews.vue';
import ClockOffers from '@/components/Purchase/ClockOffers.vue';
import Cookies from 'js-cookie';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';

momentDurationFormatSetup(moment);
const { locale, t } = useI18n();
const searchStore = useSearchOptionsVooStore();

const travels = computed(() => ({
  travel_one: JSON.parse(Cookies.get('I')),
  travel_two: Cookies.get('V') ? JSON.parse(Cookies.get('V')) : null,
}));

const valorTaxas = computed(() => {
  const { travel_one, travel_two } = travels.value;
  const totalTaxas =
    (+travel_one?.ValorTotalTaxas || 0) +
    (+travel_one?.ValorTxServico || 0) +
    (+travel_two?.ValorTotalTaxas || 0) +
    (+travel_two?.ValorTxServico || 0);
  return useCurrencyFormatter({
    currency: 'BRL',
    value: totalTaxas,
  });
});

const valorTotalPassenger = computed(() => {
  const { travel_one, travel_two } = travels.value;
  const totalPassenger =
    (+travel_one?.ValorAdulto || 0) +
    (+travel_one?.ValorBebe || 0) +
    (+travel_one?.ValorCrianca || 0) +
    (+travel_two?.ValorCrianca || 0) +
    (+travel_two?.ValorAdulto || 0) +
    (+travel_two?.ValorBebe || 0);

  return useCurrencyFormatter({
    currency: 'BRL',
    value: totalPassenger,
  });
});

const valorTotal = computed(() => {
  const { travel_one, travel_two } = travels.value;
  const total =
    (+travel_one?.ValorTotalComTaxa || 0) +
    (+travel_two?.ValorTotalComTaxa || 0);
  return useCurrencyFormatter({
    currency: 'BRL',
    value: total,
  });
});

const valorBagagem = computed(() => {
  const { travel_one, travel_two } = travels.value;
  const totalBagagem =
    (+travel_one?.ValorTxServico || 0) + (+travel_two?.ValorTxServico || 0);
  return useCurrencyFormatter({
    currency: 'BRL',
    value: totalBagagem,
  });
});

//TODO INFORMACION SOBRE VUELO DE IDA
const departureTime = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_one.Voos[0].Saida));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const departureTimeDayPeriod = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_one.Voos[0].Saida));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const dateStringIdaSaida = computed(() => {
  return formatDate(travels.value.travel_one.Voos[0].Saida);
});

const ParadaIda = computed(() => {
  const voosIda =
    travels.value.travel_one?.VoosIda ?? travels.value.travel_one?.Voos;
  return getStops(voosIda);
});

const duracaoVoosIda = computed(() => {
  const flag = travels.value.travel_one.Voos.length;
  return duration(
    travels.value.travel_one.Voos[0].Saida,
    travels.value.travel_one.Voos[flag - 1].Chegada
  );
});

const check = computed(() => {
  const { Voos } = travels.value.travel_one;
  const flag = Voos.length;
  const dateLocal = new Date(moment(Voos[flag - 1].Chegada));
  const { hour } = dateLocal;
  const checkIn = dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const checkInDayPeriod = hour >= 12 ? 'PM' : 'AM';

  return { checkIn, checkInDayPeriod };
});

const dateStringIdaChegada = computed(() => {
  const { Voos } = travels.value.travel_one;
  const flag = Voos.length;
  return formatDate(Voos[flag - 1].Chegada);
});

//TODO INFORMACION SOBRE VUELO DE VUELTA
const departureTimeVolta = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_two.Voos[0].Saida));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const departureTimeDayPeriodVolta = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_two.Voos[0].Saida));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const checkVolta = computed(() => {
  const { Voos } = travels.value.travel_two;
  const flag = Voos.length;
  const dateLocal = new Date(moment(Voos[flag - 1].Chegada));
  const { hour } = dateLocal;
  const checkInVolta = dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const checkInDayPeriodVolta = hour >= 12 ? 'PM' : 'AM';

  return { checkInVolta, checkInDayPeriodVolta };
});

const dateStringIdaSaidaVolta = computed(() => {
  return formatDate(travels.value.travel_two.Voos[0].Saida);
});

const ParadaVolta = computed(() => {
  const voosVolta =
    travels.value.travel_two?.VoosVolta || travels.value.travel_two?.Voos;
  return getStops(voosVolta);
});

const duracaoVoosVolta = computed(() => {
  const flag = travels.value.travel_two.Voos.length;
  return duration(
    travels.value.travel_two.Voos[0].Saida,
    travels.value.travel_two.Voos[flag - 1].Chegada
  );
});

const dateStringIdaChegadaVolta = computed(() => {
  const { Voos } = travels.value.travel_two;
  const flag = Voos.length;
  return formatDate(Voos[flag - 1].Chegada);
});

//TODO COMMON
const duration = (dataSaida, dataLlegada) => {
  const x = moment(dataSaida);
  const y = moment(dataLlegada);
  return `${Math.trunc(moment.duration(y.diff(x)).as('hours'))} hrs ${moment
    .duration(y.diff(x))
    .get('minutes')}min`;
};

const getStops = (v) => {
  let stops = [];
  if (Array.isArray(v)) {
    v.forEach((e) => {
      if (e.TempoEspera) {
        stops.push(e.Origem);
      }
    });
  }
  if (stops.length === 0) {
    if (Array.isArray(v)) {
      let l = v.length;
      stops.push(v[l - 1]?.Origem || 0);
    } else {
      stops.push(v.Origem);
    }
  }
  return `Parada(s): ${stops.join(', ')}`;
};

const formatDate = (date) => {
  if (locale.value === 'br') {
    moment.locale('pt-br');
  } else {
    moment.locale(locale.value);
  }
  return upperC(moment(date).format('DD MMM'));
};

const upperC = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
