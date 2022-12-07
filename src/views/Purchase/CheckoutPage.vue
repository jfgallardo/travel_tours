<template>
  <div>
    <div class="mx-auto px-4 pt-10 pb-20 flex space-x-4">
        <div class="w-1/4 h-5/6 overflow-y-auto fixed left-4 pb-10">
          <table class="table-fixed border-2 border-gray-200 w-full border-spacing-2 border-separate">
            <tbody>
            <tr>
              <td class="flex items-center justify-between">
                <div class="flex space-x-2.5">
                  <img
                      class="h-6 w-6"
                      src="@/assets/ico/icons8-destination-covered-through-air-travel-of-planned-route-location-48.png"
                      alt="Icon Voo"/>
                  <h3 class="font-semibold">Vuelo de Ida</h3>
                </div>
                <div>
                  <h3 class="font-semibold">{{user.outboundFlightDestination.Destino.Descricao}}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="flex items-center justify-between border-t-2 border-gray-200 p-2">
                <div class="text-sm">
                  <h3>{{user.outboundFlightOrigin.Origem.CodigoIata}}</h3>
                  <h3 class="font-bold">{{ departureTime }} {{ departureTimeDayPeriod }}</h3>
                  <h3>{{ dateStringIdaSaida }}</h3>
                </div>
                <div class="text-sm text-center">
                  <div class="bg-gray-100 px-9 py-1.5">
                    <h3 class="font-bold">{{ ParadaIda }}</h3>
                    <h3>{{ duracaoVoosIda }}</h3>
                  </div>
                </div>
                <div class="text-sm">
                  <h3>{{user.outboundFlightDestination.Destino.CodigoIata}}</h3>
                  <h3 class="font-bold">{{ checkIn }} {{ checkInDayPeriod }}</h3>
                  <h3>{{ dateStringIdaChegada }}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border-t-2 border-gray-200 p-2 text-sm">
                <div class="flex items-center justify-between">
                  <h3>Clase</h3>
                  <h3 class="font-semibold">{{user.outboundFlightOrigin.Cabine}}</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Areolinea</h3>
                  <h3 class="font-semibold">{{user.vooSelected.CiaMandatoria.Descricao}}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2">
                <div class="flex items-center justify-between">
                  <h3>Fees</h3>
                  <h4 class="font-semibold">6.17</h4>
                </div>
                <div class="flex items-center space-x-2">
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
                <div class="flex items-center space-x-2">
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

              </td>
            </tr>
            </tbody>
          </table>
          <table class="table-fixed border-2 border-t-0 border-gray-200 w-full border-spacing-2 border-separate">
            <tbody>
            <tr>
              <td class="flex items-center justify-between">
                <div class="flex space-x-2.5">
                  <img
                      class="h-6 w-6"
                      src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
                      alt="Icon Voo"/>
                  <h3 class="font-semibold">Vuelo de Volta</h3>
                </div>
                <div>
                  <h3 class="font-semibold">{{user.returnFlightDestination.Destino.Descricao}}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="flex items-center justify-between border-t-2 border-gray-200 p-2">
                <div class="text-sm">
                  <h3>FFL</h3>
                  <h3 class="font-bold">9:30 AM</h3>
                  <h3>9 Set</h3>
                </div>
                <div class="text-sm text-center">
                  <div class="bg-gray-100 px-9 py-1.5">
                    <h3 class="font-bold">2 {{ ParadaVolta }}</h3>
                    <h3>{{ duracaoVoosVolta }}</h3>
                  </div>
                </div>
                <div class="text-sm">
                  <h3>FFL</h3>
                  <h3 class="font-bold">9:30 AM</h3>
                  <h3>9 Set</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border-t-2 border-gray-200 p-2 text-sm">
                <div class="flex items-center justify-between">
                  <h3>Clase</h3>
                  <h3 class="font-semibold">{{user.returnFlightOrigin.Cabine}}</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Areolinea</h3>
                  <h3 class="font-semibold">{{user.vooSelected.CiaMandatoria.Descricao}}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="flex flex-col space-y-4 border-t-2 border-gray-200 p-2">
                <div class="flex items-center justify-between">
                  <h3>Fees</h3>
                  <h4 class="font-semibold">6.17</h4>
                </div>
                <div class="flex items-center space-x-2">
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
                <div class="flex items-center space-x-2">
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

              </td>
            </tr>
            </tbody>
          </table>
          <table class="table-fixed border-2 border-t-0 border-gray-200 w-full border-spacing-2 border-separate">
            <tbody>
            <tr>
              <td class="flex flex-col space-y-1.5 p-2">
                <div>
                  <h3 class="font-bold">Passantes</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Adultos</h3>
                  <h3 class="font-semibold">3</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Crianças</h3>
                  <h3 class="font-semibold">1</h3>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <table class="table-fixed border-2 border-t-0 border-gray-200 w-full border-spacing-2 border-separate">
            <tbody>
            <tr>
              <td class="flex flex-col space-y-1.5 p-2">
                <div>
                  <h3 class="font-bold">Tus Checões</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Total para todos os passageiros</h3>
                  <h3 class="font-semibold">1635.54</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Taxas e encargos</h3>
                  <h3 class="font-semibold">256.54</h3>
                </div>
                <div class="flex items-center justify-between">
                  <h3>Bagagem</h3>
                  <h3 class="font-semibold">0</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td class="flex items-center justify-between border-t-2 border-gray-200 p-2 pb-5">
                  <CouponButton label="Tem um cupom?" class="w-full" placeholder="Insira seu cupom"/>
              </td>
            </tr>
            </tbody>
          </table>
          <table class="table-fixed border-2 border-t-0 border-gray-200 w-full border-spacing-2 border-separate">
            <tbody>
            <tr>
              <td class="flex flex-col space-y-1.5 p-2">
                <div class="flex items-center justify-between">
                  <h1 class="font-bold text-xl">Valor total</h1>
                  <h1>1345.52</h1>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="w-3/4 relative top-0 left-1/4 px-8">
          <PurchaseForm />
        </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import CouponButton from "@/components/Purchase/CouponButton.vue";
import PurchaseForm from "@/components/Purchase/PurchaseForm.vue";
import {computed} from "vue";
import moment from 'moment/min/moment-with-locales';
import momentDurationFormatSetup from 'moment-duration-format'
import { useI18n } from 'vue-i18n';

momentDurationFormatSetup(moment)
const { locale } = useI18n();

const user = useUserStore()

const departureTime = computed(() => {
  const dateLocal = new Date(moment(user.outboundFlightOrigin.DataSaida));
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

const checkIn = computed(() => {
  const dateLocal = new Date(moment(user.outboundFlightDestination.DataChegada));
  return dateLocal.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
});

const checkInDayPeriod = computed(() => {
  const dateLocal = new Date(moment(user.outboundFlightDestination.DataChegada));
  const hours = dateLocal.getHours();
  return hours >= 12 ? 'PM' : 'AM';
});

const duracaoVoosIda = computed(() => {
  return duration(user.outboundFlightOrigin.DataSaida, user.outboundFlightDestination.DataChegada)
});
const duracaoVoosVolta = computed(() => {
  return duration(user.returnFlightOrigin.DataSaida, user.returnFlightDestination.DataChegada)
});
const duration = (dataSaida, dataLlegada) => {
  const saida = moment(dataSaida)
  const llegada = moment(dataLlegada)
  return `${moment.duration(llegada.diff(saida)).get('hours')}hrs ${moment.duration(llegada.diff(saida)).get('minutes')}min`
}

const ParadaIda = computed(() => {
  return getStops(user.vooSelected.VoosIda);
})
const ParadaVolta = computed(() => {
  return getStops(user.vooSelected.VoosVolta);
})
const getStops = (v) => {
  let stops = []
  v.forEach((e) => {
    if (e.Conexao) {
      stops.push(e.Origem.CodigoIata)
    }
  })
  if (stops.length === 0) {
    let l = v.length
    stops.push(v[l - 1]).Origem.CodigoIata
  }
  return `Paradas: ${stops.join(', ')}`;
}


const dateStringIdaSaida = computed(() => {
  return formatDate(user.outboundFlightOrigin.DataSaida);
});
const dateStringIdaChegada = computed(() => {
  return formatDate(user.outboundFlightDestination.DataChegada);
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
