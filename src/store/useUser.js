import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const useUser = create(
  devtools(
    persist(
      (set) => ({
        user: {},
        token: 'INI TOKEN',
        isLogin: false,

        setUser: (data) => set(() => ({ user: data })),
        setIsLogin: set(() => ({ isLogin: true })),
        removeUser: set(() => ({ user: {}, isLogin: false }), true),
      }),
      {
        name: 'user',
        getStorage: () => localStorage,
      }
    )
  )
);

export default useUser;
