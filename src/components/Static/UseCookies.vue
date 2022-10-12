<template>
  <div>
    <div class="container mx-auto px-4 pb-10 text-justify">
      <h1 class="text-xl text-blue-900 mb-3">
        {{ t('privacyCookies.title') }}
      </h1>
      <div>
        <p class="text-sm text-gray-700">{{ t('privacyCookies.textTitle') }}</p>
      </div>
      <h2 class="mt-5 text-blue-900 mb-3">
        {{ t('privacyCookies.subtitle') }}
      </h2>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyCookies.textSubtitle')"
        ></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
