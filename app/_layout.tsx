import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { View } from "../components/base"
import useLoadedAssets from "../hooks/setup/setup"

export default function App() {
  const [assetsLoaded] = useLoadedAssets()

  if (!assetsLoaded) return null

  return (
    <View className="flex-1 flex-col bg-slate-500">
      <StatusBar style="auto" />
      <Slot />
    </View>
  )
}
