import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Tables } from "~/lib/database.types";
import Clock from "~/lib/icons/Clock";
import PencilRuler from "~/lib/icons/PencilRuler";
import { View } from "react-native";
import useResetTabBarGoBack from "./hooks/use-reset-go-back";

interface ReadyPageProps {
  model: Tables<"mathgen_models_view">;
  loading: boolean;
  onStart: () => void;
}
export default function ReadyPage({ model, loading, onStart }: ReadyPageProps) {
  const resetTabBarGoBack = useResetTabBarGoBack();

  const splitTitle = model.display_name.split("\n");
  const mainTitle = splitTitle[0];
  const subTitle = splitTitle.slice(1).join("\n");

  return (
    <View className="flex-1 flex-col items-center justify-center bg-white p-5">
      <View className="min-w-80 rounded-xl border-2 border-red-100 bg-brand-background p-4 shadow-sm">
        <View className="mx-4 mb-5">
          <Text className="text-center text-2xl">{mainTitle}</Text>
          {subTitle && (
            <Text className="text-center text-xl leading-tight text-neutral-700">
              {subTitle}
            </Text>
          )}
        </View>

        <Text className="mb-1 ml-4 font-Katex text-3xl">
          <PencilRuler className="inline-block text-brand-dark" /> 20 questions
        </Text>
        <Text className="ml-4 font-Katex text-3xl">
          <Clock className="inline-block text-brand-dark" /> 5 minutes
        </Text>
        <View className="mt-5 flex flex-row gap-2">
          <View className="flex-1">
            <Button className="bg-sky-600" onPress={resetTabBarGoBack}>
              <Text>Go Back</Text>
            </Button>
          </View>
          <View className="flex-1">
            <Button
              className="bg-brand-dark"
              loading={loading}
              disabled={loading}
              onPress={onStart}
            >
              <Text>Start</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
