<template>
  <div>
    <div class="container mx-auto px-4 pb-36">
      <div class="grid grid-cols-1 md:grid-cols-2 content-center">
        <div class="p-10 space-y-6 order-2 md:order-1 text-center md:text-left">
          <div
            class="md:text-6xl text-7xl font-bold"
            v-html="t('seguro-viagem.title')"
          ></div>
          <div
            class="font-medium text-lg"
            v-html="t('seguro-viagem.subtitle')"
          ></div>
          <div>
            <button
              class="bg-blue-700 hover:bg-blue-800 md:py-2 py-4 text-white md:px-6 px-8 font-medium text-2xl md:text-base"
            >
              {{ t("seguro-viagem.button") }}
            </button>
          </div>
        </div>

        <div class="md:order-2">
          <div class="grid grid-cols-3 grid-rows-2 gap-2 h-full">
            <div class="h-56">
              <img src="@/assets/img/seguro1.jpg" class="h-full object-cover" />
            </div>
            <div class="col-span-2 h-56">
              <img
                src="@/assets/img/seguro2.jpg"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="col-span-2 h-56">
              <img
                src="@/assets/img/seguro3.jpg"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="bg-blue-700 flex items-center justify-center">
              <i class="iconsax" icon-name="bar-graph-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
