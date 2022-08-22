<template>
  <div>
    <div class="container mx-auto px-4 pb-36">
      <div class="grid grid-cols-2 content-center">
        <div class="p-10 space-y-6">
          <div
            class="text-6xl font-bold"
            v-html="t('seguro-viagem.title')"
          ></div>
          <div
            class="font-medium text-lg"
            v-html="t('seguro-viagem.subtitle')"
          ></div>
          <div>
            <button
              class="bg-blue-700 hover:bg-blue-800 py-2 text-white px-6 font-medium"
            >
              {{ t("seguro-viagem.button") }}
            </button>
          </div>
        </div>

        <div>
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
