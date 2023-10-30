import { registerDevMenuItems } from "expo-dev-menu"
import { router } from "expo-router"

import Storage from "../../utils/Storage"

const devMenuitems = [
  {
    name: "Reset",
    callback: async () => {
      await Storage.removeItem("nb-jwt-token")
      router.replace("/")
    },
  },
]

registerDevMenuItems(devMenuitems)
