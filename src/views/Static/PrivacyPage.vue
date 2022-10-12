<template>
  <div>
    <div class="px-4 py-10 container mx-auto">
      <div class="flex space-x-10">
        <div class="flex flex-col space-y-5 basis-1/4">
          <h1 class="text-4xl font-sans">Mr Travel & Tours, Inc</h1>
          <div>
            <a
              href="#"
              class="hover:text-blue-700 text-cyan-600"
              @click="changeTab(PrivacyPolicy)"
              >{{ t('privacy.privacyPolicy') }}</a
            >
          </div>
          <div>
            <a
              href="#"
              @click="changeTab(UseCookies)"
              class="hover:text-blue-700 text-cyan-600"
              >{{ t('privacy.useCookies') }}</a
            >
          </div>
        </div>
        <div class="basis-3/4">
          <component :is="selectedComponent"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, markRaw } from 'vue';
import PrivacyPolicy from '@/components/Static/PrivacyPolicy.vue';
import { useI18n } from 'vue-i18n';
import UseCookies from '@/components/Static/UseCookies.vue';

onMounted(() => {
  selectedComponent.value = markRaw(PrivacyPolicy);
});

let selectedComponent = ref(null);
const { t } = useI18n();

const changeTab = (newTab) => {
  selectedComponent.value = markRaw(newTab);
};
</script>
