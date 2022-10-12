import { defineStore } from 'pinia';

export const usePdfStore = defineStore({
  id: 'pdf',
  state: () => ({
    passengers: [],
    services: [],
    reservations: [],
    creditCard: {
      cartao: { name: 'VISA', value: 'VISA' },
      numberCard: null,
      nameCard: null,
      validCardDate: null,
    },
    saveCreditCard: false,
    notSaveCreditCard: true,
  }),
  getters: {
    fullTransactionValue(state) {
      return state.reservations
        .map((item) => parseFloat(item.transaction_value))
        .reduce(
          (prev, curr) => (parseFloat(prev) + parseFloat(curr)).toFixed(2),
          0
        );
    },
  },
  actions: {
    async addPassenger(payload) {
      this.passengers.push(payload);
    },
    async addService(payload) {
      this.services.push(payload);
    },
    async addReservation(payload) {
      this.reservations.push(payload);
    },

    async editPassenger(index, payload) {
      this.passengers[index] = payload;
    },
    async editService(index, payload) {
      this.services[index] = payload;
    },
    async editReservation(index, payload) {
      this.reservations[index] = payload;
    },

    async deletePassenger(payload) {
      this.passengers.splice(payload, 1);
    },
    async deleteService(payload) {
      this.services.splice(payload, 1);
    },
    async deleteReservation(payload) {
      this.reservations.splice(payload, 1);
    },
    async rebootInfo() {
      this.passengers = [];
      this.services = [];
      this.reservations = [];
      (this.saveCreditCard = false), (this.notSaveCreditCard = true);
      this.saveCreditCard = false;
      this.notSaveCreditCard = true;
    },
  },
});
