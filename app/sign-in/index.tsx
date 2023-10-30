import { Redirect, router } from "expo-router"
import { useEffect, useState } from "react"

import {
  FlexColCenter,
  FlexRowCenter,
  FullFlexColCenter,
  Header1,
  Image,
  Pressable,
  Text,
} from "../../components/base"
import SocialButton from "../../components/socialbuttons/SocialButton"
import Storage from "../../utils/Storage"

export default function SignInIndex() {
  const [signInLater, setSignInLater] = useState<boolean | null>(null)

  useEffect(() => {
    Storage.getItem("nb-sign-in-later").then((value) => {
      if (value === null) setSignInLater(false)
      else {
        const current = Date.now()
        setSignInLater(current - parseFloat(value) < 604800)
        Storage.setItem("nb-sign-in-later", current.toString())
      }
    })
  }, [])

  if (signInLater === null) return null

  if (signInLater) return <Redirect href="/home" />

  return (
    <>
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
        <SocialButton variant="google" />
      </FlexColCenter>
      <FullFlexColCenter className="justify-end pb-10 web:justify-start web:pt-32">
        <Pressable
          onPress={async () => {
            await Storage.setItem("nb-sign-in-later", Date.now().toString())
            setSignInLater(true)
            router.replace("/home")
          }}
        >
          <Text className="text-slate-600">I'll sign in later</Text>
        </Pressable>
      </FullFlexColCenter>
    </>
  )
}
