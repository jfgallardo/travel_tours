<template>
  <div>
    <div class="container mx-auto px-4 pb-10 text-justify space-y-5">
      <h1 class="text-xl text-blue-900 mb-3">{{ t('privacyPolicy.title') }}</h1>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.texTitle')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.personalData')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.dataCollect')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.objective')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.weShare')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.internationalTransfer')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.timeWeKeepData')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.rightsPersonalData')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.dataProtection')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.cookiesWebBeacons')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.policyValidity')"
        ></p>
      </div>
      <div>
        <p
          class="text-sm text-gray-700"
          v-html="t('privacyPolicy.contact')"
        ></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
