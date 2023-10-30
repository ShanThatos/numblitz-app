import { router } from "expo-router"
import { useEffect } from "react"

import Storage from "../utils/Storage"

export default function Index() {
  useEffect(() => {
    Storage.getItem("nb-jwt-token").then((token) => {
      // TODO: validate token
      if (token === null) router.replace("/sign-in")
      else router.replace("/home")
    })
  }, [])

  return null
}
