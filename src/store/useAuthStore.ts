import { create } from "zustand";

interface AuthState {
    isLoggedIn: boolean;
    userId?: string;
    setLogin: (id: string) => void;
    setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    setLogin: (id) => set({ isLoggedIn: true, userId: id }),
    setLogout: () => set({ isLoggedIn: false, userId: undefined }),
}));