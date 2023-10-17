import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/nunito"

export const useLoadedFonts = () => {
  const [fontsLoaded] = useFonts({
    Nunito: Nunito_400Regular,
    Nunito_bold: Nunito_700Bold,
    Nunito_italic: Nunito_400Regular_Italic,
    Nunito_bold_italic: Nunito_700Bold_Italic,
  })

  return [fontsLoaded]
}
