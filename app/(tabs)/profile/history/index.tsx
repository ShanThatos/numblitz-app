import { useMemo } from "react";
import { useModels } from "~/api/models";
import { usePracticeQuizScores } from "~/api/scores";
import { PracticeQuizScoreResult } from "~/api/types";
import BackButton from "~/components/screens/components/BackButton";
import PromiseRefreshControl from "~/components/screens/components/PromiseRefreshControl";
import { Text } from "~/components/ui/text";
import ChevronRight from "~/lib/icons/ChevronRight";
import { Link } from "expo-router";
import { DateTime } from "luxon";
import { Pressable, ScrollView, View } from "react-native";

export default function ProfileHistoryScreen() {
  const { data: scoresData, refetch: scoresRefetch } = usePracticeQuizScores();
  const { data: modelsData, refetch: modelsRefetch } = useModels();

  const modelsMap = useMemo(() => {
    const firstModel = modelsData?.data?.[0];
    if (!firstModel) {
      return undefined;
    }
    const map = new Map<number, typeof firstModel>();
    for (const model of modelsData.data ?? []) {
      map.set(model.id, model);
    }
    return map;
  }, [modelsData]);

  const refresh = async () => {
    await Promise.all([scoresRefetch(), modelsRefetch()]);
  };

  return (
    <ScrollView
      className="flex-1"
      refreshControl={<PromiseRefreshControl onRefresh={refresh} />}
    >
      <View className="pt-safe flex flex-1 flex-col">
        <View className="flex flex-row items-start gap-3 px-3 pt-2">
          <BackButton size={25} />
          <Text className="text-4xl font-bold leading-none">History</Text>
        </View>
        <View className="flex flex-1 flex-col items-stretch gap-2 px-5 py-4">
          {scoresData?.data?.map((score, index) => {
            const result = score.result as unknown as PracticeQuizScoreResult;
            const splitTitle = modelsMap
              ?.get(score.model_id)
              ?.display_name.split("\n");
            const mainTitle = splitTitle?.[0];
            const subTitle = splitTitle?.slice(1).join("\n");
            return (
              <Link
                key={`${score.id.toString()}-${index.toString()}`}
                href={`/profile/history/quiz/${score.id.toString()}`}
                asChild
              >
                <Pressable className="flex min-h-14 flex-row items-center gap-1.5 rounded-md border border-input bg-white px-2 active:bg-accent">
                  <View className="flex aspect-square h-14 flex-col items-center justify-center">
                    <Text
                      className={`text-lg font-bold leading-none ${result.score >= 80 ? "text-green-700" : "text-red-700"}`}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {result.score.toFixed(0)}%
                    </Text>
                  </View>
                  <View className="py-1">
                    <Text className="leading-tight text-slate-700">
                      {mainTitle}
                    </Text>
                    {subTitle && (
                      <Text className="text-sm leading-tight text-slate-600">
                        {subTitle}
                      </Text>
                    )}
                    <Text className="text-sm text-slate-600">
                      {DateTime.fromISO(score.created_at).toLocaleString({
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                  <ChevronRight className="ml-auto text-slate-600" size={20} />
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
