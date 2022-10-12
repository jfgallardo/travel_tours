<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6"
    >
      <div>
        <div class="grid grid-cols-2">
          <button
            type="button"
            ref="pessoaF"
            class="py-3 border border-gray-400 px-12"
            @click="change(pessoaF)"
          >
            Pessoa Fisica
          </button>
          <button
            type="button"
            ref="pessoaJ"
            class="py-3 border-y border-r border-gray-400 px-12"
            @click="change(pessoaJ)"
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
        <TextInput
          label="Nome completo *"
          v-model="userStore.user.fullName"
          name="fullName"
        />
      </div>

      <div class="w-4/12">
        <TextInput
          label="CPF *"
          maska="###.###.###-##"
          v-model="userStore.user.cpf"
          name="cpf"
        />
      </div>

      <div class="w-4/12">
        <DateInput
          label="Data de Nascimento *"
          v-model="userStore.user.birthday"
          name="birthday"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import TextInput from '@/components/FormUI/TextInput.vue';
import DateInput from '@/components/FormUI/DateInput.vue';

onMounted(() => {
  pessoaF.value.classList.add('active');
});

const pessoaF = ref(null);
const pessoaJ = ref(null);
const userStore = useUserStore();

const cleanRefs = () => {
  pessoaF.value.classList.remove('active');
  pessoaJ.value.classList.remove('active');
};

const change = (ref) => {
  cleanRefs();
  ref.classList.add('active');
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}
</style>
