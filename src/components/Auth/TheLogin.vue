<template>
  <div>
    <Transition name="loader" appear mode="out-in">
      <Loader v-if="authStore.loading" />
    </Transition>
    <div class="w-64">
      <div class="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div v-if="authStore.user_logged.data">
            <h2 class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Welcome {{ authStore.user_logged.data.fullName }}
            </h2>
          </div>
          <div v-else>
            <h2 class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              {{ t('auth.title') }}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              <RouterLink :to="{ name: 'RegisterPage' }" class="font-medium text-blue-600 hover:text-blue-500">
                {{ t('auth.subtitle') }}
              </RouterLink>
            </p>
          </div>
          <div v-if="authStore.user_logged.data">
            <ul>
              <li>Configuraciones</li>
              <li class="hover:cursor-pointer" @click="logout">Salir de la cuenta</li>
            </ul>
          </div>
          <form v-else class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" v-model="email" name="email" type="email" required
                  class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  :placeholder="t('auth.email')" />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" v-model="password" name="password" type="password" required
                  class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  :placeholder="t('auth.placeholder-pwd')" />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="text-sm">
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500">{{ t('auth.forgot') }}</a>
              </div>
            </div>

            <div>
              <button type="button" @click="login"
                class="group relative flex w-full justify-center border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
                {{ t('auth.button-login') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Loader from '@/components/Partials/TheLoader.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const login = () => {
  const formData = {
    email: email.value,
    password: password.value,
  };

  authStore.login(formData);
};

const logout = () => {
  authStore.logout();
  email.value = '';
  password.value = '';
}
</script>

<style scoped>
.loader-enter-active {
  transition: all 0.5ms ease;
}

.loader-leave-active {
  transition: all 0.5s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>
