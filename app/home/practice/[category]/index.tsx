import { FontAwesome } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react"
import { RefreshControl } from "react-native"

import {
  FlexColCenter,
  FlexRow,
  FlexRowCenter,
  FullFlexCol,
  FullView,
  Header2,
  Header4,
  Image,
  Pressable,
  ScrollView,
  View,
} from "../../../../components/base"
import { getColor } from "../../../../contexts/theme"
import { useAuthFetchGet } from "../../../../hooks/authfetch"

interface ProblemModel {
  id: string
  category_id: string
  name: string
  image_display: string
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
      <FullView className="mx-auto w-full max-w-2xl p-4">
        <Header2 className="mb-4 text-center">{category?.name}</Header2>
        {models?.map((model) => (
          <Pressable
            key={model.id}
            className={
              "mb-3 flex flex-row rounded-lg border-l-8 bg-white shadow " +
              (model.difficulty === 1
                ? "border-[#64c451]"
                : model.difficulty === 2
                ? "border-[#fcb954]"
                : "border-[#fc5454]")
            }
            onPress={() => {
              router.push(`/home/practice/${model.id}/explanation`)
            }}
          >
            <FullFlexCol className="p-2">
              <Header4 className="mr-auto">{model.name}</Header4>
              {model.image_display !== "" && (
                <FlexRow className="ml-2 h-7">
                  <Image
                    className="grow"
                    contentFit="contain"
                    contentPosition="left center"
                    source={{ uri: model.image_display }}
                  />
                  <FullView />
                </FlexRow>
              )}
            </FullFlexCol>
            <FlexColCenter className="rounded-r-lg pr-1">
              <FlexColCenter className="aspect-square w-6">
                {model.locked ? (
                  <FontAwesome
                    name="lock"
                    size={20}
                    color={getColor("neutral-600")}
                  />
                ) : (
                  <FontAwesome
                    name="chevron-right"
                    size={15}
                    color={getColor("neutral-400")}
                  />
                )}
              </FlexColCenter>
            </FlexColCenter>
          </Pressable>
        ))}
      </FullView>
    </ScrollView>
  )
}
