import { FontAwesome } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback } from "react"
import { RefreshControl, Text as RNText } from "react-native"

import {
  FlexColCenter,
  FlexRow,
  FlexRowCenter,
  FullFlexCol,
  FullView,
  Header2,
  Header4,
  Header5,
  Pressable,
  ScrollView,
} from "../../../../components/base"
import { getColor } from "../../../../contexts/theme"
import { useCategory } from "../../../../hooks/requests/category"
import { useModelProgress, useModels } from "../../../../hooks/requests/models"

export default function CategoryModelsScreen() {
  const { category: categoryId } = useLocalSearchParams<{ category: string }>()

  const { loadingCategory, category, refreshCategory } = useCategory(categoryId)
  const { loadingModels, models, refreshModels } = useModels({
    category_id: categoryId,
  })

  const { progress, refreshProgress } = useModelProgress(
    models?.map((m) => m.id) ?? [],
  )

  const onRefresh = useCallback(async () => {
    await Promise.all([refreshCategory(), refreshModels(), refreshProgress()])
  }, [refreshCategory, refreshModels, refreshProgress])

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
              if (model.unlocked)
                router.navigate(`/home/practice/${categoryId}/${model.id}`)
            }}
          >
            <FullFlexCol className="p-2">
              <FlexRow>
                <Header4>{model.name}</Header4>
                {progress && progress[model.id] && (
                  <FullView>
                    <Header5 adjustsFontSizeToFit numberOfLines={1}>
                      <RNText style={{ color: getColor("blue-400") }}>
                        {"  "}
                        {Math.min(progress[model.id].progress, 5)}/5
                      </RNText>
                      <RNText
                        style={{
                          color: getColor(
                            progress[model.id].average <= 8
                              ? "green-600"
                              : "red-700",
                          ),
                        }}
                      >
                        {"  Avg: "}
                        {progress[model.id].average.toFixed(1)}s
                      </RNText>
                    </Header5>
                  </FullView>
                )}
              </FlexRow>
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
            <FlexRowCenter className="pr-1">
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
            </FlexRowCenter>
          </Pressable>
        ))}
      </FullView>
    </ScrollView>
  )
}
