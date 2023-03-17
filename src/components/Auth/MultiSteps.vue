<template>
  <form>
    <div class="mt-24 border-b border-gray-700 h-[32rem]">
      <KeepAlive>
        <component
          :is="selectedComponent"
          @is-valid="isValid = $event"
        ></component>
      </KeepAlive>
    </div>
    <div class="flex items-center justify-center space-x-6 mt-10 pb-12">
      <button
        v-if="auth.currentStep > 0"
        type="button"
        class="bg-gray-200 hover:bg-gray-300 py-2 px-10"
        :disabled="!isValid"
        @click="backStep"
      >
        Retornar
      </button>
      <button
        v-if="auth.currentStep != 3"
        type="button"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10 disabled:bg-blue-300 disabled:cursor-not-allowed"
        :disabled="disabledButtons"
        @click="nextStep"
      >
        Proximo
      </button>
      <button
        v-if="auth.currentStep === 3"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10 disabled:bg-blue-300 disabled:cursor-not-allowed"
        :disabled="disabledRegister"
        @click.prevent="register"
      >
        Cadastro Agora
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, markRaw, onMounted, computed } from 'vue';
import InformationUser from '@/components/Auth/Steps/InformationUser.vue';
import AddressUser from '@/components/Auth/Steps/AddressUser.vue';
import ContactUser from '@/components/Auth/Steps/ContactUser.vue';
import PasswordUser from '@/components/Auth/Steps/PasswordUser.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/stores/alert';

onMounted(() => {
  selectedComponent.value = markRaw(InformationUser);
});

const auth = useAuthStore();
const router = useRouter();
const alertStore = useAlertStore();
const isValid = ref(false);

const steps = [
  { component: InformationUser },
  { component: AddressUser },
  { component: ContactUser },
  { component: PasswordUser },
];
let selectedComponent = ref(null);

const nextStep = () => {
  if (auth.currentStep <= 4) {
    auth.currentStep++;
  }
  selectedComponent.value = markRaw(steps[auth.currentStep].component);
};

const backStep = () => {
  if (auth.currentStep >= 1) {
    auth.currentStep--;
  }
  selectedComponent.value = markRaw(steps[auth.currentStep].component);
};

const register = () => {
  auth.loading = true;
  const splitDate = auth.user.birthday.split('/');
  const birthday = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
  const formData = {
    ...auth.user,
    birthday,
  };
  auth
    .register(formData)
    .then(() => {
      alertStore.showMsg({
        message: 'Registro efectuado con sucesso. Inicie session',
        backgrColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      });
      auth.loading = false;
      auth.currentStep = 0;
      router.push('/');
    })
    .catch(() => {
      auth.loading = false;
    });
};

const disabledRegister = computed(() => {
  return (
    !auth.termos ||
    !auth.user.email ||
    !auth.user.password ||
    !auth.emailLocal ||
    !auth.passwordLocal ||
    auth.user.password !== auth.passwordLocal ||
    auth.user.email !== auth.emailLocal ||
    !isValid.value
  );
});

const disabledButtons = computed(() => {
  if (auth.currentStep === 0) {
    return !auth.user.fullName || !auth.user.cpf || !auth.user.birthday || !isValid.value;
  } else if (auth.currentStep === 1) {
    return (
      !auth.user.cep ||
      !auth.user.bairro ||
      !auth.user.address ||
      !auth.user.estado ||
      !auth.user.ciudade ||
      !isValid.value
    );
  } else if (auth.currentStep === 2) {
    return (
      !auth.user.mainPhone ||
      !isValid.value
    );
  }
  return false
});
</script>

<style scoped></style>
