import { defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';
import { woobaData, woobaDataMultiple } from '@/utils/unifyDataWooba';

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
    dataIda: '',
    dataVolta: '',
  }),
  actions: {
    async consultaOrigemDestino(payload) {
      const body = {
        DataIda: `/Date(${new Date(payload.Ida).getTime()})/`,
        DataVolta: `/Date(${new Date(payload.Volta).getTime()})/`,
        Destino: payload.Destino,
        Flex: true,
        Origem: payload.Origem,
        QuantidadeAdultos: payload.Adultos,
        QuantidadeBebes: payload.Bebes,
        QuantidadeCriancas: payload.Criancas,
        Recomendacao: true,
      };
      this.loading = true;
      await axiosClientAPI
        .post('api/v1/wooba/query', body)
        .then(({ data }) => {
          let {
            Exception,
            ViagensTrecho1,
            ViagensTrecho2,
            QntdAdulto,
            QntdCrianca,
            QntdBebe,
            Recomendacoes,
            DataIda,
            DataVolta,
            OfertasDesde,
          } = data.data;

          this.exception = Exception;

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

          this.qntdBebe = QntdBebe;
          this.qntdCrianca = QntdCrianca;
          this.qntdAdulto = QntdAdulto;
          this.recomendacoes = Recomendacoes;
          this.dataIda = DataIda;
          this.dataVolta = DataVolta;
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
  },
});
