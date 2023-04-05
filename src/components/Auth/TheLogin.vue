<template>
  <div>
    <Transition name="loader" appear mode="out-in">
      <Loader v-if="authStore.loading" />
    </Transition>
    <div>
      <div class="flex min-h-full items-center justify-center">
        <div class="w-full max-w-md space-y-8">
          <div v-if="authStore.userLogged">
            <h2
              class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900"
            >
              Welcome {{ authStore.userLogged.fullName }}
            </h2>
          </div>
          <div v-else>
            <h2
              class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900"
            >
              {{ t('auth.title') }}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              <RouterLink
                :to="{ name: 'RegisterPage' }"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                {{ t('auth.subtitle') }}
              </RouterLink>
            </p>
          </div>
          <div v-if="authStore.userLogged">
            <ul class="space-y-1.5">
              <li class="hover:cursor-pointer hover:bg-gray-50 px-2.5 py-1.5">
                <RouterLink
                  :to="{ name: 'SettingsHome' }"
                  class="flex space-x-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span> Configuraciones </span>
                </RouterLink>
              </li>
              <li
                class="hover:cursor-pointer hover:bg-gray-50 flex space-x-1.5 px-2.5 py-1.5"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span> Salir de la cuenta </span>
              </li>
            </ul>
          </div>
          <form v-else class="mt-8 space-y-6 px-2.5">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input
                  id="email-address"
                  v-model="email"
                  name="email"
                  type="email"
                  required
                  class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  :placeholder="t('auth.email')"
                />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  required
                  class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  :placeholder="t('auth.placeholder-pwd')"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:text-blue-500"
                  >{{ t('auth.forgot') }}</a
                >
              </div>
            </div>

            <div>
              <button
                type="button"
                class="group relative flex w-full justify-center border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                @click="login"
              >
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd"
                    />
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
import { inject, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Loader from '@/components/Partials/TheLoader.vue';
import { useI18n } from 'vue-i18n';
import { useAlertStore } from '@/stores/alert';
const { t } = useI18n();

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const $cookies = inject('$cookies');
const alertStore = useAlertStore();

const login = () => {
  authStore.loading = true;
  const formData = {
    email: email.value,
    password: password.value,
  };

  authStore
    .login(formData)
    .then(({ data }) => {
      $cookies.set('dataUser', data);
      authStore.userLogged = data.data;
      authStore.userLogged.access_token = data.access_token;
      alertStore.showMsg({
        message: `Bienvenido ${data.data.fullName}`,
        backgrColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      });
      authStore.loading = false;
    })
    .catch(() => {
      authStore.loading = false;
    });
};

const logout = () => {
  email.value = '';
  password.value = '';
  if ($cookies.isKey('dataUser')) {
    $cookies.remove('dataUser');
    authStore.userLogged = null;
  }
  alertStore.showMsg({
    message: 'Ha cerrado exitosamente la sesión.',
    backgrColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  });
};
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
