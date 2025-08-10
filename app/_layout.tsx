import { useProtectedRoute } from "@/features/authentication/auth.guard";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Theme, useThemeStore } from "@/store";
import { config } from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";
import * as SplashScreen from "expo-splash-screen";
import { ToastProvider } from "@tamagui/toast";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() as Theme;
  const { storageTheme, loadTheme } = useThemeStore();

  React.useEffect(() => {
    loadTheme();
  }, []);

  const theme = storageTheme === "system" ? colorScheme : storageTheme;

  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <ToastProvider>
            <App />
            <StatusBar style="auto" hidden={true} />
          </ToastProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

function App() {
  useProtectedRoute();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
