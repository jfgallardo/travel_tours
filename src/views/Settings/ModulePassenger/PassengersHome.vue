<template>
  <div class="overflow-x-auto mx-auto p-8">
    <button
      class="float-right bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-2 flex items-center space-x-1.5"
      @click="showModal = true"
    >
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
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>

      <span> Adicionar </span>
    </button>
    <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
      <thead>
        <tr>
          <th
            class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
          >
            Name
          </th>
          <th
            class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
          >
            Last Name
          </th>
          <th
            class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
          >
            Email
          </th>
          <th
            class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
          >
            Pasaporte
          </th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody
        v-for="item in passengers"
        :key="item.id"
        class="divide-y divide-gray-200"
      >
        <tr>
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            {{ item.name }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ item.last_name }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ item.email }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ item.number_passport }}
          </td>
          <td class="whitespace-nowrap px-4 py-2">
            <button
              class="rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 flex items-center space-x-1.5"
              @click="deletePassenger(item.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>

              <span> Delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="passengers.length === 0"
      class="flex items-center justify-center text-sm mt-3.5"
    >
      No tiene pasajeros registrados
    </div>
  </div>
  <ModalAddPassenger
    v-if="showModal"
    @close="showModal = false"
    @correct-register="closeModal"
  />
  <!--    <ModalManagerPassenger
      v-if="showModalManager"
      :passenger="itemForShow"
      @close="showModalManager = false"
    />-->
</template>

<script setup>
import ModalAddPassenger from '@/views/Settings/ModulePassenger/ModalAddPassenger.vue';
import { onMounted, ref } from 'vue';
import { usePassengerUserStore } from '@/stores/passenger';
import { useAlertStore } from '@/stores/alert';
//import ModalManagerPassenger from '@/views/Settings/ModulePassenger/ModalManagerPassenger.vue';

const passengerStore = usePassengerUserStore();
const showModal = ref(false);
const alertStore = useAlertStore();
//const showModalManager = ref(false);
const passengers = ref([]);
//const itemForShow = ref(null);
onMounted(() => {
  fetchPassengers();
});
const fetchPassengers = () => {
  passengerStore
    .fetchPassengers()
    .then(({ data }) => {
      passengers.value = data.data;
    })
    .catch(({ response }) => {
      alertStore.showMsg({
        message: response.data.message,
        backgrColor: 'bg-red-100',
        textColor: 'text-red-700',
      });
    });
};
const closeModal = () => {
  showModal.value = false;
  fetchPassengers();
};
/*const showPassenger = (e) => {
  itemForShow.value = e;
  showModalManager.value = true;
};*/

const deletePassenger = (id) => {
  passengerStore
    .deletePassenger(id)
    .then(() => {
      alertStore.showMsg({
        message: 'Pasajero de uso frecuente eliminado correctamente',
        backgrColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      });
      fetchPassengers();
    })
    .catch(({ response }) => {
      alertStore.showMsg({
        message: response.data.message,
        backgrColor: 'bg-red-100',
        textColor: 'text-red-700',
      });
    });
};
</script>

<style scoped></style>
