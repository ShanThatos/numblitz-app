import _ from "lodash"
import { PressableProps } from "react-native"

import { Header5, Image, Pressable } from "../base"

const Variants = {
  google: {
    classes: "border-neutral-200 bg-white",
    image: require("../../assets/images/socials/google.png"),
  },
}

interface SocialButtonProps extends PressableProps {
  variant: keyof typeof Variants
}

export default function SocialButton({
  className,
  variant,
  ...props
}: SocialButtonProps) {
  const { classes, image } = Variants[variant]
  return (
    <Pressable
      className={`flex flex-row rounded-md border px-5 py-2.5 shadow hover:shadow-md ${classes} ${className}`}
      {...props}
    >
      <Image className="aspect-square w-8" source={image} />
      <Header5 className="ml-2 self-center leading-none">{`Continue with ${_.startCase(
        variant,
      )}`}</Header5>
    </Pressable>
  )
}
