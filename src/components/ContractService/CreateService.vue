<template>
  <div>
    <div class="block p-6 bg-white">
      <div>
        <button
          type="button"
          @click="modal = true"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Criar servicios
        </button>
      </div>

      <div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Service
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Reserva
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
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
                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody v-if="pdfStore.services.length">
                    <tr
                      class="border-b"
                      v-for="(item, index) in pdfStore.services"
                      :key="index"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {{ item.service }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {{ item.reservations }}
                      </td>

                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-3 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          @click="editService(index)"
                          stroke="currentColor"
                          class="w-5 h-5 cursor-pointer"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 cursor-pointer"
                          @click="deleteReservation(index)"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <td
                      colspan="7"
                      class="text-center font-extralight text-2xl p-5"
                    >
                      No existen servicios
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :modal="modal" title="Criar servicio" @closeModal="modal = false">
      <template v-slot:body>
        <Service @createS="createService" />
      </template>
    </Modal>
    <Modal :modal="edit" title="Editar servicio" @closeModal="edit = false">
      <template #body>
        <EditService
          :itemEdit="itemEdit"
          :itemIndex="itemIndex"
          @editS="edit = false"
        />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Partials/TheModal.vue";
import EditService from "@/components/ContractService/EditService.vue";
import Service from "@/components/ContractService/ServiceItem.vue";
import { usePdfStore } from "@/stores/pdf";

const modal = ref(false);
const pdfStore = usePdfStore();
const edit = ref(false);
const itemEdit = ref(null);
const itemIndex = ref(0);

const createService = () => {
  modal.value = false;
};

const deleteReservation = (index) => {
  pdfStore.deleteService(index);
};

const editService = (index) => {
  itemIndex.value = index;
  itemEdit.value = pdfStore.services[index];
  edit.value = true;
};
</script>

<style scoped></style>
