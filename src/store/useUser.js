import create from 'zustand';

const useUser = create((set) => ({
  user: {},
  isLogin: false,

  setUser: (data) => set(() => ({ user: data })),
  setIsLogin: set(() => ({ isLogin: true })),
  removeUser: set(() => ({ user: {}, isLogin: false }), true),
}));

export default useUser;
