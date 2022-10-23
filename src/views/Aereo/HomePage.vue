<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:grid-rows-1 md:gap-7"> <!-- md:border-b md:border-gray-300 -->
      <div class="md:relative">
        <div class="md:fixed md:w-2/6">
          <div class="border-r border-gray-300 pt-8">
            <div class="grid grid-cols-3 grid-rows-1 px-4">
              <button
                ref="roundtrip"
                @click="changeTab(RoundTrip, roundtrip)"
                class="py-3 border border-gray-400"
              >
                Ida y volta
              </button>
              <button
                ref="go"
                @click="changeTab(OneWay, go)"
                class="py-3 border-y border-gray-400"
              >
                So Ida
              </button>
              <button
                ref="manycities"
                @click="changeTab(ManyCities, manycities)"
                class="py-3 border border-gray-400"
              >
                Varias ciudades
              </button>
            </div>
            <div>
              <component :is="selectedComponent"></component>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, markRaw, onMounted } from 'vue';
import { RouterView } from 'vue-router';

const RoundTrip = defineAsyncComponent(() =>
  import('@/components/Aereo/RoundTripForm.vue')
);
const ManyCities = defineAsyncComponent(() =>
  import('@/components/Aereo/ManyCitiesForm.vue')
);
const OneWay = defineAsyncComponent(() =>
  import('@/components/Aereo/OneWayForm.vue')
);

onMounted(() => {
  selectedComponent.value = markRaw(RoundTrip);
  roundtrip.value.classList.add('active');
});

let selectedComponent = ref(null);

const roundtrip = ref(null);
const go = ref(null);
const manycities = ref(null);

const cleanRefs = () => {
  roundtrip.value.classList.remove('active');
  go.value.classList.remove('active');
  manycities.value.classList.remove('active');
};

const changeTab = (newTab, ref) => {
  cleanRefs();
  ref.classList.add('active');
  selectedComponent.value = markRaw(newTab);
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}
</style>
