<template>
  <footer class="bg-gray-300 py-4 text-center relative z-50">
    <div
      class="footer-preview left-0 w-full h-11 bg-white py-3 invisible md:visible fixed bottom-0 right-0 z-30"
    >
      <ul class="grid grid-cols-6 grid-rows-1 justify-items-center text-sm">
        <li>© 2022 Mr Travel & Tours</li>
        <li>
          <RouterLink :to="{ name: 'WhoWeArePage' }">
            {{ t('banner.quem-somos') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/privacy' }">
            {{ t('banner.privacidade') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'TermsPage' }">
            {{ t('banner.termos') }}
          </RouterLink>
        </li>
        <li>{{ t('banner.viageiros') }}</li>
        <li>
          <RouterLink :to="{ name: 'MainQuestionsPage' }"
            >{{ t('banner.duvidas') }}
          </RouterLink>
        </li>
      </ul>
      <div
        class="flex flex-col items-center md:grid md:grid-cols-2 gap-4 text-sm md:place-items-center mt-8"
      >
        <div>
          <p class="font-light text-center md:text-left">
            <b>CNPJ:</b> 30.876.256/0001-28
          </p>
          <p class="font-light text-center md:text-left">
            <b>Direção:</b> Rua Hélio Batelão, 439, A Mondubim, CE / Fortaleza -
            60766055
          </p>
        </div>
        <div>
          <p class="font-light flex items-center">
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>
            <a class="hover:text-cyan-600" href="tel:+558532417084"
              >+55 (85) 32417084</a
            >
          </p>
          <p class="font-light flex items-center">
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>
            <a class="hover:text-cyan-600" href="tel:+5585981708574"
              >+55 (85) 981708574</a
            >
          </p>
          <p class="font-light flex items-center">
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </span>
            <a
              class="hover:text-cyan-600"
              href="mailito:ola@mrtravelandtours.com?subject=Ola MTravel"
            >
              ola@mrtravelandtours.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

const { t } = useI18n();
</script>

<style scoped>
.footer-preview {
  transition: height 0.5s ease;
}

.footer-preview:hover {
  height: 150px;
}
</style>
