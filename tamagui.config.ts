import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
import { builtThemes } from "./themes";

export const config = createTamagui({
  builtThemes,
  ...defaultConfig,
});
