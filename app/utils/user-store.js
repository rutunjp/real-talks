import { create } from "zustand";

const userStore = create((set) => ({
  user: "",
  setUser: (newUser) => set(() => ({ user: newUser })),
  signOut: () => set({ user: "" }),
}));
export default userStore;
