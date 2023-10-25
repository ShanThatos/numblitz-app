import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { FullView } from "../components/base"
import useLoadedAssets from "../hooks/setup/setup"

export default function AppLayout() {
  const [assetsLoaded] = useLoadedAssets()

  if (!assetsLoaded) return null

  return (
    <FullView className="bg-[#FFF2F3]">
      <StatusBar style="auto" />
      <Slot />
    </FullView>
  )
}
