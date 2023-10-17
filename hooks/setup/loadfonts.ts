import {
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/nunito"

export const useLoadedFonts = () => {
  const [fontsLoaded] = useFonts({
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_500Medium_Italic,
    Nunito_700Bold_Italic,
  })

  return [fontsLoaded]
}
