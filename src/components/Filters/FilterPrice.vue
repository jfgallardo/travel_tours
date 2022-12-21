<template>
  <div>
    <div class="flex flex-col justify-center p-4 space-y-4">
      <label class="font-semibold text-lg text-center">Range of Price</label>
      <div class="relative">
        <input id="fromSlider" type="range" value="10" min="0" max="100"/>
        <input id="toSlider" type="range" value="40" min="0" max="100"/>
      </div>
      <span class="text-center">rango de precios</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.sliders_control {
  position: relative;
  min-height: 50px;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type=range]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: rgba(16, 57, 208, 0.99);
  pointer-events: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}

</style>