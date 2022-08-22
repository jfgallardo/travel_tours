<template>
  <div>
    <div class="container mx-auto px-4 pb-20 space-y-9">
      <div class="text-7xl font-bold text-center">
        Atendemos empresas<br />nacionais e internacionais
      </div>
      <div class="grid grid-cols-5 grid-rows-1 justify-items-center">
        <div>
          <img
            src="@/assets/img/localiza-300x300.jpg"
            class="rounded-full h-32 w-32 object-cover object-bottom"
          />
        </div>
        <div>
          <img
            src="@/assets/img/avis-logo.jpg"
            class="rounded-full h-32 w-32 object-cover object-bottom border border-blue-700"
          />
        </div>
        <div>
          <img
            src="@/assets/img/movida-300x300.jpg"
            class="rounded-full h-32 w-32 object-cover object-bottom"
          />
        </div>
        <div>
          <img
            src="@/assets/img/unidas-300x300.jpg"
            class="rounded-full h-32 w-32 object-cover object-bottom"
          />
        </div>
        <div>
          <img
            src="@/assets/img/budget.jpg"
            class="rounded-full h-32 w-32 object-cover object-bottom border border-blue-700"
          />
        </div>
      </div>
      <div class="grid grid-cols-5 grid-rows-1 justify-items-end">
        <div>
          <img
            src="@/assets/img/europcar.jpg"
            class="rounded-full h-32 w-32 object-cover mx-auto object-bottom border border-blue-700"
          />
        </div>
        <div class="">
          <img
            src="@/assets/img/alamo-300x300.jpg"
            class="rounded-full h-32 w-32 object-cover mx-auto object-bottom border border-blue-700"
          />
        </div>
        <div>
          <img
            src="@/assets/img/dollar.jpg"
            class="rounded-full h-32 w-32 object-cover mx-auto object-bottom border border-blue-700"
          />
        </div>
        <div>
          <img
            src="@/assets/img/hertz-300x300.jpg"
            class="rounded-full h-32 w-32 object-cover mx-auto object-bottom"
          />
        </div>
      </div>
      <div class="flex items-center justify-center space-x-1">
        <span> Saiba tudo sobre as categorias de carros</span>
        <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowRight from "@/components/Icons/ArrowRight.vue";
</script>
