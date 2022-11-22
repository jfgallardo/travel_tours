<template>
  <div>
    <div class="py-10 container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div>
            <h1 class="text-3xl mb-2 text-center">Entre em contato</h1>
            <div class="flex flex-col items-center space-y-8 py-10">
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
        <div>
          <form ref="formContact" @submit.prevent="sendEmail">
            <div>
              <h1 class="text-3xl mb-2 text-center">Fale conosco</h1>
            </div>
            <div class="space-y-5 px-10">
              <div class="relative">
                <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">
                  NOME
                </span>
                <input
                  name="from_name"
                  :class="inputClassList"
                  class="h-10"
                  :value="inputFieldReset"
                  type="text"
                  required
                />
                <input type="hidden" name="to_name" value="MR Travel" />
              </div>
              <div class="relative">
                <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">
                  EMAIL
                </span>
                <input
                  name="reply_to"
                  :class="inputClassList"
                  class="h-10"
                  :value="inputFieldReset"
                  type="email"
                  required
                />
              </div>
              <div class="relative">
                <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">
                  ASSUNTO
                </span>
                <input
                  name="from_topic"
                  :class="inputClassList"
                  class="h-10"
                  :value="inputFieldReset"
                  type="text"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  rows="5"
                  :class="inputClassList"
                  :value="inputFieldReset"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-sm flex items-center"
                  :disabled="loading"
                >
                  Enviar
                  <div
                    v-if="loading"
                    class="h-5 w-5 border-l-2 border-white rounded-full ml-3 animate-spin"
                  ></div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import emailjs from '@emailjs/browser';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formContact = ref(null);
const inputFieldReset = ref(null);
const loading = ref(false);

const sendEmail = () => {
  loading.value = true;
  emailjs
    .sendForm(
      'service_0696fmk',
      'template_1t2dh0a',
      formContact.value,
      'LTLuD8YRAO-E8-2hA'
    )
    .then(
      () => {
        loading.value = false;
        inputFieldReset.value = ' ';
      },
      (error) => {
        console.log('FAILED...', error.text);
      }
    );
};

const inputClassList = computed(() => {
  return [
    'appearance-none w-full transition duration-150 ease-in-out',
    getTextSizeClass.value,
    getTextColorClass.value,
    getBorderColorClass.value,
    getPaddingClass.value,
  ];
});

const getTextSizeClass = computed(() => {
  return 'text-sm leading-5';
});
const getTextColorClass = computed(() => {
  return 'text-gray-800 placeholder-gray-400';
});
const getBorderColorClass = computed(() => {
  return 'focus:outline-none border border-gray-400 focus:border-blue-400';
});
const getPaddingClass = computed(() => {
  return 'pr-6 pl-4 pt-9 pb-4';
});
</script>
<style scoped></style>
