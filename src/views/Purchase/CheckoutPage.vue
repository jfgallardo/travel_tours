<template>
  <div>
    <LayoutTwoViews>
      <template #aside>
        <div class="flex items-center justify-center py-9 px-8">
          <ClockOffers />
        </div>
        <div class="px-4">
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
                      {{ travels.travel_one.Voos[0].seatClass.description }}
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
                      {{ tarifasOne }}
                    </h4>
                  </div>

                  <div
                    v-if="
                      travels.travel_one.Baggage &&
                      travels.travel_one.Baggage.isIncluded
                    "
                    class="flex flex-col items-start space-y-1.5"
                  >

                      <div
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
                          {{ travels.travel_one.Baggage.texto }}
                        </span>
                      </div>
                  </div>
                  <template v-else>
                    <div class="flex justify-between">
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
                      {{ travels.travel_two.Voos[0].seatClass.description }}
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
                      {{ tarifasTwo }}
                    </h4>
                  </div>
                  <div
                    v-if="
                      travels.travel_two.Baggage &&
                      travels.travel_two.Baggage.isIncluded
                    "
                    class="flex flex-col items-start space-y-1.5"
                  >
                      <div
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
                          {{ travels.travel_two.Baggage.texto }}
                        </span>
                      </div>
                  </div>
                  <template v-else>
                    <div class="flex w-full h-full items-center justify-between">
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
  const priceWithTaxOne = travel_one.FareGroup.fares.reduce((accumulator, item) => accumulator + item.priceWithTax, 0);
  const priceWithTaxTwo = travel_two.FareGroup.fares.reduce((accumulator, item) => accumulator + item.priceWithTax, 0);

  const priceWithoutTaxOne = travel_one.FareGroup.fares.reduce((accumulator, item) => accumulator + item.priceWithoutTax, 0);
  const priceWithoutTaxTwo = travel_two.FareGroup.fares.reduce((accumulator, item) => accumulator + item.priceWithoutTax, 0);

  return useCurrencyFormatter({
    currency: 'BRL',
    value: (priceWithTaxOne - priceWithoutTaxOne) + (priceWithTaxTwo - priceWithoutTaxTwo),
  });
});

const valorTotalPassenger = computed(() => {
  const { travel_one, travel_two } = travels.value;
  const totalPassengerOne = travel_one.FareGroup.fares.reduce((accumulator, item) => accumulator + item.priceWithoutTax, 0);
  const totalPassengerTwo = travel_two.FareGroup.fares.reduce((accumulator, item) => accumulator + item.priceWithoutTax, 0);

  return useCurrencyFormatter({
    currency: 'BRL',
    value: totalPassengerOne + totalPassengerTwo,
  });
});

const valorTotal = computed(() => {
  const { travel_one, travel_two } = travels.value;
  return useCurrencyFormatter({
    currency: 'BRL',
    value: travel_one.Preco + travel_two.Preco,
  });
});

const valorBagagem = computed(() => {
  return useCurrencyFormatter({
    currency: 'BRL',
    value: 0,
  });
});

//TODO INFORMACION SOBRE VUELO DE IDA
const departureTime = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_one.Voos[0].departureDate));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const departureTimeDayPeriod = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_one.Voos[0].departureDate));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const dateStringIdaSaida = computed(() => {
  return formatDate(travels.value.travel_one.Voos[0].departureDate);
});

const ParadaIda = computed(() => {
  return `Parada(s): ${travels.value.travel_one?.NumeroParadas}` ;
});

const duracaoVoosIda = computed(() => {
  const hours = Math.floor(travels.value.travel_one.TempoTotal / 60);
  const remainingMinutes = travels.value.travel_one.TempoTotal % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = remainingMinutes.toString().padStart(2, '0');

  return `${hoursString}h:${minutesString}min`;
});

const check = computed(() => {
  const { Voos } = travels.value.travel_one;
  const flag = Voos.length;
  const dateLocal = new Date(moment(Voos[flag - 1].arrivalDate));
  const hour = dateLocal.getHours();
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
  return formatDate(Voos[flag - 1].arrivalDate);
});

const tarifasOne = computed(() => {
  if (travels.value.travel_one && travels.value.travel_one.FareGroup) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: travels.value.travel_one.FareGroup.priceWithoutTax
    });
  }
  return '';
})

//TODO INFORMACION SOBRE VUELO DE VUELTA
const departureTimeVolta = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_two.Voos[0].departureDate));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const departureTimeDayPeriodVolta = computed(() => {
  const dateLocal = new Date(moment(travels.value.travel_two.Voos[0].departureDate));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const checkVolta = computed(() => {
  const { Voos } = travels.value.travel_two;
  const flag = Voos.length;
  const dateLocal = new Date(moment(Voos[flag - 1].arrivalDate));
  const hour = dateLocal.getHours();
  const checkInVolta = dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const checkInDayPeriodVolta = hour >= 12 ? 'PM' : 'AM';

  return { checkInVolta, checkInDayPeriodVolta };
});

const dateStringIdaSaidaVolta = computed(() => {
  return formatDate(travels.value.travel_two.Voos[0].departureDate);
});

const ParadaVolta = computed(() => {
  return `Parada(s): ${travels.value.travel_two?.NumeroParadas}` ;
});

const duracaoVoosVolta = computed(() => {
  const hours = Math.floor(travels.value.travel_two.TempoTotal / 60);
  const remainingMinutes = travels.value.travel_two.TempoTotal % 60;

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = remainingMinutes.toString().padStart(2, '0');

  return `${hoursString}h:${minutesString}min`;
});

const dateStringIdaChegadaVolta = computed(() => {
  const { Voos } = travels.value.travel_two;
  const flag = Voos.length;
  return formatDate(Voos[flag - 1].arrivalDate);
});

const tarifasTwo = computed(() => {
  if (travels.value.travel_two && travels.value.travel_two.FareGroup) {
    return useCurrencyFormatter({
      currency: 'BRL',
      value: travels.value.travel_two.FareGroup.priceWithoutTax
    });
  }
  return '';
})

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
