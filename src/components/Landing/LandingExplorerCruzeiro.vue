<template>
  <div>
    <div class="container mx-auto px-4 pb-20">
      <div>
        <h3 class="text-4xl font-semibold mb-6">
          {{ t("explorer-cruzeiros.title") }}
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <div class="absolute bottom-0 pl-4 pb-4 z-20">
              <span class="text-8xl text-white font-bold">Carnival</span>
              <p class="text-white text-xl mt-3">
                5 {{ t("explorer-cruzeiros.cruzeiros-disponíveis", 5) }}
              </p>
            </div>
            <img
              src="@/assets/img/yate.jpg"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="relative">
            <div class="absolute bottom-0 pl-4 pb-4 z-20">
              <span class="text-8xl text-white font-bold"> Royal </span>
              <p class="text-white text-xl mt-3">
                1 {{ t("explorer-cruzeiros.cruzeiros-disponíveis", 1) }}
              </p>
            </div>
            <img
              src="@/assets/img/royal.jpg"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div class="float-right mt-3">
          <div class="flex items-center space-x-1">
            <span> {{ t("explorer-cruzeiros.button") }}</span>
            <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2" />
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
