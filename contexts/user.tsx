import * as WebBrowser from "expo-web-browser"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"
// import { URL, URLSearchParams } from "react-native-url-polyfill"

import { API_URL, authFetchGet } from "../utils/Query"
import Storage from "../utils/Storage"

export interface User {
  id: number
  name: string
  email: string
}

interface UserContextType {
  signIn: (
    provider: string,
    redirect: string,
    onSuccess: () => void,
  ) => Promise<void>
  logout?: () => void

  user?: User
  loadingUser: boolean
  refreshUser: () => Promise<void>
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [loadingUser, setLoadingUser] = useState(false)

  const refreshUser = useCallback(async () => {
    const token = await Storage.getItem("nb-jwt-token")
    if (token === null) return
    setLoadingUser(true)
    setUser((await authFetchGet("/user")) as User)
    setLoadingUser(false)
  }, [])

  const signIn = useCallback(
    async (provider: string, redirect: string, onSuccess: () => void) => {
      const baseUrl = API_URL + `/login/${provider}?`
      const url = baseUrl + new URLSearchParams({ redirect }).toString()

      const result = await WebBrowser.openAuthSessionAsync(url)
      if (result.type === "success") {
        const token = new URL(result.url).searchParams.get("token")
        if (token) {
          await Storage.setItem("nb-jwt-token", token)
          await refreshUser()
          onSuccess()
        }
      }
    },
    [],
  )

  return (
    <UserContext.Provider
      value={{
        signIn,
        user,
        loadingUser,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const userContext = useContext(UserContext)
  if (userContext === null)
    throw new Error("useUser must be used within a UserProvider")
  return userContext
}
