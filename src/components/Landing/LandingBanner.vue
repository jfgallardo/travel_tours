<template>
  <div class="banner">
    <div class="h-full flex items-center justify-between relative">
      <div
        class="absolute bottom-5 text-left md:flex md:items-end md:justify-around md:w-full"
      >
        <p
          class="font-bold text-7xl md:text-9xl text-white pb-5"
          v-html="t('banner.title')"
        ></p>

        <button class="bg-white font-bold px-8 py-3 text-lg mb-3.5">
          <Badge>
            {{ t('banner.button') }}
          </Badge>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Badge from '@/components/Partials/TheBadge.vue';
const { t } = useI18n();
</script>

<style scoped>
.banner {
  background: url('@/assets/img/banner.jpg');
  background-size: cover;
  background-position: center center;
  height: 850px;
}
</style>
