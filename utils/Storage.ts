import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

const WebLocalStorageAdapter = {
  getItem: async (key: string) => {
    return localStorage.getItem(key)
  },
  setItem: async (key: string, value: string) => {
    return localStorage.setItem(key, value)
  },
  removeItem: async (key: string) => {
    return localStorage.removeItem(key)
  },
}

const Storage =
  Platform.OS === "web" ? WebLocalStorageAdapter : ExpoSecureStoreAdapter

export default Storage
