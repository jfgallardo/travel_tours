<template>
  <div>
    <div class="container mx-auto px-4 py-10 text-justify">
      <div>
        <h1 class="text-xl text-blue-900 mb-3">Principais Dúvidas</h1>
      </div>
      <CollapseAccording>
        <template v-slot:header
          >{{ t('mainQuestions.airTicketPurchaseHeader') }}
        </template>
        <template v-slot:body>
          <p
            class="text-sm text-gray-700"
            v-html="t('mainQuestions.airTicketPurchaseBody')"
          ></p>
        </template>
      </CollapseAccording>

      <CollapseAccording>
        <template v-slot:header
          >{{ t('mainQuestions.buyUsingMmilesHeader') }}
        </template>
        <template v-slot:body>
          <p
            class="text-sm text-gray-700"
            v-html="t('mainQuestions.buyUsingMmilesBody')"
          ></p>
        </template>
      </CollapseAccording>

      <CollapseAccording>
        <template v-slot:header
          >{{ t('mainQuestions.cancellationsHeader') }}
        </template>
        <template v-slot:body>
          <p
            class="text-sm text-gray-700"
            v-html="t('mainQuestions.cancellationsBody')"
          ></p>
        </template>
      </CollapseAccording>

      <CollapseAccording>
        <template v-slot:header
          >{{ t('mainQuestions.accumulateMilesHeader') }}
        </template>
        <template v-slot:body>
          <p
            class="text-sm text-gray-700"
            v-html="t('mainQuestions.accumulateMilesBody')"
          ></p>
        </template>
      </CollapseAccording>

      <CollapseAccording>
        <template v-slot:header
          >{{ t('mainQuestions.sellMyMilesHeader') }}
        </template>
        <template v-slot:body>
          <p
            class="text-sm text-gray-700"
            v-html="t('mainQuestions.sellMyMilesBody')"
          ></p>
        </template>
      </CollapseAccording>

      <CollapseAccording>
        <template v-slot:header
          >{{ t('mainQuestions.registerOnSiteHeader') }}
        </template>
        <template v-slot:body>
          <p
            class="text-sm text-gray-700"
            v-html="t('mainQuestions.registerOnSiteBody')"
          ></p>
        </template>
      </CollapseAccording>
    </div>
  </div>
</template>
<script setup>
import CollapseAccording from '@/components/Static/CollapseAccording.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
