import { useCallback, useEffect, useState } from "react"

import { FetchOptions, authFetch } from "../utils/Query"

export const useAuthFetch = <T = object>(
  url: string,
  options: FetchOptions = {},
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setData(await authFetch(url, options))
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [])

  return { loading, data, refresh }
}

export const useAuthFetchGet = <T = object>(
  url: string,
  options: FetchOptions = {},
) => {
  return useAuthFetch<T>(url, { ...options, method: "GET" })
}

export const useAuthFetchPost = <T = object>(
  url: string,
  options: FetchOptions = {},
) => {
  return useAuthFetch<T>(url, { ...options, method: "POST" })
}
