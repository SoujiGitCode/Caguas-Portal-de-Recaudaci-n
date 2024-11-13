import { create } from 'zustand';
import { requestLogin } from '@/views/Login/functions';
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: '',
      setLogin: async (email: string, password: string) => {
        const user = await requestLogin({ email, password });
        set(() => ({
          isAuthenticated: true,
          token: user.data.token,
        }));
      },
      setLogout: () => {
        set(() => ({
          isAuthenticated: false,
          token: '',
        }));
      },
    }),
    {
      name: 'user',
    }
  )
);

export default useAuthStore;