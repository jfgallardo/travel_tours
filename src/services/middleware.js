import Cookies from 'js-cookie';
import { useWoobaStore } from '@/stores/wooba';
export default {
  redirectIfAuth(to, from, next) {
    const token = Cookies.get('token');
    let n;
    if (token) {
      n = { name: 'LandingPage' };
    }
    next(n);
  },
  redirectIfNotToken(to, from, next) {
    let n;
    if (!to?.query?.token) {
      n = { name: 'LandingPage' };
    }
    next(n);
  },
  redirectIfNotAuth(to, from, next) {
    const token = Cookies.get('token');
    let n;
    if (!token) {
      n = { name: 'LandingPage' };
    }
    next(n);
  },
  redirectIfNotOutboundFlights(to, from, next) {
    const woobaStore = useWoobaStore();
    let n;
    if (
      from.name !== 'AereoLandingPage' &&
      woobaStore.outboundFlights.length === 0
    ) {
      n = { path: '/aereo' };
    }
    next(n);
  },
};
