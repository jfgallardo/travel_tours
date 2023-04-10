<template>
  <div :class="background">
    <div class="container mx-auto px-4 py-20 pb-52">
      <div class="space-y-10">
        <div class="flex items-center justify-center space-x-5">
          <img
            src="@/assets/img/avatar-first.jpg"
            class="h-16 w-16 object-cover object-left-top rounded-full hidden md:block"
          />
          <img
            src="@/assets/img/avatar2.jpg"
            class="h-20 w-20 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar-center.jpg"
            class="h-24 w-24 object-cover object-top rounded-full"
          />
          <img
            src="@/assets/img/avatar-rigth.jpg"
            class="h-20 w-20 object-cover rounded-full"
          />
          <img
            src="@/assets/img/avatar3.jpg"
            class="h-16 w-16 object-cover rounded-full hidden md:block"
          />
        </div>
        <div class="text-center font-bold text-4xl">
          {{ t('greeting.title') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  background: {
    type: String,
    default: 'bg-gray-200',
  },
});
</script>
