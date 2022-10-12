<template>
  <div>
    <HeroImage>
      <template v-slot:image>
        <img src="@/assets/img/hero2.jpg" class="h-full w-full object-cover" />
      </template>
      <template v-slot:title>
        {{ t('hero-hotéis.title') }}
      </template>
      <template v-slot:subtitle>
        {{ t('hero-hotéis.subtitle') }}
      </template>
      <template v-slot:button>
        <button class="bg-blue-700 text-white py-2 px-6 hover:bg-blue-800">
          <Badge>
            {{ t('hero-hotéis.button') }}
          </Badge>
        </button>
      </template>
    </HeroImage>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Badge from '@/components/Partials/TheBadge.vue';
import HeroImage from '@/components/Partials/TheHeroImage.vue';

const { t } = useI18n();
</script>

<style scoped></style>
