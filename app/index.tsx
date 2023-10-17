import { StatusBar } from "expo-status-bar"
import { styled } from "nativewind"
import { View, Text } from "react-native"

const StyledView = styled(View)

export default function Index() {
  return (
    <View>
      <StatusBar style="auto" />
      <StyledView className="bg-slate-300 h-full flex flex-col justify-center items-center">
        <Text>Open up App.tsx to start working on your app!</Text>
      </StyledView>
    </View>
  )
}
