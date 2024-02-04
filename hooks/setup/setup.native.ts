import { SplashScreen } from "expo-router"
import { useEffect } from "react"

import "./devextensions"
import { default as useLoadedAssetsBase } from "./loadassets"

SplashScreen.preventAutoHideAsync()

export default function useLoadedAssets() {
  const [assetsLoaded] = useLoadedAssetsBase()

  useEffect(() => {
    if (assetsLoaded) SplashScreen.hideAsync()
  }, [assetsLoaded])

  return [assetsLoaded]
}
