<template>
  <form>
    <div class="mt-36 border-b border-gray-700 h-[32rem]">
      <KeepAlive>
        <component :is="selectedComponent"></component>
      </KeepAlive>
    </div>
    <div class="flex items-center justify-center space-x-6 mt-10">
      <button
        type="button"
        v-if="userStore.currentStep > 0"
        class="bg-gray-200 hover:bg-gray-300 py-2 px-10"
        @click="backStep"
      >
        Retornar
      </button>
      <button
        type="submit"
        v-if="userStore.currentStep != 3"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
        @click="nextStep"
      >
        Proximo
      </button>
      <button
        v-if="userStore.currentStep === 3"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
      >
        Cadastro Agora
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, markRaw, onMounted } from 'vue';
import { simpleSchemaInformationUser } from '@/utils/validate';
import { useForm } from 'vee-validate';
import InformationUser from '@/components/Auth/Steps/InformationUser.vue';
import AddressUser from '@/components/Auth/Steps/AddressUser.vue';
import ContactUser from '@/components/Auth/Steps/ContactUser.vue';
import PasswordUser from '@/components/Auth/Steps/PasswordUser.vue';
import { useUserStore } from '@/stores/user';

onMounted(() => {
  selectedComponent.value = markRaw(InformationUser);
});

const userStore = useUserStore();

const steps = [
  { component: InformationUser },
  { component: AddressUser },
  { component: ContactUser },
  { component: PasswordUser },
];
let selectedComponent = ref(null);

const { handleSubmit, setFieldError } = useForm({
  validationSchema: simpleSchemaInformationUser,
});

const nextStep = handleSubmit((values) => {
  if (userStore.currentStep === 0) {
    userStore.currentStep++;
  } else if (userStore.currentStep === 1) {
    if (!values.cep) {
      setFieldError('cep', 'Required Field');
    } else if (!values.bairro) {
      setFieldError('bairro', 'Required Field');
    } else if (!values.address) {
      setFieldError('address', 'Required Field');
    } else if (!values.estado) {
      setFieldError('estado', 'Required Field');
    } else if (!values.number) {
      setFieldError('number', 'Required Field');
    } else if (!values.ciudade) {
      setFieldError('ciudade', 'Required Field');
    } else if (!values.complemento) {
      setFieldError('complemento', 'Required Field');
    } else {
      userStore.currentStep++;
    }
  } else if (userStore.currentStep === 2) {
    if (!values.mainPhone) {
      setFieldError('mainPhone', 'Required Field');
    } else {
      userStore.currentStep++;
    }
  } else {
    userStore.currentStep++;
  }

  selectedComponent.value = markRaw(steps[userStore.currentStep].component);
});

const backStep = () => {
  if (userStore.currentStep >= 1 && userStore.currentStep <= 3) {
    userStore.currentStep--;
  }
  selectedComponent.value = markRaw(steps[userStore.currentStep].component);
};
</script>

<style scoped></style>
