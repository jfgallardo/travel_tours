<template>
  <div>
    <div class="container mx-auto px-4 py-10 text-gray-500 text-justify">
      <h2 class="font-semibold text-xl">{{ t('terms.title') }}</h2>
      <div>
        <p class="font-light text-sm" v-html="t('terms.whatIsIt')"></p>
      </div>
      <div class="py-3">
        <h3 class="font-semibold">{{ t('terms.subtitleMoblix') }}</h3>
        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.textMoblix')"></p>
        </div>
        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.object')"></p>
        </div>
        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.capacidade')"></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.registration')"
          ></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.modification')"
          ></p>
        </div>
        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.privacy')"></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.obligations')"
          ></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.obligationsMR')"
          ></p>
        </div>
        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.violation')"></p>
        </div>

        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.sanctions')"></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.responsibilities')"
          ></p>
        </div>
        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.failure')"></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.intellectualProperty')"
          ></p>
        </div>
        <div>
          <p class="py-2 font-light text-sm" v-html="t('terms.indemnity')"></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.legislation')"
          ></p>
        </div>
        <div>
          <p
            class="py-2 font-light text-sm"
            v-html="t('terms.generalProvisions')"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
