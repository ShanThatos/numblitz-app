import { useLocalSearchParams } from "expo-router"
import { useCallback } from "react"
import { RefreshControl } from "react-native"

import { FullView, ScrollView } from "../../../../components/base"
import HtmlView from "../../../../components/htmlview/HtmlView"
import { useExplanation } from "../../../../hooks/requests/models"

export default function ModelScreen() {
  const { model: model_id } = useLocalSearchParams<{
    model: string
  }>()

  const { loadingExplanation, explanation, refreshExplanation } =
    useExplanation(model_id)

  const onRefresh = useCallback(async () => {
    await Promise.all([refreshExplanation()])
  }, [refreshExplanation])

  return (
    <ScrollView
      className="bg-primary"
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={loadingExplanation} onRefresh={onRefresh} />
      }
    >
      <FullView className="mx-auto w-full max-w-2xl p-1">
        <HtmlView html={explanation || ""} />
      </FullView>
    </ScrollView>
  )
}
