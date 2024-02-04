import { Image } from "expo-image"
import _ from "lodash"
import { useCallback, useState } from "react"
import { PressableProps } from "react-native"

import { Header5, Pressable } from "../base"

const Variants = {
  google: {
    classes: "border-neutral-200 bg-white",
    image: require("../../assets/images/socials/google.png"),
  },
}

interface SocialButtonProps extends Omit<PressableProps, "onPress"> {
  variant: keyof typeof Variants
  signIn: (provider: keyof typeof Variants) => void | Promise<void>
}

export default function SocialButton({
  className,
  variant,
  signIn,
  ...props
}: SocialButtonProps) {
  const { classes, image } = Variants[variant]
  const [disabled, setDisabled] = useState(false)

  const onPress = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await signIn(variant)
    setDisabled(false)
  }, [variant, signIn])

  return (
    <Pressable
      className={`flex flex-row rounded-md border px-5 py-2.5 shadow hover:shadow-md ${classes} ${className}`}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      <Image className="aspect-square w-8" source={image} />
      <Header5 className="ml-2 self-center">{`Continue with ${_.startCase(
        variant,
      )}`}</Header5>
    </Pressable>
  )
}
