import { Platform } from "react-native"

import { useLoadedFonts } from "./loadfonts"

if (Platform.OS === "web") {
  // @ts-ignore
  const ctx = require.context("../../node_modules/.cache/expo/tailwind")
  if (ctx.keys().length) ctx(ctx.keys()[0])
}

export default function useLoadedAssets() {
  const [fontsLoaded] = useLoadedFonts()
  return [fontsLoaded]
}
