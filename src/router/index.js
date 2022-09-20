import { createRouter, createWebHistory } from "vue-router";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import Landing from "@/views/LandingPage.vue";
import Aereo from "@/views/AereoPage.vue";
import ContractService from "@/views/ContractService.vue";
import FlightQuery from "@/views/FlightQuery.vue";
import NotFound from "@/views/NotFound.vue";
import AereoLanding from "@/views/AereoLanding.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LayoutDefault,
      children: [
        { path: "", name: "Landing", component: Landing },
        {
          path: "/aereo",
          name: "Aereo",
          component: Aereo,
          children: [
            { path: "", name: "AereoLanding", component: AereoLanding },
            {
              path: "query/:source/:destiny/:departure_date/:return_date",
              name: "FlightQuery",
              component: FlightQuery,
            },
          ],
        },
        {
          path: "contract/service",
          name: "ContractService",
          component: ContractService,
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
