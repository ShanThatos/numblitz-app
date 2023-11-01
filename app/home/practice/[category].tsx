import { FontAwesome } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react"
import { RefreshControl } from "react-native"

import {
  FlexColCenter,
  FlexRow,
  FullView,
  Header2,
  Header3,
  Header5,
  ScrollView,
} from "../../../components/base"
import { useAuthFetchGet } from "../../../hooks/authfetch"

interface ProblemModel {
  id: string
  category_id: string
  name: string
  difficulty: number
  locked: boolean
}

interface ProblemCategory {
  id: string
  name: string
  display: string
}

export default function CategoryModelsScreen() {
  const { category: category_id } = useLocalSearchParams<{ category: string }>()

  const [refreshing, setRefreshing] = useState(false)

  const { data: category, refresh: refreshCategory } =
    useAuthFetchGet<ProblemCategory>(`/mathgen/category/${category_id}`)

  const { data: models, refresh: refreshModels } = useAuthFetchGet<
    ProblemModel[]
  >("/mathgen/models", {
    params: {
      category_id: category_id || "",
    },
  })

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([refreshCategory(), refreshModels()])
    setRefreshing(false)
  }, [refreshCategory, refreshModels])

  return (
    <ScrollView
      className="bg-primary"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FullView className="p-4">
        <Header2 className="mb-4 text-center">{category?.name}</Header2>
        {models?.map((model) => (
          <FlexRow
            key={model.id}
            className={
              "mb-3 rounded-lg border-l-8 bg-white px-3 py-2 shadow " +
              (model.difficulty === 1
                ? "border-[#64c451]"
                : model.difficulty === 2
                ? "border-[#fcb954]"
                : "border-[#fc5454]")
            }
          >
            <FlexRow className="flex-1 justify-end">
              <Header5 className="mr-auto">{model.name}</Header5>
              {model.locked && (
                <FlexColCenter className="ml-2">
                  <FontAwesome name="lock" size={24} color="black" />
                </FlexColCenter>
              )}
            </FlexRow>
          </FlexRow>
        ))}
      </FullView>
    </ScrollView>
  )
}
