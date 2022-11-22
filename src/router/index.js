import { createRouter, createWebHistory } from 'vue-router';

const LayoutDefault = () => import('@/layouts/LayoutDefault.vue');
const LayoutAuth = () => import('@/layouts/LayoutAuth.vue');
const LandingPage = () => import('@/views/LandingPage.vue');

const AereoHomePage = () => import('@/views/Aereo/HomePage.vue');
//const AereoFlightQuery = () => import('@/views/Aereo/FlightQuery.vue');
const AereoLandingPage = () => import('@/views/Aereo/LandingPage.vue');
const VoosIdaVolta = () => import('@/views/Aereo/VoosIdaVolta.vue');

const HotelHomePage = () => import('@/views/Hotel/HomePage.vue');
const HotelLandingPage = () => import('@/views/Hotel/LandingPage.vue');

const CruiseHomePage = () => import('@/views/Cruceros/HomePage.vue');
const CruiseLandingPage = () => import('@/views/Cruceros/LandingPage.vue');

const ContractService = () => import('@/views/ContractService.vue');
const NotFound = () => import('@/views/NotFound.vue');

const RegisterPage = () => import('@/views/Auth/RegisterPage.vue');

const ContactPage = () => import('@/views/Static/ContactPage.vue');
const TermsPage = () => import('@/views/Static/TermsPage.vue');
const WhoWeArePage = () => import('@/views/Static/WhoWeArePage.vue');
const PrivacyPage = () => import('@/views/Static/PrivacyPage.vue');
const MainQuestionsPage = () => import('@/views/Static/MainQuestionsPage.vue');
const CarCategoriesPage = () => import('@/views/Static/CarCategoriesPage.vue');

const scrollBehavior = (to, from, savedPosition) => {
  if (to.name === from.name) {
    to.meta?.scrollPos && (to.meta.scrollPos.top = 0);
    return { left: 0, top: 0 };
  }
  const scrollpos = savedPosition || to.meta?.scrollPos || { left: 0, top: 0 };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(scrollpos);
    }, 600);
  });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior,
  routes: [
    {
      path: '/signIn',
      component: LayoutAuth,
      children: [
        { path: 'register', name: 'RegisterPage', component: RegisterPage },
      ],
    },
    {
      path: '/',
      component: LayoutDefault,
      children: [
        {
          path: '',
          name: 'LandingPage',
          component: LandingPage,
          meta: {
            scrollPos: {
              top: 0,
              left: 0,
            },
          },
        },
        {
          path: '/aereo',
          name: 'AereoHomePage',
          component: AereoHomePage,
          children: [
            { path: '', name: 'AereoLandingPage', component: AereoLandingPage },
            {
              path: 'check/round-trip',
              name: 'VoosIdaVolta',
              component: VoosIdaVolta,
            },
          ],
        },
        {
          path: '/hotel',
          name: 'HotelHomePage',
          component: HotelHomePage,
          children: [
            { path: '', name: 'HotelLandingPage', component: HotelLandingPage },
          ],
        },
        {
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
        },
        {
          path: 'contract/service',
          name: 'ContractService',
          component: ContractService,
        },
        {
          path: 'contact',
          name: 'ContactPage',
          component: ContactPage,
          meta: {
            scrollPos: {
              top: 0,
              left: 0,
            },
          },
        },
        {
          path: 'terms',
          name: 'TermsPage',
          component: TermsPage,
          meta: {
            scrollPos: {
              top: 0,
              left: 0,
            },
          },
        },
        {
          path: 'whoWeAre',
          name: 'WhoWeArePage',
          component: WhoWeArePage,
          meta: {
            scrollPos: {
              top: 0,
              left: 0,
            },
          },
        },
        {
          path: 'privacy',
          name: 'PrivacyPage',
          component: PrivacyPage,
          meta: {
            scrollPos: {
              top: 0,
              left: 0,
            },
          },
        },
        {
          path: 'mainQuestions',
          name: 'MainQuestionsPage',
          component: MainQuestionsPage,
          meta: {
            scrollPos: {
              top: 0,
              left: 0,
            },
          },
        },
        {
          path: 'carCategories',
          name: 'CarCategoriesPage',
          component: CarCategoriesPage,
          meta: {
            scrollPos: {
              top: 0,
              left: 0,
            },
          },
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY);
  return next();
});

export default router;
