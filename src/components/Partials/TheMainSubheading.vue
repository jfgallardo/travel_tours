<template>
  <div class="flex items-center justify-evenly w-full h-full">
    <Badge>
      <RouterLink to="#" class="flex items-center">
        <!-- :to="{ path: '/aereo' }" -->
        <Airplane
          class="mr-1 h-5 w-5"
          :color="$route.path === '/aereo' ? 'blue' : '#292D32'"
        />
        <span
          class="hidden md:block"
          :class="{ 'text-blue-700': $route.path === '/aereo' }"
        >
          {{ t('header.aereo') }}
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink to="#" class="flex items-center">
        <!-- :to="{ path: '/hotel' }" -->
        <Hotel
          class="mr-1 h-5 w-5"
          :color="$route.path === '/hotel' ? 'blue' : '#292D32'"
        />
        <span
          class="hidden md:block"
          :class="{ 'text-blue-700': $route.path === '/hotel' }"
        >
          Hotel
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink to="#" class="flex items-center">
        <Driving class="mr-1 h-5 w-5" />
        <span class="hidden md:block">
          {{ t('header.carro') }}
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink to="#" class="flex items-center">
        <Bus class="mr-1 h-5 w-5" />
        <span class="hidden md:block">
          {{ t('header.onibus') }}
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink to="#" class="flex items-center">
        <!-- :to="{ path: '/cruise' }" -->
        <Ship
          class="mr-1 h-5 w-5"
          :color="$route.path === '/cruise' ? 'blue' : '#292D32'"
        />
        <span
          class="hidden md:block"
          :class="{ 'text-blue-700': $route.path === '/cruise' }"
        >
          {{ t('header.cruseiros') }}
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink to="#" class="flex items-center">
        <WalletOpenTick class="mr-1 h-5 w-5" />
        <span class="hidden md:block">
          {{ t('header.seguro') }}
        </span>
      </RouterLink>
    </Badge>
   <!--  <RouterLink :to="{ name: 'ContractService' }" class="flex items-center">
      <WalletOpenTick
        class="mr-1 h-5 w-5"
        :color="$route.path === '/contract/service' ? 'blue' : '#292D32'"
      />
      <span
        class="hidden md:block"
        :class="{ 'text-blue-700': $route.path === '/contract/service' }"
      >
        Autorização de débito
      </span>
    </RouterLink> -->
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Airplane from '@/components/Icons/Airplane.vue';
import Hotel from '@/components/Icons/Hotel.vue';
import Driving from '@/components/Icons/Driving.vue';
import Bus from '@/components/Icons/Bus.vue';
import Badge from '@/components/Partials/TheBadge.vue';
import Ship from '@/components/Icons/Ship.vue';
import WalletOpenTick from '@/components/Icons/WalletOpenTick.vue';

const { t } = useI18n();
</script>
