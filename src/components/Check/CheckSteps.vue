<template>
  <form>
    <div class="border-b border-gray-700 h-[32rem]">
      <KeepAlive>
        <component :is="selectedComponent"></component>
      </KeepAlive>
    </div>
    <div class="flex items-center justify-center space-x-6 mt-10">
      <button
          v-if="userStore.currentStepPayment > 0"
          type="button"
          class="bg-gray-200 hover:bg-gray-300 py-2 px-10"
          @click="backStep"
      >
        Retornar
      </button>
      <button
          v-if="userStore.currentStepPayment !== 4"
          type="submit"
          class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
          @click="nextStep"
      >
        Proximo
      </button>
      <button
          v-if="userStore.currentStepPayment === 4"
          class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
          disabled
      >
        Verifica Agora
      </button>
    </div>
  </form>
</template>

<script setup>
import PaymentMethod from "@/components/Check/Steps/PaymentMethod.vue";
import SelectedPaymentMethod from "@/components/Check/Steps/SelectedPaymentMethod.vue";
import {markRaw, onMounted, ref} from "vue";
import {useUserStore} from '@/stores/user';
import {useForm} from 'vee-validate';
import PaymentDetails from "@/components/Check/Steps/PaymentDetails.vue";
import BillingAddress from "@/components/Check/Steps/BillingAddress.vue";
import FinalStep from "@/components/Check/Steps/FinalStep.vue";


onMounted(() => {
  selectedComponent.value = markRaw(PaymentMethod);
});

const userStore = useUserStore()
const selectedComponent = ref(null);
const {handleSubmit, setFieldError} = useForm({});

const steps = [
  {component: PaymentMethod},
  {component: SelectedPaymentMethod},
  {component: PaymentDetails},
  {component: BillingAddress},
  {component: FinalStep}
];

const nextStep = handleSubmit((values) => {
  userStore.currentStepPayment++;

  selectedComponent.value = markRaw(steps[userStore.currentStepPayment].component);
});
const backStep = () => {
  if (userStore.currentStepPayment >= 1 && userStore.currentStepPayment <= 5) {
    userStore.currentStepPayment--;
  }
  selectedComponent.value = markRaw(steps[userStore.currentStepPayment].component);
};
</script>

<style scoped>

</style>