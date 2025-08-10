import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "../lib/supabase";

interface  AuthStore {
    user:  User |  null;  //type User comes from firebase
    isSigningIn: boolean;
    isSigningOut: boolean;
    isGettingSession: boolean;
    token: string | null;
    setToken: (token: string | null) => void,
    signIn: (email: string, password: string) => Promise<void>,
    signOut: () => Promise<void>,
    getSession: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isSigningIn: false,
    isSigningOut: false,
    isGettingSession: false,
    setToken: (token) => set({ token }),
    signIn: async (email: string, password: string) => {
        try {
            set({ isSigningIn: true });
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.error(error);
            }
            set({ user: data.user, token: data.session?.access_token });
            set({ isSigningIn: false });
        } catch (error) {
            console.error(error);
            set({ isSigningIn: false });
        }
    },
    signOut: async () => {
        try {
            set({ isSigningOut: true });
            await supabase.auth.signOut();
            set({ user: null, token: null });
            set({ isSigningOut: false });
        } catch (error) {
            console.error(error);
            set({ isSigningOut: false });
        }
    },
    getSession: async () => {
        try {
            set({ isGettingSession: true });
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error(error);
            }
            set({ user: data.session?.user, token: data.session?.access_token });
            set({ isGettingSession: false });
        } catch (error) {
            console.error(error);
            set({ isGettingSession: false });
        }
    }
}));
