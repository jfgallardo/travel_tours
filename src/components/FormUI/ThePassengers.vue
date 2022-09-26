<template>
  <div>
    <div>
      <div class="container" ref="fullContainer">
        <div class="relative mt-5">
          <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{
          label
          }}</span>
          <button ref="button" @click="toggle === false ? handleClick($event) : handleHide($event)" aria-expanded="false"
            class="flex justify-center pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 w-full bg-white border text-left cursor-default focus:outline-none sm:text-sm">
            <span class="flex items-center space-x-3">
             
            </span>
          </button>
          <Transition name="fade">
            <div class="dropdownMenu" ref="dropdown" v-click-outside>
             
              <div id="arrow" data-popper-arrow></div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { createPopper } from "@popperjs/core";
import ChevronDown from "@/components/Icons/ChevronDown.vue";
import PassengersInput from "@/components/FormUI/PassengersInput.vue";

const vClickOutside = {
  mounted: () => {
    document.addEventListener("click", clickOutListener);
  },
  unmounted: () => {
    document.removeEventListener("click", clickOutListener);
  },
};

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["passengers"]);

const button = ref(null);
const dropdown = ref(null);
const toggle = ref(false);
const fullContainer = ref(null)

const numberAdults = ref(1);
const numberChilds = ref(0);
const numberBebes = ref(0);

const popperInstance = computed(() => {
  return createPopper(button.value, dropdown.value, {
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          padding: 4,
        },
      },
      {
        name: "flip",
        options: {
          padding: 4,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  });
});

const handleClick = (e) => {
  dropdown.value.setAttribute("data-show", "");
  popperInstance.value.update();
  toggle.value = true;
};

const handleHide = (e) => {
  let passengers = {
    numberAdults: numberAdults.value,
    numberChilds: numberChilds.value,
    numberBebes: numberBebes.value,
  };
  emit("passengers", passengers);
  dropdown.value.removeAttribute("data-show");
  toggle.value = false;
};

const clickOutListener = (evt) => {
  if (!fullContainer.value.contains(evt.target)) {
    handleHide(evt);
  }
};

const takeOffAdults = () => {
  if (numberAdults.value > 1) {
    numberAdults.value--;
  }
};
const addUpfAdults = () => {
  if (numberAdults.value < 8) {
    numberAdults.value++;
  }
};

const takeOffChilds = () => {
  if (numberChilds.value > 0) {
    numberChilds.value--;
  }
};
const addUpfChilds = () => {
  if (numberChilds.value < 8) {
    numberChilds.value++;
  }
};

const takeOffBebes = () => {
  if (numberBebes.value > 0) {
    numberBebes.value--;
  }
};
const addUpfBebes = () => {
  if (numberBebes.value < 8) {
    numberBebes.value++;
  }
};
</script>

<style scoped>
.dropdownMenu {
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: .25rem;
  z-index: 1000;
  min-width: 10rem;
  padding: .5rem 0;
  display: none;
}

.dropdownMenu[data-show] {
  display: block;
}

</style>
