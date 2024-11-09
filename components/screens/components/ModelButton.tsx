import { CommonActions } from "@react-navigation/native";
import { Text } from "~/components/ui/text";
import { Tables } from "~/lib/database.types";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

interface ModelButtonProps {
  model: Pick<
    Tables<"mathgen_models_view">,
    "name" | "category_name" | "display_name" | "display_image" | "difficulty"
  >;
  hardResetNavigate?: boolean;
  onPress?: () => unknown;
}

const DIFFICULTY_VALUES: Record<number, string[]> = {
  1: ["bg-green-200", "Easy"],
  2: ["bg-blue-200", "Medium"],
  3: ["bg-red-200", "Hard"],
};

export default function ModelButton({
  model,
  onPress,
  hardResetNavigate,
}: ModelButtonProps) {
  const router = useRouter();
  const navigation = useNavigation();

  const splitTitle = model.display_name.split("\n");
  const mainTitle = splitTitle[0];
  const subTitle = splitTitle.slice(1).join("\n");

  return (
    <Pressable
      className="native:px-4 native:py-2 rounded-md border border-input bg-white px-4 py-2 active:bg-accent web:hover:bg-accent"
      onPress={() => {
        if (onPress?.()) return;
        if (hardResetNavigate) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "practice",
                  state: {
                    routes: [
                      {
                        name: "index",
                      },
                      {
                        name: "[category]/index",
                        params: {
                          category: model.category_name,
                        },
                      },
                      {
                        name: "[category]/[model]/index",
                        params: {
                          category: model.category_name,
                          model: model.name,
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          );
        } else {
          router.navigate({
            pathname: "/practice/[category]/[model]",
            params: {
              category: model.category_name,
              model: model.name,
            },
          });
        }
      }}
    >
      <View className="flex flex-row items-start gap-3">
        <View>
          <Text className="">{mainTitle}</Text>
          {subTitle && (
            <Text className="text-sm leading-tight text-neutral-600">
              {subTitle}
            </Text>
          )}
        </View>
        <View
          className={`ml-auto rounded p-1 ${DIFFICULTY_VALUES[model.difficulty][0]}`}
        >
          <Text className="leading-none">
            {DIFFICULTY_VALUES[model.difficulty][1]}
          </Text>
        </View>
      </View>
      <Image
        className="ml-auto mr-auto h-10 w-full max-w-[60%]"
        source={{ uri: model.display_image }}
        contentFit="contain"
      />
    </Pressable>
  );
}
