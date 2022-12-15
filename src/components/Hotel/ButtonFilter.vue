<template>
  <div>
    <div class="grid grid-cols-2 grid-rows-1">
      <button
          ref="fast"
          class="py-3 border border-r-0 border-gray-400 relative"
          @click="filter(fast)"
      >
        <div class="flex flex-col items-center font-medium">
          <p class="text-xl">Recomendado</p>
          <div
              v-if="loading"
              class="animate-spin h-6 w-6 border-0 border-t-2 border-gray-400 rounded-full mt-3"
          ></div>
          <div v-else>
            <p>R$ 7.319</p>
            <p>8h 33m (media)</p>
          </div>
        </div>
        <div class="absolute top-2 left-3">
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#292D32"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M6.08998 13.28H9.17998V20.48C9.17998 22.16 10.09 22.5 11.2 21.24L18.77 12.64C19.7 11.59 19.31 10.72 17.9 10.72H14.81V3.52002C14.81 1.84002 13.9 1.50002 12.79 2.76002L5.21998 11.36C4.29998 12.42 4.68998 13.28 6.08998 13.28Z"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
      <button
        ref="cheap"
        class="py-3 border border-gray-400 relative"
        @click="filter(cheap)"
      >
        <div class="flex flex-col items-center font-medium">
          <p class="text-xl">Menor Precio</p>
          <div
            v-if="loading"
            class="animate-spin h-6 w-6 border-0 border-t-2 border-gray-400 rounded-full mt-3"
          ></div>
          <div v-else>
            <p>R$ 4.799</p>
            <p>23h 43m (media)</p>
          </div>
        </div>
        <div class="absolute top-2 left-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#292D32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.05 16.2483H11.17C9.84001 16.2483 8.75 15.1283 8.75 13.7483C8.75 13.3383 9.09 12.9983 9.5 12.9983C9.91 12.9983 10.25 13.3383 10.25 13.7483C10.25 14.2983 10.66 14.7483 11.17 14.7483H13.05C13.44 14.7483 13.75 14.3983 13.75 13.9683C13.75 13.4283 13.6 13.3483 13.26 13.2283L10.25 12.1783C9.61 11.9583 8.75 11.4883 8.75 10.0183C8.75 8.76828 9.74001 7.73828 10.95 7.73828H12.83C14.16 7.73828 15.25 8.85828 15.25 10.2383C15.25 10.6483 14.91 10.9883 14.5 10.9883C14.09 10.9883 13.75 10.6483 13.75 10.2383C13.75 9.68828 13.34 9.23828 12.83 9.23828H10.95C10.56 9.23828 10.25 9.58828 10.25 10.0183C10.25 10.5583 10.4 10.6383 10.74 10.7583L13.75 11.8083C14.39 12.0283 15.25 12.4983 15.25 13.9683C15.25 15.2283 14.26 16.2483 13.05 16.2483Z"
            />
            <path
              d="M12 17.25C11.59 17.25 11.25 16.91 11.25 16.5V7.5C11.25 7.09 11.59 6.75 12 6.75C12.41 6.75 12.75 7.09 12.75 7.5V16.5C12.75 16.91 12.41 17.25 12 17.25Z"
            />
            <path
              d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C12.41 1.25 12.75 1.59 12.75 2C12.75 2.41 12.41 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 11.59 21.59 11.25 22 11.25C22.41 11.25 22.75 11.59 22.75 12C22.75 17.93 17.93 22.75 12 22.75Z"
            />
            <path
              d="M21 7.75H17C16.59 7.75 16.25 7.41 16.25 7V3C16.25 2.59 16.59 2.25 17 2.25C17.41 2.25 17.75 2.59 17.75 3V6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
            />
            <path
              d="M17.0014 7.75141C16.8114 7.75141 16.6214 7.6814 16.4714 7.5314C16.1814 7.2414 16.1814 6.76141 16.4714 6.47141L21.4714 1.47141C21.7614 1.18141 22.2414 1.18141 22.5314 1.47141C22.8214 1.76141 22.8214 2.2414 22.5314 2.5314L17.5314 7.5314C17.3814 7.6814 17.1914 7.75141 17.0014 7.75141Z"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

onMounted(() => {
  cheap.value.classList.add('active');
});

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const cheap = ref(null);
const fast = ref(null);

const cleanRefs = () => {
  cheap.value.classList.remove('active');
  fast.value.classList.remove('active');
};

const filter = (ref) => {
  cleanRefs();
  ref.classList.add('active');
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}

.active svg:not([stroke]) {
  fill: white;
}

.active svg:is([fill='none']) {
  stroke: white;
}
</style>
