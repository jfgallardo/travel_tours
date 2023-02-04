<script setup>
import { RouterView } from 'vue-router';
import Message from '@/components/Partials/TheMessage.vue';
import { useAlertStore } from '@/stores/alert';
import { inject, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';

const $cookies = inject('$cookies');
const authStore = useAuthStore();

onMounted(() => {
  if ($cookies.isKey('dataUser') && !authStore.userLogged) {
    authStore.userLogged = $cookies.get('dataUser').data;
  }
})

const alertStore = useAlertStore();
</script>

<template>
  <div class="mt-20">
    <Transition>
      <Message v-if="alertStore.message" />
    </Transition>

    <RouterView />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
