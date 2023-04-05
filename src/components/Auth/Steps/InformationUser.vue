<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6"
    >
      <div>
        <div class="grid grid-cols-2">
          <button
            ref="pessoaF"
            type="button"
            class="py-3 border border-gray-400 px-12"
            @click="change(pessoaF, 'pessoaF')"
          >
            Pessoa Fisica
          </button>
          <button
            ref="pessoaJ"
            type="button"
            class="py-3 border-y border-r border-gray-400 px-12"
            @click="change(pessoaJ, 'pessoaJ')"
          >
            Pessoa Juridica
          </button>
        </div>
      </div>
      <div class="w-4/12">
        <p class="font-light text-sm">
          É bem rapidinho. Ah, os campos com * são obrigatórios. Vamos lá?
        </p>
      </div>

      <div class="w-4/12">
        <InputGeneric
          v-model="auth.user.fullName"
          label="Nome completo *"
          name="fullName"
          :validations="validations.required"
          @is-valid="$emit('isValid', $event)"
        />
      </div>

      <div class="w-4/12">
        <InputGeneric
          v-model="auth.user.cpf"
          label="CPF *"
          maska="###.###.###-##"
          name="cpf"
          :validations="validations.cpf"
          @is-valid="$emit('isValid', $event)"
        />
      </div>

      <div class="w-4/12">
        <DateInput
          v-model="auth.user.birthday"
          label="Data de Nascimento *"
          name="birthday"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import DateInput from '@/components/FormUI/DateInput.vue';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';
import { requiredValidation, cpfValidation } from '@/utils/validations';

onMounted(() => {
  pessoaF.value.classList.add('active');
  auth.user.typePerson = 'pessoaF';
});

defineEmits(['isValid']);

const pessoaF = ref(null);
const pessoaJ = ref(null);
const auth = useAuthStore();

const cleanRefs = () => {
  pessoaF.value.classList.remove('active');
  pessoaJ.value.classList.remove('active');
};

const change = (ref, value) => {
  cleanRefs();
  auth.user.typePerson = value;
  ref.classList.add('active');
};

const validations = computed(() => {
  return {
    required: {
      isRequired: requiredValidation,
    },
    cpf: {
      isRequired: cpfValidation.requiredValidation,
      isCPF: cpfValidation.isCPF,
    },
  };
});
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}
</style>
