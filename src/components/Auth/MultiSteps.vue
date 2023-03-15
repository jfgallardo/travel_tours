<template>
  <form>
    <div class="mt-36 border-b border-gray-700 h-[32rem]">
      <KeepAlive>
        <component :is="selectedComponent"></component>
      </KeepAlive>
    </div>
    <div class="flex items-center justify-center space-x-6 mt-10">
      <button
        v-if="auth.currentStep > 0"
        type="button"
        class="bg-gray-200 hover:bg-gray-300 py-2 px-10"
        @click="backStep"
      >
        Retornar
      </button>
      <button
        v-if="auth.currentStep != 3"
        type="submit"
        class="bg-blue-700 hover:bg-blue-800 text-white py-2 px-10"
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
import { simpleSchemaInformationUser } from '@/utils/validate';
import { useForm } from 'vee-validate';
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
  if (auth.currentStep === 0) {
    auth.currentStep++;
  } else if (auth.currentStep === 1) {
    if (!values.cep) {
      setFieldError('cep', 'Required Field');
    } else if (!values.bairro) {
      setFieldError('bairro', 'Required Field');
    } else if (!values.address) {
      setFieldError('address', 'Required Field');
    } else if (!values.estado) {
      setFieldError('estado', 'Required Field');
    } else if (!values.ciudade) {
      setFieldError('ciudade', 'Required Field');
    } else if (!values.complemento) {
      setFieldError('complemento', 'Required Field');
    } else {
      auth.currentStep++;
    }
  } else if (auth.currentStep === 2) {
    if (!values.mainPhone) {
      setFieldError('mainPhone', 'Required Field');
    } else {
      auth.currentStep++;
    }
  }

  selectedComponent.value = markRaw(steps[auth.currentStep].component);
});

const backStep = () => {
  if (auth.currentStep >= 1 && auth.currentStep <= 3) {
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
    (auth.user.password !== auth.passwordLocal) ||
    (auth.user.email !== auth.emailLocal)
  );
});
</script>

<style scoped></style>
