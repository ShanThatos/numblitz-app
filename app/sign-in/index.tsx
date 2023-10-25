import {
  FlexColCenter,
  FlexRowCenter,
  Header1,
  Image,
} from "../../components/base"
import GoogleButton from "../../components/socialbuttons/GoogleButton"

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
        <GoogleButton />
      </FlexColCenter>
    </>
  )
}
