import { StatusBar } from "expo-status-bar"

import { Text, View } from "../components/base"

export default function Index() {
  return (
    <View className="flex-1 flex-col items-center justify-center bg-[#dbadad] font-sans">
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}
