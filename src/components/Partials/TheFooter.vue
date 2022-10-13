<template>
  <div class="relative">
    <div
      class="bg-white py-3 invisible md:visible fixed bottom-0 right-0 left-0 z-30"
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
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

const { t } = useI18n();
</script>
