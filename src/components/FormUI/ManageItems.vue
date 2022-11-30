<template>
  <div>
    <div>
      <div class="flex flex-col items-center bg-white">
        <label class="font-semibold text-black text-center">{{ label }}</label>
        <p v-if="subtitle" class="text-sm font-extralight">{{ subtitle }}</p>
        <div class="flex items-center justify-start mt-2">
          <div>
            <span class="cursor-pointer" @click="$emit('takeOff', label)">
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
            <span class="cursor-pointer" @click="$emit('addUp', label)">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Number,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>

<style scoped></style>
