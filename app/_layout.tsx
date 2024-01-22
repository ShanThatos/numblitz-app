import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { FullFlexColCenter, FullView, Text } from "../components/base"
import { getColor } from "../contexts/theme"
import { UserProvider } from "../contexts/user"
import useLoadedAssets from "../hooks/setup/setup"

export default function AppLayout() {
  const [assetsLoaded] = useLoadedAssets()

  if (!assetsLoaded)
    return (
      <FullFlexColCenter>
        <Text>Loading...</Text>
      </FullFlexColCenter>
    )

  return (
    <FullView className="overflow-hidden">
      <StatusBar style="auto" backgroundColor={getColor("white")} />
      <UserProvider>
        <Slot />
      </UserProvider>
    </FullView>
  )
}
