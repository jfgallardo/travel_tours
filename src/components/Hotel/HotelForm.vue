<template>
  <div>
    <div class="mt-5 flex flex-col space-y-1">
      <div class="px-4">
        <AutoComplete
          label="Para onde você vai?"
          :value="searchOptionsHotel.destiny.label"
          @input="
            (e) => {
              searchOptionsHotel.destiny.label = e;
            }
          "
          @select="
            (s) => {
              searchOptionsHotel.destiny.iata = s;
            }
          "
        />
      </div>

      <div class="grid grid-cols-2 grid-rows-1 py-4 px-4">
        <DateInput
          v-model="searchOptionsHotel.entryDate"
          label="Para onde você vai?"
          :min-date-show="new Date()"
        />
        <DateInput
          v-model="searchOptionsHotel.departureDate"
          :min-date-show="notBeforeDate"
        />
      </div>

      <div class="px-4">
        <Dropddown label="Quartos e hóspedes">
          <template #selected>
            <div
              class="flex justify-evenly pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 bg-white border focus:outline-none text-sm"
            >
              <span>{{ searchOptionsHotel.rooms }} Quarto</span>
              <span>{{ searchOptionsHotel.numberOfGuests }} Hospede</span>
            </div>
          </template>
          <template #dropdown>
            <div class="flex items-center space-x-10 px-4">
              <ManageItems
                v-model="searchOptionsHotel.rooms"
                label="Quarto"
                @takeOff="takeRoom"
                @addUp="addRoom"
              />
              <ManageItems
                v-model="searchOptionsHotel.numberOfGuests"
                label="Hospede"
                @takeOff="takeGuest"
                @addUp="addGuest"
              />
            </div>
          </template>
        </Dropddown>
      </div>

      <div class="pt-80">
        <button
          class="bg-blue-700 relative w-full py-3 text-white flex items-center justify-center disabled:bg-blue-400 disabled:cursor-wait"
          @click="consultar()"
        >
          <span>Buscar Hoteis</span>
          <ArrowRight fill-color="white" class="absolute right-10" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed} from 'vue';
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import DateInput from '@/components/FormUI/DateInput.vue';
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';
import ManageItems from '@/components/FormUI/ManageItems.vue';
import {useSearchOptionsHotelStore} from "@/stores/searchOptionsHotel";

const searchOptionsHotel = useSearchOptionsHotelStore()

const addRoom = () => {
  searchOptionsHotel.rooms++;
};
const addGuest = () => {
  searchOptionsHotel.numberOfGuests++;
};

const takeRoom = () => {
  if (searchOptionsHotel.rooms > 1){
    searchOptionsHotel.rooms--;
  }
};
const takeGuest = () => {
  if (searchOptionsHotel.numberOfGuests > 1){
    searchOptionsHotel.numberOfGuests--;
  }
};

const notBeforeDate = computed(() => {
  if (searchOptionsHotel.entryDate) {
    let dateParts = searchOptionsHotel.entryDate.split('/');
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  } else {
    return new Date();
  }
});

const consultar = () => {};
</script>
<style scoped></style>
