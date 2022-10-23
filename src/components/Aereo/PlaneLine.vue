<template>
  <div class="flex flex-col items-start">
    <div class="flex items-center space-x-3">
      <img
        class="mb-2 h-8 w-8"
        src="@/assets/ico/icons8-flight-on-time-with-a-tick-marks-sign-48.png"
      />
      <p class="font-medium text-lg">
        9:30 <span class="text-gray-500">AM</span>
      </p>
    </div>

    <div>
      <svg>
        <line
          x1="18"
          y1="0"
          x2="18"
          y2="150"
          stroke-width="2"
          stroke="#b3b3cc"
          stroke-dasharray="6,9"
        />
      </svg>
    </div>
    <div class="flex items-center space-x-3">
      <img
        class="h-8 w-8"
        src="@/assets/ico/icons8-flight-arrival-time-delayed-due-to-bad-weather-48.png"
      />
      <p class="font-medium text-lg">
        6:55 <span class="text-gray-500">PM</span>
      </p>
    </div>
  </div>
</template>
<script setup></script>
<style></style>

<!--  -->
