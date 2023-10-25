import { Redirect } from "expo-router"

import { FullCenter, Text } from "../../components/base"

export default function AuthLayout() {
  return <Redirect href="/sign-in" />

  // return (
  //   <FullCenter>
  //     <Text>Hello there!</Text>
  //   </FullCenter>
  // )
}
