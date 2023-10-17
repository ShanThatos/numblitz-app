import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { FullView } from "../components/base"
import { PocketProvider } from "../contexts/PocketContext"
import useLoadedAssets from "../hooks/setup/setup"

export default function AppLayout() {
  const [assetsLoaded] = useLoadedAssets()

  if (!assetsLoaded) return null

  return (
    <PocketProvider>
      <FullView className="bg-red-100">
        <StatusBar style="auto" />
        <Slot />
      </FullView>
    </PocketProvider>
  )
}
