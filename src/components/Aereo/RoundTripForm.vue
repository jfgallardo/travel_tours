<template>
    <div>
        <div class="mt-5 flex flex-col space-y-2">
            <div>
                <AutoComplete label="De" :value="origem.string" @input="(e) => { origem.string = e }"
                    @select="(s) => { origem.iata = s }" />
            </div>
            <div class="flex justify-center">
                <div class="flex items-center justify-center cursor-pointer w-10" @click="changeDestinations">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700 -mr-1" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </div>
            </div>

            <div>
                <AutoComplete label="Para" :value="destino.string" @input="(e) => { destino.string = e }"
                    @select="(s) => { destino.iata = s }" />
            </div>

            <div class="grid grid-cols-2 grid-rows-1 pt-4">
                <DateInput v-model="flightDates.departureDate" label="Ida" />
                <DateInput v-model="flightDates.returnDate" label="Vuelta" :dateMin="notBeforeDate()" />
            </div>

            <div>
                <Select class="pt-4" label="Clases de cabina" :options="options"
                    @selectValue="(e) => { cabine = e.value }" />
            </div>

            <div>
                <Passengers @passengers="setPassengers($event)" label="Pasajeros" />
            </div>

            <div>
                <Check class="pt-4" label="Adicionar areopuertos cercanos" />
                <Check label="Apenas vuelos directos" />
                <Check label="Para estudiantes" />
            </div>

            <div>
                <button class="bg-blue-700 relative w-full py-3 px-4 text-white">
                    Buscar pasaje
                    <ArrowRight fillColor="white" class="absolute right-5 top-3" />
                </button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { defineAsyncComponent, reactive, ref } from 'vue'
import AutoComplete from '@/components/FormUI/AutoComplete.vue';
import TextInput from "@/components/FormUI/TextInput.vue";
import DateInput from "@/components/FormUI/DateInput.vue"
import Select from '@/components/FormUI/TheSelect.vue';
import Check from "@/components/FormUI/CheckInput.vue"
import Passengers from '@/components/FormUI/ThePassengers.vue';
import ArrowRight from "@/components/Icons/ArrowRight.vue"

/* 


const ArrowRight = defineAsyncComponent(() => import("@/components/icons/ArrowRight.vue")) */



const origem = reactive({
    string: '',
    iata: ''
})

const destino = reactive({
    string: '',
    iata: ''
})

const flightDates = reactive({
    departureDate: '',
    returnDate: ''
})

const cabine = ref("")

const numberAdults = ref("1")
const numberChilds = ref("")
const numberBebes = ref("")

const setPassengers = (val) => {
    numberAdults.value = val.numberAdults
    numberChilds.value = val.numberChilds
    numberBebes.value = val.numberBebes
}

const changeDestinations = () => {
    let temporaryString = origem.string
    let temporaryIata = origem.iata

    origem.string = destino.string
    origem.iata = destino.iata

    destino.string = temporaryString
    destino.iata = temporaryIata

}

const notBeforeDate = () => {
    return flightDates.departureDate
}

const options = [
    { name: "Econômica", value: "Y", src: "https://cdn1.iconfinder.com/data/icons/picons-social/57/social_visa_round-512.png", },
    { name: "Econômica Premium", value: "W", src: "https://cdn1.iconfinder.com/data/icons/picons-social/57/social_visa_round-512.png", },
    { name: "Executiva", value: "C", src: "https://cdn1.iconfinder.com/data/icons/picons-social/57/social_visa_round-512.png", },
    { name: "Primeira Classe", value: "F", src: "https://cdn1.iconfinder.com/data/icons/picons-social/57/social_visa_round-512.png", },
    { name: "Econômica + Premium", value: "P", src: "https://cdn1.iconfinder.com/data/icons/picons-social/57/social_visa_round-512.png", },
]

</script>
<style scoped>
</style>