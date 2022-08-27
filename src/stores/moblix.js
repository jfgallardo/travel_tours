import { defineStore } from "pinia";
import axiosClient from "@/plugins/axios";
import dataDuty from "@/utils/data-duty-moblix";

export const useMoblixStore = defineStore({
  id: "moblix",
  state: () => ({
    totalItems: 0,
    outboundFlights: [],
    returnFlights: [],
    aeroportos: []
  }),
  getters: {
    getters: (state) => { },
  },
  actions: {
    async consultaAereo(payload) {
      await axiosClient.post("/v1/moblix/query", payload).then((response) => {
        let { Aeroportos, Ida, Volta } = response.data.data[0]
        this.totalItems = response.data.totalItens
        this.outboundFlights = dataDuty(Ida)
        this.returnFlights = dataDuty(Volta)
        this.aeroportos = Aeroportos
      });
    },
    clear() {
      this.totalItems = 0
      this.outboundFlights = []
      this.returnFlights = []
      this.aeroportos = []
    }
  },
});
