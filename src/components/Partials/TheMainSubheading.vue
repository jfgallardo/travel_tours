<template>
  <div class="flex items-center justify-evenly w-full h-full">
    <RouterLink
        :class="$route.path === '/aereo' ? 'pt-2' : 'py-2'"
        :to="{ path: '/aereo' }"
        class="flex flex-col items-center"
    >
      <div class="flex items-center">
        <Airplane
            :color="$route.path === '/aereo' ? 'blue' : '#292D32'"
            class="mr-1 h-5 w-5"
        />
        <span
            :class="{ 'text-blue-700 font-medium': $route.path === '/aereo' }"
            class="hidden md:block"
        >
          {{ t('header.aereo') }}
        </span>
      </div>

      <div
          v-if="$route.path === '/aereo'"
          class="border-b-2 border-blue-600 w-24 p-1"
      ></div>
    </RouterLink>

    <RouterLink
        :to="{ path: '/hotel' }"
        class="flex flex-col items-center"
        :class="$route.path === '/hotel' ? 'pt-2' : 'py-2'">

      <div class="flex items-center">
      <Hotel
          :color="$route.path === '/hotel' ? 'blue' : '#292D32'"
          class="mr-1 h-5 w-5"
      />
      <span
          :class="{ 'text-blue-700 font-medium': $route.path === '/hotel' }"
          class="hidden md:block"
      >
          Hotel
        </span>
      </div>
      <div
          v-if="$route.path === '/hotel'"
          class="border-b-2 border-blue-600 w-24 p-1"
      ></div>
    </RouterLink>

    <Badge>
      <RouterLink class="flex items-center" to="#">
        <Driving class="mr-1 h-5 w-5"/>
        <span class="hidden md:block">
          {{ t('header.carro') }}
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink class="flex items-center" to="#">
        <Bus class="mr-1 h-5 w-5"/>
        <span class="hidden md:block">
          {{ t('header.onibus') }}
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink class="flex items-center" to="#">
        <!-- :to="{ path: '/cruise' }" -->
        <Ship
            :color="$route.path === '/cruise' ? 'blue' : '#292D32'"
            class="mr-1 h-5 w-5"
        />
        <span
            :class="{ 'text-blue-700': $route.path === '/cruise' }"
            class="hidden md:block"
        >
          {{ t('header.cruseiros') }}
        </span>
      </RouterLink>
    </Badge>

    <Badge>
      <RouterLink class="flex items-center" to="#">
        <WalletOpenTick class="mr-1 h-5 w-5"/>
        <span class="hidden md:block">
          {{ t('header.seguro') }}
        </span>
      </RouterLink>
    </Badge>

<!--    <RouterLink :to="{ name: 'ContractService' }" class="flex items-center">
      <WalletOpenTick
          :color="$route.path === '/contract/service' ? 'blue' : '#292D32'"
          class="mr-1 h-5 w-5"
      />
      <span
          :class="{ 'text-blue-700': $route.path === '/contract/service' }"
          class="hidden md:block"
      >
        Autorização de débito
      </span>
    </RouterLink>-->
  </div>
</template>

<script setup>
import {RouterLink} from 'vue-router';
import {useI18n} from 'vue-i18n';
import Airplane from '@/components/Icons/Airplane.vue';
import Hotel from '@/components/Icons/Hotel.vue';
import Driving from '@/components/Icons/Driving.vue';
import Bus from '@/components/Icons/Bus.vue';
import Badge from '@/components/Partials/TheBadge.vue';
import Ship from '@/components/Icons/Ship.vue';
import WalletOpenTick from '@/components/Icons/WalletOpenTick.vue';

const {t} = useI18n();
</script>
