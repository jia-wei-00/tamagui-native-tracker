import { useColorScheme } from "@/hooks/useColorScheme";
import { Theme, useThemeStore } from "@/store";
import { config } from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
  const colorScheme = useColorScheme() as Theme;
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { storageTheme, loadTheme } = useThemeStore();

  React.useEffect(() => {
    loadTheme();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const theme = storageTheme === "system" ? colorScheme : storageTheme;

  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
