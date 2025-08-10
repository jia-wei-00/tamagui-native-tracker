import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeStore } from "@/store";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
  const { storageTheme } = useThemeStore();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        flex: 1,
        backgroundColor: storageTheme === "dark" ? "black" : "white",
      }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: storageTheme === "dark" ? "white" : "black",
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
