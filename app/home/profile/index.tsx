import { router } from "expo-router"
import { View } from "react-native"

import {
  FullFlexColCenter,
  Header3,
  Pressable,
  Text,
} from "../../../components/base"
import ThemedAvatar from "../../../components/socials/ThemedAvatar"
import { useUser } from "../../../contexts/user"

export default function ProfileIndex() {
  const { loadingUser, user } = useUser()

  if (loadingUser)
    return (
      <FullFlexColCenter>
        <Text>Loading...</Text>
      </FullFlexColCenter>
    )

  if (!user) {
    return (
      <FullFlexColCenter>
        <Header3 className="mb-3">Sign in to:</Header3>
        <View className="mb-3">
          <Text>- Save your progress</Text>
          <Text>- Edit your profile</Text>
          <Text>- Create workbooks</Text>
        </View>
        <Pressable
          className="rounded bg-primary-200 px-10 py-1.5 shadow-sm"
          onPress={async () => {
            router.replace("/sign-in")
          }}
        >
          <Text className="text-slate-700">Sign In</Text>
        </Pressable>
      </FullFlexColCenter>
    )
  }

  return (
    <FullFlexColCenter>
      <ThemedAvatar size={100} name={user.name} />
    </FullFlexColCenter>
  )
}
