<template>
  <div>
    <div
      class="md:border-b md:border-gray-300 md:grid md:grid-cols-3 md:grid-rows-1 md:gap-7"
    >
      <div class="md:relative">
        <div class="md:fixed md:w-2/6">
          <div class="border-r border-gray-300 pt-8">
            <CruiseForm />
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import CruiseForm from '@/components/Cruceros/CruiseForm.vue';
</script>

<style scoped></style>
