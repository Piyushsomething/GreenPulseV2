import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  authToken: Cookies.get('access_token_login') || null,
  isAdmin: Cookies.get('IsAdmin') === 'true',
  validUser: !!Cookies.get('access_token_login'),
  setAuth: (token, isAdmin) => {
    Cookies.set('access_token_login', token, { path: '/' });
    Cookies.set('IsAdmin', isAdmin, { path: '/' });
    set({ authToken: token, isAdmin, validUser: true });
  },
  resetAuth: () => {
    Cookies.remove('access_token_login');
    Cookies.remove('IsAdmin');
    set({ authToken: null, isAdmin: false, validUser: false });
  },
}));

export default useAuthStore;
