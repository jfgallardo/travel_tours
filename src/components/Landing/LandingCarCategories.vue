<template>
  <div>
    <div class="container mx-auto px-4 pb-20 space-y-9">
      <div
        class="lg:text-7xl text-4xl font-bold text-center"
        v-html="t('landingCarCategories.title')"
      ></div>
      <div
        class="grid grid-cols-3 grid-rows-3 gap-4 justify-items-center lg:grid-cols-5 lg:grid-rows-2"
      >
        <div>
          <img
            src="@/assets/img/localiza-300x300.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover object-bottom"
          />
        </div>
        <div>
          <img
            src="@/assets/img/avis-logo.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover object-bottom border border-blue-700"
          />
        </div>
        <div>
          <img
            src="@/assets/img/movida-300x300.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover object-bottom"
          />
        </div>
        <div>
          <img
            src="@/assets/img/unidas-300x300.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover object-bottom"
          />
        </div>
        <div class="lg:place-self-start">
          <img
            src="@/assets/img/budget.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover object-bottom border border-blue-700"
          />
        </div>
        <div class="lg:place-self-end">
          <img
            src="@/assets/img/europcar.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover mx-auto object-bottom border border-blue-700"
          />
        </div>
        <div class="lg:place-self-end">
          <img
            src="@/assets/img/alamo-300x300.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover mx-auto object-bottom border border-blue-700"
          />
        </div>
        <div class="lg:place-self-end">
          <img
            src="@/assets/img/dollar.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover mx-auto object-bottom border border-blue-700"
          />
        </div>
        <div class="lg:place-self-end">
          <img
            src="@/assets/img/hertz-300x300.jpg"
            class="rounded-full h-28 w-28 md:h-32 md:w-32 object-cover mx-auto object-bottom"
          />
        </div>
      </div>
      <div class="flex items-center justify-center space-x-1">
        <RouterLink :to="{ name: 'CarCategoriesPage' }">
          {{ t('landingCarCategories.subtitle') }}</RouterLink
        >
        <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowRight from '@/components/Icons/ArrowRight.vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
