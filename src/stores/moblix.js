import { defineStore } from "pinia";
import axiosClient from "@/plugins/axios";

export const useMoblixStore = defineStore({
  id: "moblix",
  state: () => ({
    totalItens: 0,
    data: [],
  }),
  getters: {
    getters: (state) => {},
  },
  actions: {
    async consultaAereo(payload) {
      await axiosClient.post("/v1/moblix/query", payload).then((response) => {
        console.log("response", response);
      });
    },
  },
});
