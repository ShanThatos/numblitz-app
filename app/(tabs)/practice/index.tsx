import { useCategories } from "~/api/categories";
import ModelButtonLoader from "~/components/screens/components/ModelButtonLoader";
import PromiseRefreshControl from "~/components/screens/components/PromiseRefreshControl";
import { ScreenContainer } from "~/components/screens/components/ScreenContainer";
import { Text } from "~/components/ui/text";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

export default function PracticeScreen() {
  const { data: categories, status, refetch } = useCategories();

  return (
    <ScreenContainer
      refreshControl={<PromiseRefreshControl onRefresh={refetch} />}
    >
      <View className="pt-safe flex flex-1 flex-col">
        <Text className="px-5 pt-2 text-4xl font-bold leading-none">
          Categories
        </Text>
        <View className="flex flex-col items-stretch justify-center gap-2.5 p-5">
          {status === "success"
            ? categories.data
                ?.filter((category) => !category.hidden)
                .map((category) => (
                  <Link
                    key={category.id}
                    push
                    href={{
                      pathname: "/(tabs)/practice/[category]",
                      params: { category: category.name },
                    }}
                    asChild
                  >
                    <Pressable className="native:px-4 rounded-md border border-input bg-white px-4 py-2 active:bg-accent web:hover:bg-accent">
                      <Text>{category.display_name}</Text>
                      <Image
                        className="ml-auto mr-auto h-10 w-full max-w-[60%]"
                        source={{ uri: category.display_image }}
                        contentFit="contain"
                      />
                    </Pressable>
                  </Link>
                ))
            : new Array(3).fill(0).map((_, i) => <ModelButtonLoader key={i} />)}
        </View>
      </View>
    </ScreenContainer>
  );
}
