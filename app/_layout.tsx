import { Slot } from "expo-router"

import useLoadedAssets from "../hooks/setup/setup"

export default function App() {
  const [assetsLoaded] = useLoadedAssets()

  if (!assetsLoaded) return null

  return <Slot />
}
