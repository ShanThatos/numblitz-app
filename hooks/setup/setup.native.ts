import { SplashScreen } from "expo-router"
import { useEffect } from "react"

import { default as useLoadedAssetsBasic } from "./loadassets"

SplashScreen.preventAutoHideAsync()

export default function useLoadedAssets() {
  const [assetsLoaded] = useLoadedAssetsBasic()

  useEffect(() => {
    if (assetsLoaded) SplashScreen.hideAsync()
  }, [assetsLoaded])

  return [assetsLoaded]
}
