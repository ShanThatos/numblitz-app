import * as Linking from "expo-linking"
import { router } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import { useCallback } from "react"
import { URL, URLSearchParams } from "react-native-url-polyfill"

import {
  FlexColCenter,
  FlexRowCenter,
  FullFlexColCenter,
  FullView,
  Header1,
  Image,
  Pressable,
  Text,
} from "../../components/base"
import SocialButton from "../../components/socialbuttons/SocialButton"
import { API_URL } from "../../utils/Query"
import Storage from "../../utils/Storage"

WebBrowser.maybeCompleteAuthSession()

export default function SignInIndex() {
  const signIn = useCallback(async (provider: string) => {
    const baseUrl = API_URL + `/login/${provider}?`
    const url =
      baseUrl +
      new URLSearchParams({
        redirect: Linking.createURL("/sign-in"),
      }).toString()

    const result = await WebBrowser.openAuthSessionAsync(url)
    if (result.type === "success") {
      const token = new URL(result.url).searchParams.get("token")
      if (token) {
        await Storage.setItem("nb-jwt-token", token)
        router.replace("/")
      }
    }
  }, [])

  return (
    <FullView className="bg-primary">
      <FlexRowCenter className="mt-[30vh]">
        <Image
          className="mr-2 aspect-square w-10"
          source={require("../../assets/icon-rounded.png")}
        />
        <Header1
          className="ios:mt-1 font-[Mulish]"
          style={{ textAlignVertical: "center" }}
        >
          NumBlitz
        </Header1>
      </FlexRowCenter>
      <FlexColCenter className="mt-[3vh]">
        <SocialButton variant="google" signIn={signIn} />
      </FlexColCenter>
      <FullFlexColCenter className="justify-end pb-10 web:justify-start web:pt-32">
        <Pressable
          onPress={async () => {
            await Storage.removeItem("nb-jwt-token")
            router.replace("/home")
          }}
        >
          <Text className="text-slate-600">I'll sign in later</Text>
        </Pressable>
      </FullFlexColCenter>
    </FullView>
  )
}
