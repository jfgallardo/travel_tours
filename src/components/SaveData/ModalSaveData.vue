<template>
  <TheModal @close="$emit('close')">
    <template #header>
      <div class="mr-20">Preencher com seus dados salvos</div>
    </template>
    <template #body>
      <div class="p-4 space-y-3.5">
        <template v-for="(item, idx) in passengersType" :key="item.value">
          <details
            class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              class="flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer"
            >
              <span class="text-sm font-medium">
                {{ item.label }}
              </span>

              <span class="transition group-open:-rotate-180">
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div class="bg-white border-t border-gray-200">
              <ul class="p-4 space-y-1 border-t border-gray-200">
                <li v-for="(opt, index) in options" :key="opt.value">
                  <label
                    :for="opt.label + '_' + index + '_' + idx"
                    class="inline-flex items-center gap-2"
                  >
                    <input
                      :id="opt.label + '_' + index + '_' + idx"
                      v-model="radioBottom[item.value]"
                      type="radio"
                      :value="opt.value"
                      class="w-5 h-5 border-gray-300"
                    />

                    <span class="text-sm font-medium text-gray-700">
                      {{ opt.label }}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>
        </template>
      </div>
    </template>
    <template #footer>
      <div>
        <button
          class="bg-blue-600 text-white py-2 px-8 hover:bg-blue-700 w-full"
          @click.prevent="associateUsersPassengers"
        >
          Llenar Datos
        </button>
      </div>
    </template>
  </TheModal>
</template>

<script setup>
import TheModal from '@/components/Partials/TheModal.vue';
import { computed, ref } from 'vue';
import { usePurchaseStore } from '@/stores/purchase.user';
import { usePassengerUserStore } from '@/stores/passenger';

defineEmits(['close']);

defineProps({
  options: {
    type: Array,
    default: () => {},
  },
});

const purchaseStore = usePurchaseStore();
const radioBottom = ref({});
const passengerStore = usePassengerUserStore();

const passengersType = computed(() => {
  let result = [];
  purchaseStore.informationAdults.forEach((o, index) => {
    result.push({
      label: `Adulto #${index + 1}`,
      value: result.length + 1,
    });
  });

  if (purchaseStore.informationTeenagers) {
    purchaseStore.informationTeenagers.forEach((o, index) => {
      result.push({
        label: `Criança #${index + 1}`,
        value: result.length + 1,
      });
    });
  }

  if (purchaseStore.informationBabies) {
    purchaseStore.informationBabies.forEach((o, index) => {
      result.push({
        label: `Bebê #${index + 1}`,
        value: result.length + 1,
      });
    });
  }
  return result;
});

const associateUsersPassengers = () => {
  const keys = Object.keys(radioBottom.value);
  const values = Object.values(radioBottom.value);

  const cAdults = purchaseStore.informationAdults.length;
  const cTeenagers = purchaseStore.informationTeenagers.length;

  keys.forEach((key, index) => {
    if (key <= cAdults) {
      const passenger = passengerStore.getPassengerById(values[index]);
      let adult = purchaseStore.informationAdults[key - 1];
      adult.name = passenger.name;
    }
    if (key > cAdults && key <= cTeenagers + cAdults) {
      console.log('soy cTeenagers');
    }
    if (key > cTeenagers + cAdults) {
      console.log('soy babie');
    }
  });
};
</script>

<style scoped></style>
