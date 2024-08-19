// authStore.js
import {create} from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => {
  const accessToken = Cookies.get('access_token_login');
  const isAdmin = Cookies.get('IsAdmin') === 'true';

  return {
    authToken: accessToken || null,
    userRole: isAdmin ? true : false,
    userData: null,
    validUser: !!accessToken,
    setAuthToken: (token) => {
      Cookies.set('access_token_login', token, { path: '/' });
      set({ authToken: token, validUser: !!token });
    },
    setUserRole: (role) => {
      Cookies.set('IsAdmin', role, { path: '/' });
      set({ userRole: role, validUser: true });
    },
    setUserData: (data) => set({ userData: data }),
    resetStore: () => {
      Cookies.remove('access_token_login');
      Cookies.remove('IsAdmin');
      set({ authToken: null, userRole: null, userData: null, validUser: false });
    },
  };
});

export default useAuthStore;
