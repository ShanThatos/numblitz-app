import { NativeWindStyleSheet } from "nativewind"

import { useLoadedFonts } from "./loadfonts"

NativeWindStyleSheet.setOutput({
  default: "native",
})

export default function useLoadedAssets() {
  const [fontsLoaded] = useLoadedFonts()
  return [fontsLoaded]
}
