import { CurrentUser } from "@/types/current-user.type";
import { create } from "zustand";

interface UserState {
  user: CurrentUser | null;
  updateUser: (user: CurrentUser | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user: user })),
}));

export default useUserStore;
