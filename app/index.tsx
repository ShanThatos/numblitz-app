import { Redirect } from "expo-router"
import { useEffect, useState } from "react"

import Storage from "../utils/Storage"

export default function Index() {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)

  useEffect(() => {
    Storage.getItem("nb-jwt-token").then((token) => {
      // TODO: validate token
      setIsSignedIn(token !== null)
    })
  }, [])

  if (isSignedIn === null) return null

  if (isSignedIn) return <Redirect href="/home" />

  return <Redirect href="/sign-in" />
}
