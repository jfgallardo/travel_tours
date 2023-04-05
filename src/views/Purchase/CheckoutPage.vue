<template>
  <div>
    <LayoutTwoViews>
      <template #aside>
        <div class="flex items-center justify-center py-9 px-8">
          <ClockOffers />
        </div>
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
                  <h3 class="font-semibold">Vuelo de Ida</h3>
                </div>
                <div>
                  <h3 class="font-semibold lg:text-center">
                    {{ user.outboundFlightOrigin.Origem.Descricao }}
                  </h3>
                </div>
              </td>
            </tr>
            <tr>
              <td
                class="flex items-center justify-between border-t-2 border-gray-200 p-2"
              >
                <div class="text-sm lg:flex lg:flex-col lg:items-start">
                  <h3>{{ user.outboundFlightOrigin.Origem.CodigoIata }}</h3>
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
                    {{ user.outboundFlightDestination.Destino.CodigoIata }}
                  </h3>
                  <h3 class="font-bold lg:text-end">
                    {{ checkIn }} {{ checkInDayPeriod }}
                  </h3>
                  <h3>{{ dateStringIdaChegada }}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border-t-2 border-gray-200 p-2 text-sm">
                <div class="flex items-center justify-between">
                  <h3>Clase</h3>
                  <h3 class="font-semibold">
                    {{ user.outboundFlightOrigin.Cabine }}
                  </h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Areolinea</h3>
                  <h3 class="font-semibold">
                    {{ user.vooSelected.CiaMandatoria.Descricao }}
                  </h3>
                </div>
              </td>
            </tr>
            <tr>
              <td
                class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2"
              >
                <div class="flex items-center justify-between">
                  <h3>Fees</h3>
                  <h4 class="font-semibold">6.17</h4>
                </div>
                <div
                  v-if="user.vooSelected.Baggage"
                  class="flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 text-blue-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span> BAGAGEM </span>
                </div>
                <div v-else class="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 text-blue-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>NÃO BAGAGEM </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="
            user.vooSelected.VoosVolta && user.vooSelected.VoosVolta.length > 0
          "
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
                  <h3 class="font-semibold">Vuelo de Volta</h3>
                </div>
                <div>
                  <h3 class="font-semibold">
                    {{ user.returnFlightOrigin.Origem.Descricao }}
                  </h3>
                </div>
              </td>
            </tr>
            <tr>
              <td
                class="flex items-center justify-between border-t-2 border-gray-200 p-2"
              >
                <div class="text-sm lg:flex lg:flex-col lg:items-start">
                  <h3>{{ user.returnFlightOrigin.Origem.CodigoIata }}</h3>
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
                  <h3>{{ user.returnFlightDestination.Destino.CodigoIata }}</h3>
                  <h3 class="font-bold lg:text-end">
                    {{ checkInVolta }} {{ checkInDayPeriodVolta }}
                  </h3>
                  <h3>{{ dateStringIdaChegadaVolta }}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border-t-2 border-gray-200 p-2 text-sm">
                <div class="flex items-center justify-between">
                  <h3>Clase</h3>
                  <h3 class="font-semibold">
                    {{ user.returnFlightOrigin.Cabine }}
                  </h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Areolinea</h3>
                  <h3 class="font-semibold">
                    {{ user.vooSelected.CiaMandatoria.Descricao }}
                  </h3>
                </div>
              </td>
            </tr>
            <tr>
              <td
                class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2"
              >
                <div class="flex items-center justify-between">
                  <h3>Fees</h3>
                  <h4 class="font-semibold">6.17</h4>
                </div>
                <div
                  v-if="user.vooSelected.Baggage"
                  class="flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 text-blue-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span> BAGAGEM </span>
                </div>
                <div v-else class="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 text-blue-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>NÃO BAGAGEM </span>
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
                  <h3 class="font-bold">Passantes</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>{{ t('adults', user.countAdulto) }}</h3>
                  <h3 class="font-semibold">{{ user.countAdulto }}</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>{{ t('children', user.countCrianca) }}</h3>
                  <h3 class="font-semibold">
                    {{ user.countCrianca }}
                  </h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>{{ t('babies', user.countBebe) }}</h3>
                  <h3 class="font-semibold">{{ user.countBebe }}</h3>
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
                  <h3>Total para todos os passageiros</h3>
                  <h3 class="font-semibold">{{ ValorTotal }}</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Taxas e encargos</h3>
                  <h3 class="font-semibold">{{ ValorTaxas }}</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Bagagem</h3>
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
                  <h1 class="font-bold text-xl">Valor total</h1>
                  <h1>{{ ValorTotal }}</h1>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template #main>
        <RouterView />
      </template>
    </LayoutTwoViews>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import CouponButton from '@/components/Purchase/CouponButton.vue';
import { computed } from 'vue';
import moment from 'moment/min/moment-with-locales';
import momentDurationFormatSetup from 'moment-duration-format';
import { useI18n } from 'vue-i18n';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import { RouterView } from 'vue-router';
import LayoutTwoViews from '@/layouts/LayoutTwoViews.vue';
import ClockOffers from '@/components/Purchase/ClockOffers.vue';

momentDurationFormatSetup(moment);
const { locale, t } = useI18n();

const user = useUserStore();

const ValorTaxas = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: user.vooSelected.Preco.Taxa,
  });
});
const ValorTotal = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: user.vooSelected.Preco.Total,
  });
});
const valorBagagem = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: user.vooSelected.Preco.TotalTaxaBagagem,
  });
});

const departureTime = computed(() => {
  const dateLocal = new Date(moment(user.outboundFlightOrigin.DataSaida));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});
const departureTimeVolta = computed(() => {
  const dateLocal = new Date(moment(user.returnFlightOrigin.DataSaida));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const departureTimeDayPeriod = computed(() => {
  const dateLocal = new Date(moment(user.outboundFlightOrigin.DataSaida));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});
const departureTimeDayPeriodVolta = computed(() => {
  const dateLocal = new Date(moment(user.returnFlightOrigin.DataSaida));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const checkIn = computed(() => {
  const dateLocal = new Date(
    moment(user.outboundFlightDestination.DataChegada)
  );
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});
const checkInVolta = computed(() => {
  const dateLocal = new Date(moment(user.returnFlightDestination.DataChegada));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const checkInDayPeriod = computed(() => {
  const dateLocal = new Date(
    moment(user.outboundFlightDestination.DataChegada)
  );
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});
const checkInDayPeriodVolta = computed(() => {
  const dateLocal = new Date(moment(user.returnFlightDestination.DataChegada));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const duracaoVoosIda = computed(() => {
  return duration(
    user.outboundFlightOrigin.DataSaida,
    user.outboundFlightDestination.DataChegada
  );
});
const duracaoVoosVolta = computed(() => {
  return duration(
    user.returnFlightOrigin.DataSaida,
    user.returnFlightDestination.DataChegada
  );
});
const duration = (dataSaida, dataLlegada) => {
  const x = moment(dataSaida);
  const y = moment(dataLlegada);
  return `${Math.trunc(moment.duration(y.diff(x)).as('hours'))} hrs ${moment
    .duration(y.diff(x))
    .get('minutes')}min`;
};

const ParadaIda = computed(() => {
  if (user.vooSelected.VoosIda) return getStops(user.vooSelected.VoosIda);
  return getStops(user.vooSelected.Voos);
});
const ParadaVolta = computed(() => {
  if (user.vooSelected.VoosVolta) return getStops(user.vooSelected.VoosVolta);
  return '';
});
const getStops = (v) => {
  let stops = [];
  if (Array.isArray(v)) {
    v.forEach((e) => {
      if (e.Conexao) {
        stops.push(e.Origem.CodigoIata);
      }
    });
  }
  if (stops.length === 0) {
    if (Array.isArray(v)) {
      let l = v.length;
      stops.push(v[l - 1].Origem.CodigoIata);
    } else {
      stops.push(v.Origem.CodigoIata);
    }
  }
  return `Parada(s): ${stops.join(', ')}`;
};

const dateStringIdaSaida = computed(() => {
  return formatDate(user.outboundFlightOrigin.DataSaida);
});
const dateStringIdaChegada = computed(() => {
  return formatDate(user.outboundFlightDestination.DataChegada);
});
const dateStringIdaSaidaVolta = computed(() => {
  return formatDate(user.returnFlightOrigin.DataSaida);
});
const dateStringIdaChegadaVolta = computed(() => {
  return formatDate(user.returnFlightDestination.DataChegada);
});
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
