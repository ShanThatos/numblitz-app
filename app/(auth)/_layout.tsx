import { Redirect } from "expo-router"
import { useAuth } from "pocketbase-react"

import { FullCenter, Text } from "../../components/base"

export default function AuthLayout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />
  }

  return (
    <FullCenter>
      <Text>Hello there!</Text>
    </FullCenter>
  )
}
