<template>
    <div>
        <div>
            <div class="container" ref="dropdownP">
                <div class="relative mt-5">
                    <span class="absolute top-0 pl-4 mt-1 text-gray-400 text-sm">{{ label }}</span>
                    <button @click="show()"  
                        class="flex pt-6 pb-2 pl-8 pr-4 border-gray-400 focus:border-blue-400 w-full bg-white border text-left cursor-default focus:outline-none sm:text-sm">
                        <span class="flex items-center space-x-3">
                            {{ numberAdults }} Adultos - {{ numberChilds }} Criancas - {{ numberBebes }} Bebes
                        </span>
                        <ChevronDown class="ml-3 absolute right-0 pr-2 pointer-events-none" />
                    </button>
                    <Transition name="fade">
                        <div class="bg-white absolute mt-4 z-30" v-if="hiddenDropdown" v-click-outside>
                            <PassengersInput age="+16 anos" @takeOff="takeOffAdults()" @addUp="addUpfAdults()"
                                label="Adultos" v-model="numberAdults" />
                            <PassengersInput age="4-15 anos" @takeOff="takeOffChilds()" @addUp="addUpfChilds()"
                                label="Adolescentes" v-model="numberChilds" />
                            <PassengersInput age="1-3 anos" @takeOff="takeOffBebes()" @addUp="addUpfBebes()"
                                label="Ninos" v-model="numberBebes" />
                            <div class="divide-x"></div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'

/** COMPONENTS */
import ChevronDown from "@/components/Icons/ChevronDown.vue"
import PassengersInput from "@/components/FormUI/PassengersInput.vue"

/** EMITS */
const emit = defineEmits(['passengers'])

/** VARIABLES */
const hiddenDropdown = ref(false);

const numberAdults = ref(1)
const numberChilds = ref(0)
const numberBebes = ref(0)

const dropdownP = ref(null)

/** PROPS */
const props = defineProps({
    label: {
        type: String,
        default: "",
    }
})

/** DIRECTIVES */
const vClickOutside = {
    mounted: () => {
        document.addEventListener("click", clickOutListener);
    },
    unmounted: () => {
        document.removeEventListener('click', clickOutListener);
    }
}

/** METHODS */

const clickOutListener = (evt) => {
    if (!dropdownP.value.contains(evt.target)) {
        hide()
    }

}

const show = () => {
    hiddenDropdown.value = true
}

const hide = () => {
    let passengers = {
        numberAdults: numberAdults.value,
        numberChilds: numberChilds.value,
        numberBebes: numberBebes.value
    }

    emit('passengers', passengers)
    hiddenDropdown.value = false
}

const takeOffAdults = () => {
    if (numberAdults.value > 1) {
        numberAdults.value--
    }
}
const addUpfAdults = () => {
    if (numberAdults.value < 8) {
        numberAdults.value++
    }
}

const takeOffChilds = () => {
    if (numberChilds.value > 0) {
        numberChilds.value--
    }
}
const addUpfChilds = () => {
    if (numberChilds.value < 8) {
        numberChilds.value++
    }
}


const takeOffBebes = () => {
    if (numberBebes.value > 0) {
        numberBebes.value--
    }
}
const addUpfBebes = () => {
    if (numberBebes.value < 8) {
        numberBebes.value++
    }
}


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>