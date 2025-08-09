import { useAuthStore } from "@/store/useAuth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export function useProtectedRoute() {
  const segments = useSegments();
  const { user, isGettingSession, getSession } = useAuthStore();

  /*
  const token = AsyncStorage.getItem("@fabwert_token").then((token) => {
    return token;
  });
  */

  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded && !isGettingSession && !user) {
      getSession();
    }
  }, [loaded, user]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !isGettingSession) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isGettingSession]);

  const inAuthGroup = segments[0] === "(auth)";

  useEffect(() => {
    // Only proceed with navigation logic if:
    // 1. Navigation state is ready
    // 2. Fonts are loaded
    // 3. Auth is not loading
    if (!segments || !loaded || isGettingSession) return;
    
    
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      router.push("/(auth)/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.push("/(tabs)");
    }
  }, [user, inAuthGroup]);
}
