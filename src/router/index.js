import { createRouter, createWebHistory } from "vue-router";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import Landing from "@/views/LandingPage.vue";
import Aereo from "@/views/AereoPage.vue";
import DebitAuthorization from "@/views/DebitAuthorizationPage.vue";
import FlightQuery from "@/views/FlightQuery.vue";
import NotFound from "@/views/NotFound.vue"

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
          children: [
            {
              path: "query/:source/:destiny/:departure_date/:return_date",
              name: "FlightQuery",
              component: FlightQuery,
              /* beforeEnter(to, from) {
                if (!to.params.source || !to.params.destiny || !to.params.departure_date || !to.params.return_date) {
                  return {
                    name: 'Aereo'
                  }
                }
              } */
            },
          ],
        },
        {
          path: "debit/authorization",
          name: "DebitAuthorization",
          component: DebitAuthorization,
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

export default router;
