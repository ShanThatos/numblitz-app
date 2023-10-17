import {
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/nunito"

export const useLoadedFonts = () => {
  const [fontsLoaded] = useFonts({
    Nunito: Nunito_500Medium,
    Nunito_bold: Nunito_700Bold,
    Nunito_italic: Nunito_500Medium_Italic,
    Nunito_bold_italic: Nunito_700Bold_Italic,
  })

  return [fontsLoaded]
}
