import { NativeWindStyleSheet } from "nativewind"
import { Platform } from "react-native"
import eventsource from "react-native-sse"

import { useLoadedFonts } from "./loadfonts"

// @ts-ignore
global.EventSource = eventsource

if (Platform.OS === "web") {
  // @ts-ignore
  const ctx = require.context("../../node_modules/.cache/expo/tailwind")
  if (ctx.keys().length) ctx(ctx.keys()[0])
}

NativeWindStyleSheet.setOutput({ default: "native" })

export default function useLoadedAssets() {
  const [fontsLoaded] = useLoadedFonts()
  return [fontsLoaded]
}
