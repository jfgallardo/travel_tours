<template>
  <div class="flex items-center justify-center space-x-2.5 pt-40">
    <div
      v-if="response.message"
      :class="`rounded-sm bg-${response.color}-100 p-4 mb-4 w-full text-center`"
    >
      <h3 :class="`text-sm leading-5 font-medium text-${response.color}-700`">
        {{ response.message }}
      </h3>
    </div>
    <div v-else>
      <ArrowPathIcon class="h-10 w-10 text-blue-500 animate-spin" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const authStore = useAuthStore();

onMounted(() => {
  token.value = route?.query?.token;
  verifyEmail();
});

const token = ref('');
const response = ref({
  color: '',
  message: '',
});

const verifyEmail = () => {
  authStore
    .verifyEmail({ token: token.value })
    .then(() => {
      response.value.color = 'green';
      response.value.message = 'Correo electronico correctamente verificado';
    })
    .catch((e) => {
      const errorCode = e?.response?.data?.message || 'ServerError';
      response.value.color = 'red';
      response.value.message = errorCode;
    });
};
</script>

<style scoped></style>
