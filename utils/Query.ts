import Storage from "./Storage"

// @ts-ignore
const API_URL = process.env.EXPO_PUBLIC_API_URL

type FetchMethod = "GET" | "POST"

export interface FetchOptions {
  method?: FetchMethod
  params?: Record<string, string>
  body?: object
}

export const authFetch = async (
  url: string,
  { method = "GET", params = {}, body }: FetchOptions,
) => {
  const token = await Storage.getItem("nb-jwt-token")

  if (body !== undefined && method === "GET") {
    throw new Error("Cannot send body with GET request")
  }

  const fullUrl = API_URL + url + new URLSearchParams(params)

  return await (
    await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    })
  ).json()
}

export const authFetchGet = async (url: string, options: FetchOptions) => {
  return await authFetch(url, { ...options, method: "GET" })
}

export const authFetchPost = async (url: string, options: FetchOptions) => {
  return await authFetch(url, { ...options, method: "POST" })
}
