<template>
  <div>
    <div class="grid grid-cols-2 gap-10 py-20 px-60 container mx-auto">
      <div class="relative">
        <a
          href="#"
          class="absolute -top-5 right-0 text-sm text-blue-600 hover:text-blue-700 underline underline-offset-1"
          >{{ $t('addressUser.noSeiMeuCep') }}</a
        >
        <InputGeneric
          v-model="auth.user.cep"
          :label="$t('addressUser.cep')"
          name="cep"
          maska="#####-###"
          :validations="validations.cep"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
      <div>
        <InputGeneric
          v-model="auth.user.bairro"
          :label="$t('addressUser.bairro')"
          name="bairro"
          :validations="validations.required"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
      <div>
        <InputGeneric
          v-model="auth.user.address"
          :label="$t('addressUser.endereo')"
          name="address"
          :validations="validations.required"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
      <div>
        <InputGeneric
          v-model="auth.user.estado"
          :label="$t('addressUser.estado')"
          name="estado"
          :validations="validations.required"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
      <div>
        <InputGeneric
          v-model="auth.user.number"
          :label="$t('addressUser.nmero')"
          name="number"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
      <div>
        <InputGeneric
          v-model="auth.user.ciudade"
          :label="$t('addressUser.cidade')"
          name="ciudade"
          :validations="validations.required"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
      <div>
        <InputGeneric
          v-model="auth.user.complemento"
          :label="$t('addressUser.complemento')"
          name="complemento"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed, watch } from 'vue';
import { cepValidation, requiredValidation } from '@/utils/validations';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';

defineEmits(['isValid']);

const auth = useAuthStore();

watch(
  () => auth.user.cep,
  (cep) => {
    if (cep.length >= 9) verifyCEP();
  }
);

const verifyCEP = async () => {
  await fetch(`https://brasilapi.com.br/api/cep/v1/${auth.user.cep}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.cep) {
        auth.user.estado = '';
        auth.user.ciudade = '';
        auth.user.address = '';
      } else {
        auth.user.estado = data.state;
        auth.user.ciudade = data.city;
        auth.user.address = `${data.neighborhood || ''} ${data.street || ''}`;
      }
    });
};

const validations = computed(() => {
  return {
    required: {
      isRequired: requiredValidation,
    },
    cep: {
      isRequired: cepValidation.requiredValidation,
      isCEP: cepValidation.isCEP,
    },
  };
});
</script>

<style scoped></style>
