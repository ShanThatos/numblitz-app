import { Platform, StyleSheet, Text } from "react-native"

const CUSTOM_FONT_FAMILY = {
  regular: "Nunito_500Medium",
  bold: "Nunito_700Bold",
  italic: "Nunito_500Medium_Italic",
  boldItalic: "Nunito_700Bold_Italic",
}
const BOLD_FONT_WEIGHT_REGEX = /"(font(?:-w|W)eight)":("(?:[789]00|bold)")/
const ITALIC_FONT_STYLE_REGEX = /"(font(?:-s|S)tyle)":("italic")/

const hasStyleProp = (tester: RegExp) => (style: Text["props"]["style"]) =>
  style ? tester.test(JSON.stringify(style)) : false
const hasBoldFontProp = hasStyleProp(BOLD_FONT_WEIGHT_REGEX)
const hasItalicFontProp = hasStyleProp(ITALIC_FONT_STYLE_REGEX)

const makeFontFamilyPropFix = (style: Text["props"]["style"]) =>
  Platform.OS === "ios"
    ? {
        fontFamily:
          hasBoldFontProp(style) && hasItalicFontProp(style)
            ? CUSTOM_FONT_FAMILY.boldItalic
            : hasBoldFontProp(style)
            ? CUSTOM_FONT_FAMILY.bold
            : hasItalicFontProp(style)
            ? CUSTOM_FONT_FAMILY.italic
            : CUSTOM_FONT_FAMILY.regular,
      }
    : {
        fontFamily: CUSTOM_FONT_FAMILY.regular,
      }

export const FixedFontText = ({ style, ...restProps }: Text["props"]) => {
  return (
    <Text
      {...restProps}
      style={StyleSheet.flatten([style, makeFontFamilyPropFix(style)])}
    />
  )
}
