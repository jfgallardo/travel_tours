import { defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';
import {
  woobaData,
  woobaDataMultiple,
  woobaPrice,
  woobaTravelTime,
} from '@/utils/unifyDataWooba';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';

const searchOptionsVoo = useSearchOptionsVooStore();
export const useWoobaStore = defineStore({
  id: 'wooba',
  state: () => ({
    loading: false,
    outboundFlights: [],
    returnFlights: [],
    qntdBebe: 0,
    qntdCrianca: 0,
    qntdAdulto: 0,
    recomendacoes: [],
    exception: '',
    airportsFilter: [],
    companies: [],
  }),
  getters: {
    travelTime(state) {
      return woobaTravelTime(state.outboundFlights, state.returnFlights);
    },
    priceGeral(state) {
      return woobaPrice(state.outboundFlights, state.returnFlights);
    },
    offers(state) {
      return state.outboundFlights[0].OfertasDesde;
    },
  },
  actions: {
    async consultaOrigemDestino() {
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
        QuantidadeDeVoos: 15,
        ApenasVoosDiretos: searchOptionsVoo.apenasVoosDiretos,
      };
      if (searchOptionsVoo.cabin.value) {
        body.Cabine = searchOptionsVoo.cabin.value;
      }
      this.loading = true;
      await axiosClientAPI
        .post('api/v1/wooba/query', body)
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

          this.exception = Exception;
          this.companies = Cia;
          this.airportsFilter = AirportsIataTrecho1.concat(AirportsIataTrecho2);

          if (!ViagensTrecho2) {
            this.outboundFlights = woobaData(
              ViagensTrecho1,
              OfertasDesde.trechoOneOferta
            );
            this.returnFlights = null;
          } else {
            this.outboundFlights = woobaDataMultiple(
              ViagensTrecho1,
              OfertasDesde.trechoOneOferta
            );
            this.returnFlights = woobaDataMultiple(
              ViagensTrecho2,
              OfertasDesde.trechoTwoOferta
            );
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async clear() {
      this.outboundFlights = [];
      this.returnFlights = [];
      this.loading = false;
    },
    async displayMoreResults() {
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
        QuantidadeDeVoos: searchOptionsVoo.quantidadeDeVoos,
        ApenasVoosDiretos: searchOptionsVoo.apenasVoosDiretos,
      };

      await axiosClientAPI
        .post('api/v1/wooba/query', body)
        .then(({ data }) => {
          let {
            ViagensTrecho1,
            ViagensTrecho2,
            OfertasDesde,
            Cia,
            AirportsIataTrecho1,
            AirportsIataTrecho2,
          } = data.data;

          this.companies = Cia;
          this.airportsFilter = AirportsIataTrecho1.concat(AirportsIataTrecho2);

          let newViagensTrecho1 = ViagensTrecho1.slice(
            ViagensTrecho1.length - this.outboundFlights.length
          );

          if (!ViagensTrecho2) {
            woobaData(newViagensTrecho1, OfertasDesde.trechoOneOferta).forEach(
              (e) => {
                this.outboundFlights.push(e);
              }
            );
            this.returnFlights = null;
          } else {
            let newViagensTrecho2 = ViagensTrecho2.slice(
              ViagensTrecho2.length - 15
            );
            woobaDataMultiple(
              newViagensTrecho1,
              OfertasDesde.trechoOneOferta
            ).forEach((e) => {
              this.outboundFlights.push(e);
            });
            woobaDataMultiple(
              newViagensTrecho2,
              OfertasDesde.trechoTwoOferta
            ).forEach((e) => {
              this.returnFlights.push(e);
            });
          }
        })
        .finally(() => {});
    },
  },
});
