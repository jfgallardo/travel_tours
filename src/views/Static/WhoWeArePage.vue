<template>
  <div>
    <div class="container mx-auto px-4 py-10">
      <div
        class="flex flex-col space-y-4 items-center justify-between md:space-x-4 md:flex-row"
      >
        <div class="grid grid-cols-2 gap-3">
          <img src="@/assets/img/copa.jpg" />
          <img src="@/assets/img/londres.jpg" />
          <img src="@/assets/img/miami.jpg" />
          <img src="@/assets/img/paris.jpg" />
        </div>
        <div>
          <h1 class="font-semibold text-2xl mb-5 text-justify text-gray-700">
            {{ t('whoWeAre.title') }}
          </h1>
          <div>
            <p
              class="text-justify text-gray-700"
              v-html="t('whoWeAre.subtitle')"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
