<template>
  <div>
    <div class="p-5">
      <form class="grid grid-cols-5 gap-4">
        <TextInput name="passageiro" label="PASSAGEIRO" class="col-span-2" />

        <div class="col-span-2">
          <SelectReservations :initOption="findR" label="RESERVATION" :options="pdfStore.reservations" @selectValue="
            (e) => {
              reservation = e;
            }
          " />
        </div>

        <button type="submit" @click="onSubmit"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Editar passageiro
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { usePdfStore } from "@/stores/pdf";
import TextInput from "@/components/FormUI/TextInput.vue";
import SelectReservations from "@/components/ContractService/SelectReservations.vue";
import { useForm } from "vee-validate";
import { simpleSchemaPassenger } from "@/utils/validate";

const pdfStore = usePdfStore();
const emit = defineEmits(["editP"]);

const props = defineProps({
  itemEdit: {
    type: Object,
    default: () => { },
  },
  itemIndex: {
    type: Number,
    default: 0,
  },
});

const passageiro = ref(null);
const reservation = ref("");
const formValues = {
  passageiro: props.itemEdit.passageiro,
};

const { handleSubmit } = useForm({
  validationSchema: simpleSchemaPassenger,
  initialValues: formValues,
});

const onSubmit = handleSubmit((values) => {
  Object.assign(values, {
    reservations: reservation.value
      ? reservation.value
      : props.itemEdit.reservations,
  });
  pdfStore.editPassenger(props.itemIndex, values);
  emit("editP");
});

const findR = computed(() => {
  return pdfStore.reservations.filter(
    (element) => element.id === props.itemEdit.reservations
  )[0];
});
</script>

<style scoped>

</style>
