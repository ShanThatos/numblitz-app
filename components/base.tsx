import { styled } from "nativewind"
import { Text as RNText, View as RNView } from "react-native"

const textClasses = "font-sans"

export const View = styled(RNView)

export const Text = styled(RNText, textClasses)
