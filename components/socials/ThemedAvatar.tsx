import Avatar from "react-native-boring-avatars"

import { getColor } from "../../contexts/theme"

type ThemedAvatarProps = Pick<
  React.ComponentProps<typeof Avatar>,
  "size" | "name"
>

export default function ThemedAvatar(props: ThemedAvatarProps) {
  return (
    <Avatar
      {...props}
      variant="beam"
      colors={[
        getColor("primary-300"),
        getColor("primary-800"),
        getColor("icon"),
        getColor("icon-darker"),
      ]}
    />
  )
}
