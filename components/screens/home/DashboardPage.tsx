import { useMemo } from "react";
import {
  useDashboardAverageScore,
  useDashboardCompleteScore,
  useDashboardTrickOfTheDay,
} from "~/api/dashboard";
import { useModels } from "~/api/models";
import { useProfile } from "~/api/profile";
import ProgressArc from "~/components/graphics/ProgressArc";
import { Text } from "~/components/ui/text";
import { View } from "react-native";
import ModelButton from "../components/ModelButton";
import ModelButtonLoader from "../components/ModelButtonLoader";

export default function DashboardPage() {
  const { data: profileData } = useProfile();
  const { data: modelsData } = useModels();
  const { data: completeScoreData } = useDashboardCompleteScore();
  const { data: averageScoreData } = useDashboardAverageScore();
  const { data: trickOfTheDay } = useDashboardTrickOfTheDay();

  const completeScore = completeScoreData?.data?.complete ?? 0;
  const averageScore = averageScoreData?.data?.average ?? 0;

  const recentlyViewedModels = useMemo(() => {
    const modelsArray = modelsData?.data ?? [];
    const map = new Map<string, (typeof modelsArray)[number]>();
    modelsArray.forEach((model) => {
      map.set(model.name, model);
    });

    return (profileData?.data?.recently_viewed ?? "")
      .split(",")
      .flatMap((modelName) => {
        const model = map.get(modelName);
        return model ? [model] : [];
      });
  }, [modelsData?.data, profileData?.data?.recently_viewed]);

  // streak
  return (
    <View className="flex flex-col gap-5">
      <View className="flex flex-row items-center">
        <View className="flex flex-1 flex-col items-center justify-center">
          <ProgressArc
            className="flex aspect-square h-28 flex-col items-center justify-center"
            progress={completeScore / 100.0}
            arcOptions={{
              strokeWidth: 8,
            }}
          >
            <Text className="text-3xl">{completeScore.toFixed(0)}%</Text>
            <Text className="leading-none text-[#0009]">Complete</Text>
          </ProgressArc>
        </View>
        <View className="flex flex-1 flex-col items-center justify-center">
          <ProgressArc
            className="flex aspect-square h-28 flex-col items-center justify-center"
            progress={averageScore / 100.0}
            arcOptions={{
              strokeWidth: 8,
              stroke: "#12a8ff",
            }}
          >
            <Text className="text-3xl">{averageScore.toFixed(0)}%</Text>
            <Text className="text-center leading-none text-[#0009]">
              Average
            </Text>
            <View className="relative h-0 w-full">
              <Text className="absolute inset-0 w-full text-center leading-none text-[#0009]">
                Score
              </Text>
            </View>
          </ProgressArc>
        </View>
      </View>
      <View>
        <Text className="text-lg text-gray-600">Trick of the Day</Text>
        <View className="pt-3">
          {trickOfTheDay?.data?.name ? (
            <ModelButton model={trickOfTheDay.data} hardResetNavigate />
          ) : (
            <ModelButtonLoader />
          )}
        </View>
      </View>
      <View>
        <Text className="text-lg text-gray-600">Recently Viewed</Text>
        {!!recentlyViewedModels.length && (
          <View className="flex flex-col items-stretch gap-3 pt-3">
            {recentlyViewedModels.map((model) => (
              <ModelButton key={model.name} model={model} hardResetNavigate />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
