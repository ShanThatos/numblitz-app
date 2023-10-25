import { Image as RNImage } from "expo-image"
import { styled } from "nativewind"
import { View as RNView, Pressable as RNPressable } from "react-native"

import { FixedFontText } from "./FontFixedText"

// Settings
const textClasses = "font-sans text-base"

// Typography
export const Text = styled(FixedFontText, textClasses)

export const BaseHeader = styled(Text, "font-bold")

export const Header1 = styled(BaseHeader, "text-4xl")
export const Header2 = styled(BaseHeader, "text-3xl")
export const Header3 = styled(BaseHeader, "text-2xl")
export const Header4 = styled(BaseHeader, "text-xl")
export const Header5 = styled(BaseHeader, "text-lg")
export const Header6 = styled(BaseHeader, "text-base")

// Assets
export const Image = styled(RNImage)

// Layout
export const View = styled(RNView)
export const FullView = styled(View, "flex-1")

export const FlexRow = styled(View, "flex flex-row")
export const FlexCol = styled(View, "flex flex-col")

export const FullFlexRow = styled(FlexRow, "flex-1")
export const FullFlexCol = styled(FlexCol, "flex-1")

export const FlexRowCenter = styled(FlexRow, "justify-center items-center")
export const FlexColCenter = styled(FlexCol, "justify-center items-center")
export const FullFlexRowCenter = styled(FlexRowCenter, "flex-1")
export const FullFlexColCenter = styled(FlexColCenter, "flex-1")

// Buttons
export const Pressable = styled(RNPressable, "active:opacity-70")
