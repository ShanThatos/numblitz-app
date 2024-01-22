import { FullFlexColCenter, Text } from "../../../components/base"
import ThemedAvatar from "../../../components/socials/ThemedAvatar"
import { useUser } from "../../../contexts/user"

export default function ProfileIndex() {
  const { loadingUser, user } = useUser()

  if (loadingUser || !user)
    return (
      <FullFlexColCenter>
        <Text>Loading...</Text>
      </FullFlexColCenter>
    )

  console.log(user)

  return (
    <FullFlexColCenter>
      <ThemedAvatar size={100} name={user.name} />
    </FullFlexColCenter>
  )
}
