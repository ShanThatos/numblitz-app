import { Link } from "expo-router"

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

export default function SignInIndex() {
  return (
    <>
      <FlexRowCenter className="mt-[30vh]">
        <Image
          className="mr-2 aspect-square w-10"
          source={require("../../assets/icon.png")}
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
        <Link href="/" asChild>
          <Pressable>
            <Text className="text-slate-600">I'll sign in later</Text>
          </Pressable>
        </Link>
      </FullFlexColCenter>
    </>
  )
}
