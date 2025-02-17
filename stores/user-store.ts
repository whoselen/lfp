import { create } from "zustand";

export type UserState = {
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export type UserActions = {
  setUserInfo: (userInfo: Partial<UserState>) => void;
  clearUserInfo: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  username: "",
  avatar_url: "",
  bio: "",
};

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  avatar_url: "",
  bio: "",
  setUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),
  clearUserInfo: () =>
    set(() => ({ username: null, avatar_url: null, bio: null })),
}));
