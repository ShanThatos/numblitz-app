import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Tables } from "~/lib/database.types";
import Clock from "~/lib/icons/Clock";
import PencilRuler from "~/lib/icons/PencilRuler";
import { View } from "react-native";
import { useResetTabBarGoBack } from "./common";

interface ReadyPageProps {
  model: Tables<"mathgen_models_view">;
  loading: boolean;
  onStart: () => void;
}
export default function ReadyPage({ model, loading, onStart }: ReadyPageProps) {
  const resetTabBarGoBack = useResetTabBarGoBack();
  return (
    <View className="flex-1 flex-col items-stretch justify-center bg-white p-5">
      <View className="rounded-xl border-2 border-red-100 bg-brand-background p-4 shadow-sm">
        <Text className="mx-4 mb-5 text-center text-2xl">
          {model.display_name}
        </Text>

        <Text className="mb-1 ml-4 font-Katex text-3xl">
          <PencilRuler className="text-brand-dark" /> 20 questions
        </Text>
        <Text className="ml-4 font-Katex text-3xl">
          <Clock className="text-brand-dark" /> 5 minutes
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
