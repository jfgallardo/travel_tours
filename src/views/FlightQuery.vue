<template>
  <div>
    <ButtonFilter />
    <br />

    <div class="grid grid-cols-4 grid-rows-1 gap-4">
      <div class="col-span-3">
        <div class="font-semibold border p-4">5 vuelos de ida - 25 sep</div>
        <Flight />
        <Flight />
      </div>
      <div class="grid grid-cols-1 grid-rows-3 gap-3 content-start">
        <div class="mt-5">
          <div class="space-y-3 text-sm font-light">
            <p class="flex items-center justify-between">
              <span>1 Oferta</span> <span>$300</span>
            </p>
            <p class="flex items-center justify-between">
              <span>Passageiros</span> <span>5</span>
            </p>
            <p class="flex items-center justify-between">
              <span>Taxas y encargos</span> <span>$115</span>
            </p>
            <p class="flex items-center justify-between">
              <span>Subtotal</span> <span>$1615</span>
            </p>
            <p class="flex items-center justify-between text-red-500">
              <span>Descuento (-30%)</span>
              <span>-$484</span>
            </p>
            <p class="flex items-center justify-between">
              <span>Total</span> <span class="text-3xl font-bold">$1131</span>
            </p>
          </div>
        </div>
        <div class="bg-red-400"></div>
        <div>
          <button class="bg-black text-white w-full py-2">Comprar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonFilter from "@/components/FlightQuery/ButtonFilter.vue";
import Flight from "@/components/FlightQuery/FlightComponent.vue";
</script>

<style scoped></style>
