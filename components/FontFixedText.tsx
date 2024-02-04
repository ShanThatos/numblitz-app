import { cssInterop } from "nativewind"
import { StyleSheet, Text, TextStyle } from "react-native"

const CUSTOM_FONT_FAMILIES = ["Nunito", "Mulish", "Katex"]

export const FontFixedText = ({ style, ...restProps }: Text["props"]) => {
  const flatStyle = StyleSheet.flatten([
    style,
    { userSelect: "none" },
  ]) as TextStyle

  if (flatStyle.fontFamily === undefined) flatStyle.fontFamily = "Nunito"

  if (CUSTOM_FONT_FAMILIES.includes(flatStyle.fontFamily)) {
    const fontFamily = flatStyle.fontFamily
    const fontWeight = flatStyle.fontWeight ?? "normal"
    const fontStyle = flatStyle.fontStyle ?? "normal"

    const isBold =
      fontWeight === "bold" ||
      (fontWeight !== "normal" && parseInt(fontWeight, 10) > 500)

    const isItalic = fontStyle === "italic"

    flatStyle.fontFamily =
      fontFamily +
      (!isBold && !isItalic
        ? ""
        : isBold && !isItalic
          ? "_bold"
          : !isBold && isItalic
            ? "_italic"
            : "_bold_italic")
  }

  return <Text {...restProps} style={flatStyle} />
}

cssInterop(FontFixedText, {
  className: { target: "style" },
})
