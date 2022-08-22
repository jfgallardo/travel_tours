<template>
  <div>
    <div class="container px-4 mx-auto space-y-4 pb-20">
      <div class="bg-gray-400 slot-image">
        <slot name="image"></slot>
      </div>
      <div class="text-center font-bold text-5xl">
        <slot name="title"></slot>
      </div>
      <div class="text-center font-light">
        <slot name="subtitle"></slot>
      </div>
      <div class="text-center pt-4">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.slot-image {
  height: 40rem;
}
</style>
