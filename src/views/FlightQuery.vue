<template>

  <div v-if="moblixStore.loading">
    <div>
      Loading........
    </div>
  </div>

  <div v-else class="pr-5">
    <div class="py-5">
      <ButtonFilter />
    </div>

    <div>
      <span class="font-bold">{{ resultCount }} Resultados</span>
    </div>

    <div>
      <div class="flex flex-row mt-2 space-x-2">
        <div class="basis-9/12 border border-gray-300">
          <div class="border-b py-2">
            <span class="px-4 font-medium">{{ moblixStore.outboundFlights.length }} Vuelos de Ida</span>
          </div>

          <div>
            <div>
              <RenderFlights :flights="moblixStore.outboundFlights" />
            </div>
          </div>
        </div>
        <div class="basis-3/12 border border-gray-300">
          <FlightDetalhes />
        </div>
      </div>

      <div class="flex flex-row space-x-2">
        <div class="basis-9/12 border border-t-0 border-gray-300">
          <div class="border-b py-2">
            <span class="px-4 font-medium">{{ moblixStore.returnFlights.length }} Vuelos de Vuelta</span>
          </div>

          <div>
            <div>
              <RenderFlights :flights="moblixStore.returnFlights" />
            </div>
          </div>
        </div>
        <div class="basis-3/12 border border-gray-300">
          <FlightDetalhes />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import ButtonFilter from "@/components/FlightQuery/ButtonFilter.vue"
import FlightDetalhes from "@/components/FlightQuery/FlightDetalhes.vue"
import RenderFlights from "@/components/FlightQuery/RenderFlights.vue"
import { useMoblixStore } from "@/stores/moblix"
import { onUnmounted, onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'


const moblixStore = useMoblixStore();
const route = useRoute();

onMounted(() => {
  search();
})

const resultCount = computed(() => {
  return moblixStore.outboundFlights.length + moblixStore.returnFlights.length
})

onUnmounted(() => moblixStore.clear())

const search = () => {
  let payload = {
    "Origem": route.params.source,
    "Destino": route.params.destiny,
    "Ida": route.params.departure_date,
    "Volta": route.params.return_date,
    "Adultos": route.query.adults,
    "Criancas": route.query.childs,
    "Bebes": route.query.bebes,
    "Companhia": route.query.company
  }
  moblixStore.consultaAereo(payload)
}

</script>

<style scoped>
</style>


<!-- <div v-if="moblixStore.loading">
    <div>
      Loading........
    </div>
  </div>
  <div v-else>
    <ButtonFilter />
    <br />
    <div class="grid grid-cols-4 grid-rows-1 gap-4 border">
      <div class="col-span-3">
        <RenderFlights :flights="moblixStore.outboundFlights" />
        <RenderFlights :flights="moblixStore.returnFlights"/>
      </div>
      <div class="flex flex-col space-y-6">
        <FlightDetalhes v-if="selectOutboundFlights" />
        <FlightDetalhes v-if="selectReturnFlights" />
      </div>
    </div>
  </div> -->