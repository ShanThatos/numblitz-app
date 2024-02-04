import { Image } from "expo-image"
import { MotiView } from "moti"
import { cssInterop } from "nativewind"
import {
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  View,
} from "react-native"
import WebView from "react-native-webview"

import { FontFixedText } from "./FontFixedText"
import { styled } from "../utils/styled"

// Interops
cssInterop(WebView, { className: "style" })
cssInterop(Image, { className: "style" })
cssInterop(MotiView, { className: "style" })

// Settings
const textClasses = "text-base"

// Typography
export const Text = styled(FontFixedText, textClasses)
export const KatexText = styled(Text, "font-Katex")

export const BaseHeader = styled(Text, "font-bold")

export const Header1 = styled(BaseHeader, "text-4xl")
export const Header2 = styled(BaseHeader, "text-3xl")
export const Header3 = styled(BaseHeader, "text-2xl")
export const Header4 = styled(BaseHeader, "text-xl")
export const Header5 = styled(BaseHeader, "text-lg")
export const Header6 = styled(BaseHeader, "text-base")

// Layout
export const FullView = styled(View, "flex-1")

export const FlexRow = styled(View, "flex flex-row")
export const FlexCol = styled(View, "flex flex-col")

export const FullFlexRow = styled(FlexRow, "flex-1")
export const FullFlexCol = styled(FlexCol, "flex-1")

export const FlexRowCenter = styled(FlexRow, "justify-center items-center")
export const FlexColCenter = styled(FlexCol, "justify-center items-center")
export const FullFlexRowCenter = styled(FlexRowCenter, "flex-1")
export const FullFlexColCenter = styled(FlexColCenter, "flex-1")

export const ScrollView = styled(RNScrollView, "flex-1")

// Buttons
export const Pressable = styled(RNPressable, "active:opacity-70")
