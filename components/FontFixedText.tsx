import { StyleSheet, Text } from "react-native"

const CUSTOM_FONT_FAMILIES = ["Nunito", "Mulish"]

export const FixedFontText = ({ style, ...restProps }: Text["props"]) => {
  const flatStyle = StyleSheet.flatten(style)
  if (flatStyle.fontFamily === undefined) {
    flatStyle.fontFamily = "Nunito"
  }
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
      "_" +
      (!isBold && !isItalic
        ? "regular"
        : isBold && !isItalic
        ? "bold"
        : !isBold && isItalic
        ? "italic"
        : "bold_italic")
  }

  return <Text {...restProps} style={flatStyle} />
}
