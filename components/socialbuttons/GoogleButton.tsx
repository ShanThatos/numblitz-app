import { Header5, Image, Pressable } from "../base"

interface GoogleButtonProps {
  onPress?: () => void
}

export default function GoogleButton(props: GoogleButtonProps) {
  return (
    <Pressable
      className="flex flex-row rounded border border-neutral-200 bg-white px-5 py-2.5 shadow-sm hover:shadow"
      onPress={props.onPress}
      onHoverIn={(e) => {
        console.log("hover in")
      }}
      onHoverOut={(e) => {
        console.log("hover out")
      }}
    >
      <Image
        className="aspect-square w-8"
        source={require("../../assets/images/socials/google.png")}
      />
      {/* <Text className="ml-2 leading-none">Continue with Google</Text> */}
      <Header5 className="ml-2 self-center leading-none">
        Continue with Google
      </Header5>
    </Pressable>
  )
}
