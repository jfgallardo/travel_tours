<script setup>
import { RouterView } from 'vue-router';
import Message from '@/components/Partials/TheMessage.vue';
import { useAlertStore } from '@/stores/alert';
import { inject, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Footer from '@/components/Partials/TheFooter.vue';
import Cookies from 'js-cookie';

const $cookies = inject('$cookies');
const authStore = useAuthStore();

/*
onMounted(() => {
  if ($cookies.isKey('dataUser') && !authStore.userLogged) {
    authStore.userLogged = $cookies.get('dataUser').data;
    authStore.userLogged.access_token = $cookies.get('dataUser').access_token;
  }
});
*/

const alertStore = useAlertStore();
</script>

<template>
  <div class="mt-20">
    <Transition>
      <Message v-if="alertStore.message" />
    </Transition>

    <RouterView />

    <Footer />
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
