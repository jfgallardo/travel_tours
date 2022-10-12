<template>
  <Hero />
  <Banner />
  <ExplorerVoo />
  <ExplorerHotel />
  <!--   <CaRentals /> -->
  <CarCategories />
  <ExecutiveTaxi />
  <ExplorerCruzeiro />
  <SeguroViage />
  <BannerIngresos />
  <Miles />
  <!--  <PackTourist /> -->
  <!--  <Blog /> -->
  <!-- <CommunityHero />
  <CommunityTrips />
  <CommunityTravelerPhotos />
  <CommunityFeedback />
  <Instagram /> -->
  <Greeting />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const Hero = defineAsyncComponent(() =>
  import('@/components/Landing/LandingHero.vue')
);
const Banner = defineAsyncComponent(() =>
  import('@/components/Landing/LandingBanner.vue')
);
const ExplorerVoo = defineAsyncComponent(() =>
  import('@/components/Landing/LandingExplorerVoo.vue')
);
const ExplorerHotel = defineAsyncComponent(() =>
  import('@/components/Landing/LandingExplorerHotel.vue')
);
/* const CaRentals = defineAsyncComponent(() =>
  import('@/components/Landing/LandingCaRentals.vue')
); */
const CarCategories = defineAsyncComponent(() =>
  import('@/components/Landing/LandingCarCategories.vue')
);
const ExecutiveTaxi = defineAsyncComponent(() =>
  import('@/components/Landing/LandingExecutiveTaxi.vue')
);
const ExplorerCruzeiro = defineAsyncComponent(() =>
  import('@/components/Landing/LandingExplorerCruzeiro.vue')
);
const SeguroViage = defineAsyncComponent(() =>
  import('@/components/Landing/LandingSeguroViage.vue')
);
const BannerIngresos = defineAsyncComponent(() =>
  import('@/components/Landing/LandingBannerIngresos.vue')
);
const Miles = defineAsyncComponent(() =>
  import('@/components/Landing/LandingMiles.vue')
);
/* const PackTourist = defineAsyncComponent(() =>
  import('@/components/Landing/LandingPackTourist.vue')
); */
/* const Blog = defineAsyncComponent(() =>
  import('@/components/Landing/LandingBlog.vue')
); */
/* const CommunityHero = defineAsyncComponent(() =>
  import('@/components/Landing/LandingCommunityHero.vue')
);
const CommunityTrips = defineAsyncComponent(() =>
  import('@/components/Landing/LandingCommunityTrips.vue')
);
const CommunityTravelerPhotos = defineAsyncComponent(() =>
  import('@/components/Landing/LandingCommunityTravelerPhotos.vue')
);
const CommunityFeedback = defineAsyncComponent(() =>
  import('@/components/Landing/LandingCommunityFeedback.vue')
);
const Instagram = defineAsyncComponent(() =>
  import('@/components/Landing/LandingInstagram.vue')
); */
const Greeting = defineAsyncComponent(() =>
  import('@/components/Landing/LandinGreeting.vue')
);
</script>

<style scoped></style>
