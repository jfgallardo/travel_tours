<script setup>
import { RouterView } from 'vue-router';
import Message from '@/components/Partials/TheMessage.vue';
import { useAlertStore } from '@/stores/alert';
import Footer from '@/components/Partials/TheFooter.vue';
import { onMounted } from 'vue';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/auth';

const alertStore = useAlertStore();
const authStore = useAuthStore();

onMounted(() => {
  checkLogin();
});

const checkLogin = () => {
  const token = Cookies.get('token');
  if (!token) {
    authStore.$reset();
  }
};
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
