<template>
  <div>
    <div>
      <div class="flex flex-col space-y-2 p-4 bg-white">
        <label class="font-semibold text-black w-36">{{ label }}</label>
        <div class="flex items-center justify-start">
          <div>
            <span @click="$emit('takeOff')" class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <div>
            <div class="mx-2 text-gray-800">
              {{ modelValue }}
            </div>
          </div>
          <div>
            <span @click="$emit('addUp')" class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <div>
            <p class="font-light text-sm ml-3">{{ age }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Number,
    required: true,
  },
  age: {
    type: String,
  },
});
</script>

<style scoped></style>
