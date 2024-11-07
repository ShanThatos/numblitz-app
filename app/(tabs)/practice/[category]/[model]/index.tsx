import { useCallback } from "react";
import { useModel } from "~/api/models";
import { useTopPracticeQuizScores } from "~/api/scores";
import { useUser } from "~/components/contexts/session";
import BackButton from "~/components/screens/components/BackButton";
import PromiseRefreshControl from "~/components/screens/components/PromiseRefreshControl";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { AutoHeightWebView } from "~/components/views/html";
import { supabase } from "~/lib/clients";
import { buildModelExplanationHtmlPage } from "~/lib/html";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

const useUpdateRecentlyViewed = () => {
  const params = useLocalSearchParams<{ category: string; model: string }>();
  const user = useUser();
  useFocusEffect(
    useCallback(() => {
      if (user) {
        void (async () => {
          const profileData = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle()
            .throwOnError();

          const recentlyViewed =
            profileData.data?.recently_viewed.split(",") ?? [];

          const newRecentlyViewed = [params.model];
          for (const modelName of recentlyViewed) {
            if (newRecentlyViewed.length >= 3) break;
            if (modelName && !newRecentlyViewed.includes(modelName)) {
              newRecentlyViewed.push(modelName);
            }
          }

          await supabase
            .from("profiles")
            .update({ recently_viewed: newRecentlyViewed.join(",") })
            .eq("id", user.id)
            .throwOnError();
        })();
      }
    }, [params.model, user]),
  );
};

export default function ModelScreen() {
  const params = useLocalSearchParams<{ category: string; model: string }>();
  const { data: model, refetch: refetchModel } = useModel(params.model);
  const { data: topScores, refetch: refetchTopScores } =
    useTopPracticeQuizScores(model?.data?.id);

  useUpdateRecentlyViewed();

  const onRefresh = () => {
    return Promise.all([refetchModel(), refetchTopScores()]);
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<PromiseRefreshControl onRefresh={onRefresh} />}
        >
          <View className="pt-safe flex-1">
            <View className="flex flex-row items-start gap-3 px-4 pt-2">
              <BackButton size={20} />
              <View className="flex-1">
                <Text className="text-3xl font-bold leading-none">
                  {model?.data?.display_name}
                </Text>
              </View>
            </View>
            {topScores?.data && (
              <View className="flex flex-row items-center gap-2 px-4 pt-4">
                <Text className="text-lg leading-none text-gray-600">
                  Your Top Scores:
                </Text>
                {topScores.data.topscores?.map((score, index) => (
                  <View key={`${score.toString()}-${index.toString()}`}>
                    <Text
                      className={`leading-none ${score >= 80 ? "text-green-600" : "text-red-600"} `}
                    >
                      {score.toString()}%
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <View className="flex-1 py-2">
              {model && (
                <AutoHeightWebView
                  source={buildModelExplanationHtmlPage(
                    model.data?.explanation ?? "[]",
                  )}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View className="border-t-hairline border-t-neutral-300 p-2">
        <Link
          href={`/practice/${params.category}/${params.model}/quiz`}
          asChild
        >
          <Button className="bg-brand-dark">
            <Text>Practice</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}