import { useLocalSearchParams } from "expo-router"

import { useAuthFetchGet } from "../../../hooks/authfetch"

export default function CategoryModelsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>()

  const { data } = useAuthFetchGet("/mathgen/models", {
    params: {
      category_id: category || "",
    },
  })

  console.log(category)

  console.log(data)

  return <></>
}
