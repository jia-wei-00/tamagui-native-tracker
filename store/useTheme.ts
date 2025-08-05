import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

interface ThemeStore {
  storageTheme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  storageTheme: "system",
  setTheme: async (storageTheme: Theme) => {
    try {
      await AsyncStorage.setItem("theme", storageTheme);
      set({ storageTheme });
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
      set({ storageTheme });
    }
  },
  loadTheme: async () => {
    try {
      const storedTheme = (await AsyncStorage.getItem("theme")) as Theme;
      if (storedTheme) set({ storageTheme: storedTheme as Theme });
    } catch (error) {
      console.error("Failed to load theme from storage:", error);
    }
  },
}));
