<template>
  <div class="flex items-center justify-evenly w-full h-full">
    <RouterLink :to="{ name: 'Aereo' }" class="flex items-center">
      <Airplane class="mr-1 h-5 w-5" />
      {{ t("header.aereo") }}
    </RouterLink>
    <RouterLink to="/" class="flex items-center">
      <Hotel class="mr-1 h-5 w-5" />
      Hotel
    </RouterLink>
    <RouterLink to="/" class="flex items-center">
      <Driving class="mr-1 h-5 w-5" />
      {{ t("header.carro") }}
    </RouterLink>
    <RouterLink to="/" class="flex items-center">
      <Bus class="mr-1 h-5 w-5" />
      {{ t("header.onibus") }}
    </RouterLink>
    <RouterLink to="/" class="flex items-center">
      <Ship class="mr-1 h-5 w-5" />
      {{ t("header.cruseiros") }}
    </RouterLink>
    <RouterLink to="/" class="flex items-center">
      <WalletOpenTick class="mr-1 h-5 w-5" />
      {{ t("header.seguro") }}
    </RouterLink>
    <RouterLink to="/debit/authorization" class="flex items-center">
      <WalletOpenTick class="mr-1 h-5 w-5" />
      Autorização de débito
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import Airplane from "@/components/Icons/Airplane.vue";
import Hotel from "@/components/Icons/Hotel.vue";
import Driving from "@/components/Icons/Driving.vue";
import Bus from "@/components/Icons/Bus.vue";
import Ship from "@/components/Icons/Ship.vue";
import WalletOpenTick from "@/components/Icons/WalletOpenTick.vue";

const { t } = useI18n();
</script>
