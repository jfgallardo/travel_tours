<template>
  <div :class="background">
    <div class="container mx-auto px-4 py-20">
      <div class="space-y-10">
        <div class="flex items-center justify-center space-x-5">
          <img
            src="@/assets/img/avatar-first.jpg"
            class="h-16 w-16 object-cover object-left-top rounded-full hidden md:block"
          />
          <img
            src="@/assets/img/avatar2.jpg"
            class="h-20 w-20 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar-center.jpg"
            class="h-24 w-24 object-cover object-top rounded-full"
          />
          <img
            src="@/assets/img/avatar-rigth.jpg"
            class="h-20 w-20 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar3.jpg"
            class="h-16 w-16 object-cover rounded-full hidden md:block"
          />
        </div>
        <div class="text-center font-bold text-4xl">
          {{ t('greeting.title') }}
        </div>
        <div>
          <h2 class="px-8 text-center text-2xl font-medium pb-2">
            MR TRAVEL & TOURS
          </h2>
          <div class="grid grid-cols-2 gap-4 text-sm md:place-items-center">
            <div>
              <p class="font-light text-center md:text-left">
                <b>CNPJ:</b> 30.876.256/0001-28
              </p>
              <p class="font-light text-center md:text-left">
                <b>Direção:</b> Rua Hélio Batelão, 439, A Mondubim, CE /
                Fortaleza - 60766055
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  background: {
    type: String,
    default: 'bg-gray-200',
  },
});
</script>
