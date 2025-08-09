import { useThemeStore } from "@/store";
import { Airplay } from "@tamagui/lucide-icons";
import { Button, XStack, YStack } from "tamagui";
import { useAuthStore } from "@/store/useAuth";

export default function TabTwoScreen(props: any) {
  const { setTheme } = useThemeStore();
  const { signOut } = useAuthStore();

  return (
    <YStack padding="$3" gap="$3" {...props}>
      <Button onPress={() => setTheme("light")}>Light</Button>
      <Button
        onPress={() => setTheme("dark")}
        alignSelf="center"
        icon={Airplay}
        size="$6"
      >
        Dark
      </Button>
      <XStack gap="$2" justifyContent="center">
        <Button size="$3" theme="accent" onPress={() => signOut()}>
          Logout
        </Button>
        <Button size="$3" variant="outlined">
          Outlined
        </Button>
      </XStack>
    </YStack>
  );
}
