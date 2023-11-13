import { router } from "expo-router"
import { useEffect } from "react"

import { FullFlexColCenter, Text } from "../components/base"
import Storage from "../utils/Storage"

export default function Index() {
  useEffect(() => {
    Storage.getItem("nb-jwt-token").then((token) => {
      // TODO: validate token
      if (token === null) router.replace("/sign-in")
      else router.replace("/home")
    })
  }, [])

  return (
    <FullFlexColCenter>
      <Text>Loading...</Text>
    </FullFlexColCenter>
  )
}
