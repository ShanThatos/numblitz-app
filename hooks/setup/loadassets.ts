import { NativeWindStyleSheet } from "nativewind"

import { useLoadedFonts } from "./loadfonts"

// if (Platform.OS === "web") {
//   // @ts-ignore
//   const ctx = require.context("../../node_modules/.cache/expo/tailwind")
//   if (ctx.keys().length) ctx(ctx.keys()[0])
// }

NativeWindStyleSheet.setOutput({
  web: "native",
  default: "native",
})

export default function useLoadedAssets() {
  const [fontsLoaded] = useLoadedFonts()
  return [fontsLoaded]
}
