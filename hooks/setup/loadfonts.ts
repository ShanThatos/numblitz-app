import { useFonts } from "expo-font"

export const useLoadedFonts = () => {
  const [fontsLoaded] = useFonts({
    Nunito_regular: require("../../assets/fonts/nunito/Nunito_500Medium.ttf"),
    Nunito_bold: require("../../assets/fonts/nunito/Nunito_700Bold.ttf"),
    Nunito_italic: require("../../assets/fonts/nunito/Nunito_500Medium_Italic.ttf"),
    Nunito_bold_italic: require("../../assets/fonts/nunito/Nunito_700Bold_Italic.ttf"),
    Mulish_regular: require("../../assets/fonts/mulish/Mulish_500Medium.ttf"),
    Mulish_bold: require("../../assets/fonts/mulish/Mulish_700Bold.ttf"),
    Mulish_italic: require("../../assets/fonts/mulish/Mulish_500Medium_Italic.ttf"),
    Mulish_bold_italic: require("../../assets/fonts/mulish/Mulish_700Bold_Italic.ttf"),
    Katex_regular: require("../../assets/fonts/katex/KaTeX_Main-Regular.ttf"),
    Katex_bold: require("../../assets/fonts/katex/KaTeX_Main-Bold.ttf"),
    Katex_italic: require("../../assets/fonts/katex/KaTeX_Main-Italic.ttf"),
    Katex_bold_italic: require("../../assets/fonts/katex/KaTeX_Main-BoldItalic.ttf"),
  })

  return [fontsLoaded]
}
