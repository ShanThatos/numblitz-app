import { Slot } from "expo-router"
import { NativeWindStyleSheet } from "nativewind"

import useLoadedAssets from "../hooks/setup/setup"

NativeWindStyleSheet.setOutput({ default: "native" })

export default function App() {
  const [assetsLoaded] = useLoadedAssets()

  if (!assetsLoaded) return null

  return <Slot />
}
