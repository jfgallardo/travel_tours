<template>
  <div class="slider">
    <div ref="sliderContainer" class="slider-container">
      <div class="slider-track">
        <div
          v-for="(image, index) in imagesToShow"
          :key="index"
          class="slider-item"
        >
          <div class="relative border-b pb-3">
            <div class="absolute bottom-5 text-white pb-1 pl-2 font-bold text-6xl">
              {{ image.city }}
            </div>
            <img
              :src="image.url"
              :alt="image.city"
              class="object-cover"
            />
          </div>

          <div class="flex items-end justify-between mb-2">
           <slot name="footer" v-bind="image"></slot>
            <slot name="footer-right" v-bind="image">
              <ArrowRight class="h-5 w-5 hover:cursor-pointer mr-2" />
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="slider-nav">
      <p class="font-semibold text-sm md:text-2xl">
        {{ label }}
      </p>
      <div class="flex">
        <button class="slider-prev" @click="prevSlide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="blue"
            class="w-3 h-3 md:w-5 md:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button class="slider-next" @click="nextSlide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="blue"
            class="w-3 h-3 md:w-5 md:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import ArrowRight from "@/components/Icons/ArrowRight.vue";

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
});

const itemsToShow = 4;
const currentSlide = ref(0);
const sliderContainer = ref(null);

watch(currentSlide, (newValue) => {
  if (newValue < 0) {
    currentSlide.value = props.images.length - itemsToShow;
  } else if (newValue >= props.images.length - itemsToShow + 1) {
    currentSlide.value = 0;
  }
});

const imagesToShow = computed(() => {
  const endSlide = currentSlide.value + itemsToShow;
  return props.images.slice(currentSlide.value, endSlide);
});

const nextSlide = () => {
  currentSlide.value++;
};
const prevSlide = () => {
  currentSlide.value--;
};
</script>

<style scoped>
.slider {
  position: relative;
  padding: 0 2.5rem;
  width: 100%;
  height: 100%;
}
.slider-container {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.3s ease-in-out;
}
.slider-track {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.slider-item {
  flex-shrink: 0;
  overflow: hidden;
  margin-right: 1rem;
}
.slider-item:last-child {
  margin-right: 0;
}
.slider-nav {
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
}
.slider-prev,
.slider-next {
  background: none;
  border: 1px solid rgb(9, 121, 236);
  border-radius: 100%;
  cursor: pointer;
  padding: 6px;
  margin-left: 8px;
  outline: none;
}
.slider-next:hover,
.slider-prev:hover {
  background-color: rgba(16, 57, 208, 0.88);
}
.slider-next:hover svg {
  stroke: white;
  stroke-width: 2px;
}
.slider-prev:hover svg {
  stroke: white;
  stroke-width: 2px;
}

.slider-prev:disabled,
.slider-next:disabled {
  opacity: 0.5;
  cursor: default;
}

img{
  width: 28rem;
  height: 30rem;
}

@media only screen and (max-width: 576px) {
  .slider-nav {
    padding-right: 1rem;
  }

}
</style>
