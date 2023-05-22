<template>
  <div>
    <div
      class="flex flex-col items-center justify-center mx-auto py-20 space-y-6 pb-72"
    >
      <div class="w-4/12">
        <InputGeneric
          v-model="auth.user.mainPhone"
          v-phone-mask
          label="Telefone principal *"
          name="mainPhone"
          :validations="validations.phone"
          maska="(##) #####-####"
          @is-valid="$emit('isValid', $event)"
        />
      </div>

      <div class="w-4/12">
        <InputGeneric
          v-model="auth.user.alternativePhone"
          v-phone-mask
          label="Telefone alternativo"
          name="alternativePhone"
          :validations="validations.onlyPhone"
          @is-valid="$emit('isValid', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import InputGeneric from '@/components/FormUI/InputGeneric.vue';
import { phoneValidation } from '@/utils/validations';
import { computed } from 'vue';

defineEmits(['isValid']);

const auth = useAuthStore();

const validations = computed(() => {
  return {
    phone: {
      isRequired: phoneValidation.requiredValidation,
      isPhone: phoneValidation.isPhoneNumber,
    },
    onlyPhone: {
      isPhone: phoneValidation.isPhoneNumber,
    },
  };
});
</script>

<style scoped></style>
