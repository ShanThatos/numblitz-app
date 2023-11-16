import { FontAwesome } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback } from "react"
import { RefreshControl } from "react-native"

import {
  FlexColCenter,
  FlexRow,
  FullFlexCol,
  FullView,
  Header2,
  Header4,
  Image,
  Pressable,
  ScrollView,
} from "../../../../components/base"
import { getColor } from "../../../../contexts/theme"
import { useCategory } from "../../../../hooks/requests/category"
import { useModels } from "../../../../hooks/requests/models"

export default function CategoryModelsScreen() {
  const { category: categoryId } = useLocalSearchParams<{ category: string }>()

  const { loadingCategory, category, refreshCategory } = useCategory(categoryId)
  const { loadingModels, models, refreshModels } = useModels({
    category_id: categoryId,
  })

  const onRefresh = useCallback(async () => {
    await Promise.all([refreshCategory(), refreshModels()])
  }, [refreshCategory, refreshModels])

  return (
    <ScrollView
      className="bg-primary"
      refreshControl={
        <RefreshControl
          refreshing={loadingCategory || loadingModels}
          onRefresh={onRefresh}
        />
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
              router.push(`/home/practice/${categoryId}/${model.id}`)
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
                {model.unlocked ? (
                  <FontAwesome
                    name="chevron-right"
                    size={15}
                    color={getColor("neutral-400")}
                  />
                ) : (
                  <FontAwesome
                    name="lock"
                    size={20}
                    color={getColor("neutral-600")}
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
