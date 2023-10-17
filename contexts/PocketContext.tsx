import * as WebBrowser from "expo-web-browser"
import { Pocketbase } from "pocketbase-react"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { Linking } from "react-native"

interface PocketProviderProps {
  children?: ReactNode
}

// @ts-ignore
const serverURL = process.env.EXPO_PUBLIC_POCKETBASE_URL
const collections: string[] = []
// @ts-ignore
const webRedirectURL = process.env.EXPO_PUBLIC_WEB_URL
// const mobileRedirectURL = "expo://..."

export const PocketProvider = ({ children }: PocketProviderProps) => {
  const [isReady, setIsReady] = useState(false)
  const [mobileRedirectURL, setMobileRedirectURL] = useState("")

  const asyncSetup = useCallback(async () => {
    setMobileRedirectURL((await Linking.getInitialURL()) ?? "")
    setIsReady(true)
  }, [])

  useEffect(() => {
    asyncSetup()
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <Pocketbase
      serverURL={serverURL}
      initialCollections={collections}
      webRedirectUrl={webRedirectURL}
      mobileRedirectUrl={mobileRedirectURL}
      openURL={async (url) => {
        // for example expo WebBrowser
        await WebBrowser.openBrowserAsync(url)
      }}
    >
      {children}
    </Pocketbase>
  )
}
