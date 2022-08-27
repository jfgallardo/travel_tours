<template>
  <div class="container">
    <div class="relative">
      <button
        @click="state.hiddenDropdown = !state.hiddenDropdown"
        class="bg-white flex items-center"
      >
        <Globe class="mr-1 h-5 w-5" />
        {{ state.lang }}
        <ChevronDown class="ml-2 h-4 w-4" />
      </button>
      <div
        class="bg-white border border-gray-300 py-1 shadow-md rounded-md absolute z-20"
        :class="{ hidden: state.hiddenDropdown }"
        style="width: 110px"
      >
        <ul>
          <li
            @click="selectLang('br')"
            class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1"
          >
            BR
          </li>
          <li
            @click="selectLang('en')"
            class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1"
          >
            EN
          </li>
          <li
            @click="selectLang('es')"
            class="hover:bg-blue-400 hover:cursor-pointer hover:text-white text-sm text-gray-500 px-3 py-1"
          >
            ES
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { setLocale } from "@vee-validate/i18n";

import Globe from "@/components/Icons/Globe.vue";
import ChevronDown from "@/components/Icons/ChevronDown.vue";

let state = reactive({ hiddenDropdown: true, lang: "EN" });
const { locale } = useI18n();

function selectLang(lang) {
  locale.value = lang;
  setLocale(lang);
  state.lang = lang.toUpperCase();
  state.hiddenDropdown = true;
}
</script>

<style scoped></style>
