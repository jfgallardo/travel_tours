import { createRouter, createWebHistory } from 'vue-router';
import Guard from '@/services/middleware';

const LayoutDefault = () => import('@/layouts/LayoutDefault.vue');
const LayoutAuth = () => import('@/layouts/LayoutAuth.vue');
const LandingPage = () => import('@/views/LandingPage.vue');

const AereoHomePage = () => import('@/views/Aereo/HomePage.vue');
const AereoLandingPage = () => import('@/views/Aereo/LandingPage.vue');
const VoosIdaVolta = () => import('@/views/Aereo/VoosIdaVolta.vue');
const VoosMultiple = () => import('@/views/Aereo/VoosMultiple.vue');
const PreCheckoutPage = () => import('@/views/Purchase/PreCheckoutPage.vue');
const CheckoutPage = () => import('@/views/Purchase/CheckoutPage.vue');
const CheckPage = () => import('@/views/Check/CheckPage.vue');
const RecordPage = () => import('@/views/Check/RecordPage.vue');

const PurchaseFormPage = () => import('@/views/Purchase/PurchaseFormPage.vue');
const HotelHomePage = () => import('@/views/Hotel/HomePage.vue');
const HotelLandingPage = () => import('@/views/Hotel/LandingPage.vue');
const HotelsResults = () => import('@/views/Hotel/HotelsResults.vue');

const VooHome = () => import('@/views/Voo/VooHome.vue');

const CruiseHomePage = () => import('@/views/Cruceros/HomePage.vue');
const CruiseLandingPage = () => import('@/views/Cruceros/LandingPage.vue');

const ContractService = () => import('@/views/ContractService.vue');
const NotFound = () => import('@/views/NotFound.vue');

const RegisterPage = () => import('@/views/Auth/RegisterPage.vue');
const VerifyEmailPage = () => import('@/views/Auth/VerifyEmailPage.vue');
const ForgotPassword = () => import('@/views/Auth/ForgotPassword.vue');

const ContactPage = () => import('@/views/Static/ContactPage.vue');
const TermsPage = () => import('@/views/Static/TermsPage.vue');
const WhoWeArePage = () => import('@/views/Static/WhoWeArePage.vue');
const PrivacyPage = () => import('@/views/Static/PrivacyPage.vue');
const MainQuestionsPage = () => import('@/views/Static/MainQuestionsPage.vue');
const CarCategoriesPage = () => import('@/views/Static/CarCategoriesPage.vue');

const SettingsHomePage = () => import('@/views/Settings/HomePage.vue');

const WaitForPage = () => import('@/components/WaitFor/WaitForComponent.vue')

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
      path: '/register',
      component: LayoutAuth,
      children: [
        {
          path: '',
          name: 'RegisterPage',
          component: RegisterPage,
          beforeEnter: Guard.redirectIfAuth,
        },
        {
          path: 'verify-email',
          name: 'VerifyEmail',
          component: VerifyEmailPage,
          beforeEnter: Guard.redirectIfNotToken,
        },
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: ForgotPassword,
          beforeEnter: Guard.redirectIfAuth,
        },
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
              path: 'flight/availability',
              name: 'VooHome',
              component: VooHome,
            },
            {
              path: 'check/round-trip',
              name: 'VoosIdaVolta',
              component: VoosIdaVolta,
              beforeEnter: Guard.redirectIfNotOutboundFlights,
            },
            {
              path: 'check/multiple',
              name: 'VoosMultiple',
              component: VoosMultiple,
              beforeEnter: Guard.redirectIfNotOutboundFlights,
            },
          ],
        },
        {
          path: 'precheckout/:voo_one?/:voo_two?',
          name: 'PreCheckoutPage',
          component: PreCheckoutPage,
          props: true,
        },
        {
          path: 'checkout',
          name: 'CheckoutPage',
          component: CheckoutPage,
          beforeEnter: Guard.redirectIfNotAuth,
          children: [
            { path: '', name: 'PurchaseFormPage', component: PurchaseFormPage },
            { path: 'finish-payment', name: 'CheckPage', component: CheckPage },
            {
              path: 'finish-payment/record',
              name: 'RecordPage',
              component: RecordPage,
            },
          ],
        },
        {
          path: '/hotel',
          name: 'HotelHomePage',
          component: HotelHomePage,
          children: [
            { path: '', name: 'HotelLandingPage', component: HotelLandingPage },
            { path: 'search', name: 'HotelsResults', component: HotelsResults },
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
        {
          path: '/purchase/progress',
          name: 'WaitForPage',
          component: WaitForPage
        }
      ],
    },
    {
      path: '/settings',
      name: 'SettingsHome',
      component: SettingsHomePage,
      beforeEnter: Guard.redirectIfNotAuth,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY);
  return next();
});

export default router;
