<template>
  <div>
    <div class="container mx-auto px-4 py-20">
      <div>
        <h3 class="text-2xl font-semibold mb-6">
          {{ t("explorer-voos.title") }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative">
            <div class="absolute bottom-0 pl-4 pb-4 z-20">
              <span class="text-7xl md:text-6xl lg:md:text-7xl text-white font-bold">Paris</span>
              <p class="text-white text-xl">
                5 {{ t("explorer-voos.voos-disponíveis", 5) }}
              </p>
            </div>
            <img
              src="@/assets/img/paris.jpg"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="relative">
            <div class="absolute bottom-0 pl-4 pb-4 z-20">
              <span class="text-7xl md:text-6xl lg:md:text-7xl text-white font-bold"> New York </span>
              <p class="text-white text-xl">
                1 {{ t("explorer-voos.voos-disponíveis", 1) }}
              </p>
            </div>
            <img
              src="@/assets/img/new-york.jpg"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div class="float-right mt-3">
          <div class="flex items-center space-x-1">
            <span>{{ t("explorer-voos.button") }}</span>
            <ArrowRight class="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import ArrowRight from "@/components/Icons/ArrowRight.vue";

const { t } = useI18n();
</script>
