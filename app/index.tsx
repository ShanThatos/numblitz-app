import { StatusBar } from "expo-status-bar"
import { styled } from "nativewind"
import { View, Text } from "react-native"

const StyledView = styled(View)

export default function Index() {
  return (
    <StyledView className="flex-1 flex-col items-center justify-center bg-[#dbadad]">
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
    </StyledView>
  )
}
