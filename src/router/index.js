import { createRouter, createWebHistory } from 'vue-router';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import LayoutAuth from '@/layouts/LayoutAuth.vue';
import LandingPage from '@/views/LandingPage.vue';

import AereoHomePage from '@/views/Aereo/HomePage.vue';
import AereoFlightQuery from '@/views/Aereo/FlightQuery.vue';
import AereoLandingPage from '@/views/Aereo/LandingPage.vue';

import HotelHomePage from '@/views/Hotel/HomePage.vue';
import HotelLandingPage from '@/views/Hotel/LandingPage.vue';

import CruiseHomePage from '@/views/Cruceros/HomePage.vue';
import CruiseLandingPage from '@/views/Cruceros/LandingPage.vue';

import ContractService from '@/views/ContractService.vue';
import NotFound from '@/views/NotFound.vue';

import RegisterPage from '@/views/Auth/RegisterPage.vue';

import ContactPage from '@/views/Static/ContactPage.vue';
import TermsPage from '@/views/Static/TermsPage.vue';
import WhoWeArePage from '@/views/Static/WhoWeArePage.vue';
import PrivacyPage from '@/views/Static/PrivacyPage.vue';
import MainQuestionsPage from '@/views/Static/MainQuestionsPage.vue';
import CarCategoriesPage from '@/views/Static/CarCategoriesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    /* {
      path: '/signIn',
      component: LayoutAuth,
      children: [
        { path: 'register', name: 'RegisterPage', component: RegisterPage },
      ],
    }, */
    {
      path: '/',
      component: LayoutDefault,
      children: [
        { path: '', name: 'LandingPage', component: LandingPage },
        /* {
          path: '/aereo',
          name: 'AereoHomePage',
          component: AereoHomePage,
          children: [
            { path: '', name: 'AereoLandingPage', component: AereoLandingPage },
            {
              path: 'query/:source/:destiny/:departure_date/:return_date',
              name: 'AereoFlightQuery',
              component: AereoFlightQuery,
            },
          ],
        }, */
        /* {
          path: '/hotel',
          name: 'HotelHomePage',
          component: HotelHomePage,
          children: [
            { path: '', name: 'HotelLandingPage', component: HotelLandingPage },
          ],
        }, */
        /* {
          path: '/cruise',
          name: 'CruiseHomePage',
          component: CruiseHomePage,
          children: [
            {
              path: '',
              name: 'CruiseLandingPage',
              component: CruiseLandingPage,
            },
          ],
        }, */
        /* {
          path: 'contract/service',
          name: 'ContractService',
          component: ContractService,
        }, */
        {
          path: 'contact',
          name: 'ContactPage',
          component: ContactPage,
        },
        {
          path: 'terms',
          name: 'TermsPage',
          component: TermsPage,
        },
        {
          path: 'whoWeAre',
          name: 'WhoWeArePage',
          component: WhoWeArePage,
        },
        {
          path: 'privacy',
          name: 'PrivacyPage',
          component: PrivacyPage,
        },
        {
          path: 'mainQuestions',
          name: 'MainQuestionsPage',
          component: MainQuestionsPage,
        },
        {
          path: 'carCategories',
          name: 'CarCategoriesPage',
          component: CarCategoriesPage,
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

export default router;
