<template>
<div>
  <div class="mx-auto px-4 flex flex-col">
        <h1 class="text-lg font-semibold">Grupos com destino a {{destiny}}</h1>
    <div class="py-5">
      {{destiny}} | {{date}}
      <div class="flex -space-x-1 overflow-hidden py-2">
        <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="">
        <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <div class="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gray-300 text-sm text-white flex items-center justify-center p-1">+{{ morePeople }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { computed} from "vue";
import {useSearchOptionsVooStore} from "@/stores/searchOptionsVoo";

const searchOptionsVoo = useSearchOptionsVooStore()

defineProps({
  date: {
    type: [String, Date],
    default: 'Sep 12'
  },
  morePeople: {
    type: [String, Number],
    default: ''
  }
})

const destiny = computed(() => {
  return searchOptionsVoo.destiny.label.split('|')[0].trim()
})

</script>

<style scoped>

</style>