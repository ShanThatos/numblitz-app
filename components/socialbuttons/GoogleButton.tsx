import { Image, Text, TouchableOpacity } from "../base"

interface GoogleButtonProps {
  onPress?: () => void
}

export default function GoogleButton(props: GoogleButtonProps) {
  return (
    <TouchableOpacity
      className="flex flex-row rounded border border-neutral-200 bg-white px-5 py-2.5 shadow-sm"
      onPress={props.onPress}
    >
      <Image
        className="aspect-square w-6"
        source={require("../../assets/images/socials/google.png")}
      />
      <Text className="ml-2 leading-none">Continue with Google</Text>
    </TouchableOpacity>
  )
}
