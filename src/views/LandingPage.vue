<template>
  <Hero />
  <Banner />
  <ExplorerVoo />
  <ExplorerHotel />
  <CaRentals />
  <CarCategories />
  <ExecutiveTaxi />
  <ExplorerCruzeiro />
  <SeguroViage />
  <BannerIngresos />
  <Miles />
  <PackTourist />
  <Blog />
  <CommunityHero />
  <CommunityTrips />
  <CommunityTravelerPhotos />
  <CommunityFeedback />
  <Instagram />
  <Greeting />
</template>

<script setup>
import { onMounted } from 'vue';
import Hero from '@/components/Landing/LandingHero.vue';
import Banner from '@/components/Landing/LandingBanner.vue';
import ExplorerVoo from '@/components/Landing/LandingExplorerVoo.vue';
import ExplorerHotel from '@/components/Landing/LandingExplorerHotel.vue';
import CaRentals from '@/components/Landing/LandingCaRentals.vue';
import CarCategories from '@/components/Landing/LandingCarCategories.vue';
import ExecutiveTaxi from '@/components/Landing/LandingExecutiveTaxi.vue';
import ExplorerCruzeiro from '@/components/Landing/LandingExplorerCruzeiro.vue';
import SeguroViage from '@/components/Landing/LandingSeguroViage.vue';
import BannerIngresos from '@/components/Landing/LandingBannerIngresos.vue';
import Miles from '@/components/Landing/LandingMiles.vue';
import PackTourist from '@/components/Landing/LandingPackTourist.vue';
import Blog from '@/components/Landing/LandingBlog.vue';
import CommunityHero from '@/components/Landing/LandingCommunityHero.vue';
import CommunityTrips from '@/components/Landing/LandingCommunityTrips.vue';
import CommunityTravelerPhotos from '@/components/Landing/LandingCommunityTravelerPhotos.vue';
import CommunityFeedback from '@/components/Landing/LandingCommunityFeedback.vue';
import Instagram from '@/components/Landing/LandingInstagram.vue';
import Greeting from '@/components/Landing/LandinGreeting.vue';
import { useSearchOptionsVooStore } from '@/stores/searchOptionsVoo';
import { useSearchOptionsHotelStore } from "@/stores/searchOptionsHotel";

const searchOptionsVooStore = useSearchOptionsVooStore();
const searchOptionsHotelStore = useSearchOptionsHotelStore();
onMounted(() => {
  searchOptionsVooStore.resetState();
  searchOptionsHotelStore.resetState();
});
</script>

<style scoped></style>
