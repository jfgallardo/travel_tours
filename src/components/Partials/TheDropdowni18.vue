<template>
  <Dropddown :toggle-out="hiddenDropdown">
    <template #selected>
      <button class="bg-white flex items-center p-2">
        <Globe class="mr-1 h-5 w-5" />
        <span>
          {{ state.lang }}
        </span>
      </button>
    </template>
    <template #dropdown>
      <ul>
        <li
          class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1 flex items-center space-x-3"
          @click="selectLang('br')"
        >
          <img src="@/assets/ico/brasil.png" class="w-4 h-4" />
          <p>{{ t('i18T.portugues') }}</p>
        </li>
        <li
          class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1 flex items-center space-x-3"
          @click="selectLang('en')"
        >
          <img src="@/assets/ico/united-states.png" class="w-4 h-4" />
          <p>{{ t('i18T.ingles') }}</p>
        </li>
        <li
          class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1 flex items-center space-x-3"
          @click="selectLang('es')"
        >
          <img src="@/assets/ico/spain.png" class="w-4 h-4" />
          <p>{{ t('i18T.espanol') }}</p>
        </li>
      </ul>
    </template>
  </Dropddown>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from '@vee-validate/i18n';

import Globe from '@/components/Icons/Globe.vue';
import Dropddown from '@/components/FormUI/TheDropddown.vue';

let state = reactive({ lang: 'BR' });
let hiddenDropdown = ref(false);
const { locale, t } = useI18n();

function selectLang(lang) {
  locale.value = lang;
  setLocale(lang);
  state.lang = lang.toUpperCase();
  hiddenDropdown.value = !hiddenDropdown.value;
}
</script>

<style scoped></style>
