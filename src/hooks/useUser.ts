import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

export interface User {
  userId: string;
  email: string;
}

interface UserStore {
  userId: string;
  email: string;
  setId: (userId: string) => void;
  setEmail: (email: string) => void;
  logout: () => void;
}

const useUser = create<UserStore>()(
  persist(
    (set) => ({
      userId: "",
      email: "",
      setId: (userId) => set({ userId }),
      setEmail: (email) => set({ email }),
      logout: () => {
        Cookies.remove("accessToken");
        set({ userId: "", email: "" });
      },
    }),
    {
      name: "user",
    }
  )
);

export default useUser;
