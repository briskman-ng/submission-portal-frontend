import { CurrentUser } from "@/types/admin/current-user.type";
import { create } from "zustand";

interface AdminUserState {
  user: CurrentUser | null;
  updateUser: (user: CurrentUser | null) => void;
}

const useAdminUserStore = create<AdminUserState>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user: user })),
}));

export default useAdminUserStore;
