<template>
  <div>
    <div class="p-5">
      <form class="grid grid-cols-5 gap-4">
        <TextInput name="passageiro" label="PASSAGEIRO" class="col-span-2" />

        <div v-if="pdfStore.reservations.length" class="col-span-2">
          <SelectReservations
            label="RESERVATION"
            :options="pdfStore.reservations"
            @selectValue="
              (e) => {
                reservations = e;
              }
            "
          />
        </div>

        <button
          type="submit"
          @click="onSubmit"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Criar passageiro
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import TextInput from "@/components/FormUI/TextInput.vue";
import { simpleSchemaPassenger } from "@/utils/validate";
import { usePdfStore } from "@/stores/pdf";
import SelectReservations from "@/components/ContractService/SelectReservations.vue";

const emit = defineEmits(["createP"]);
const pdfStore = usePdfStore();

const reservations = ref("");

const { handleSubmit } = useForm({
  validationSchema: simpleSchemaPassenger,
});

const onSubmit = handleSubmit((values) => {
  Object.assign(values, {
    reservations: reservations.value,
  });
  pdfStore.addPassenger(values);
  emit("createP");
});
</script>

<style scoped></style>
