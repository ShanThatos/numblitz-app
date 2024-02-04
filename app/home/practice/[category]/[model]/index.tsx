import { router, useLocalSearchParams } from "expo-router"
import { RefreshControl, View } from "react-native"

import {
  FullView,
  Header5,
  Pressable,
  ScrollView,
} from "../../../../../components/base"
import HtmlView from "../../../../../components/htmlview/HtmlView"
import { useExplanation } from "../../../../../hooks/requests/models"

export default function ModelScreen() {
  const { category: categoryId, model: modelId } = useLocalSearchParams<{
    model: string
    category: string
  }>()

  const { loadingExplanation, explanation, refreshExplanation } =
    useExplanation(modelId)

  return (
    <FullView className="bg-primary">
      <FullView className="mx-auto w-full max-w-2xl">
        <ScrollView
          className="p-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={loadingExplanation}
              onRefresh={refreshExplanation}
            />
          }
        >
          <HtmlView html={explanation || ""} />
        </ScrollView>
        {explanation && (
          <View className="px-4 pb-4">
            <Pressable
              className="rounded bg-icon p-2"
              onPress={() => {
                router.navigate(`/home/practice/${categoryId}/${modelId}/quiz`)
              }}
            >
              <Header5 className="text-center text-white">Practice!</Header5>
            </Pressable>
          </View>
        )}
      </FullView>
    </FullView>
  )
}
