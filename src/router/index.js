import { createRouter, createWebHistory } from "vue-router";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import Landing from "@/views/LandingPage.vue";
import Aereo from "@/views/AereoPage.vue";
import DebitAuthorization from "@/views/DebitAuthorizationPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LayoutDefault,
      children: [
        { path: "", name: "Landing", component: Landing },
        {
          path: "aereo",
          name: "Aereo",
          component: Aereo,
        },
        {
          path: "debit/authorization",
          name: "DebitAuthorization",
          component: DebitAuthorization,
        },
      ],
    },
  ],
});

export default router;
