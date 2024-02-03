import * as Linking from "expo-linking"
import { router } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import { useCallback } from "react"

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
import SocialButton from "../../components/socials/SocialButton"
import { useUser } from "../../contexts/user"

WebBrowser.maybeCompleteAuthSession()

export default function SignInIndex() {
  const { signIn: origSignIn, logout } = useUser()
  const signIn = useCallback(
    async (provider: string) => {
      await origSignIn(provider, Linking.createURL("/sign-in"), () => {
        router.replace("/")
      })
    },
    [origSignIn],
  )

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
            await logout()
            router.replace("/home")
          }}
        >
          <Text className="text-slate-600">I'll sign in later</Text>
        </Pressable>
      </FullFlexColCenter>
    </FullView>
  )
}
