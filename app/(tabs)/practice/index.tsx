import { useCategories } from "~/api/categories";
import CardsContainer from "~/components/screens/components/CardsContainer";
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
        <CardsContainer>
          {status === "success"
            ? categories.data
                ?.filter((category) => !category.hidden)
                .map((category) => (
                  <Link
                    key={category.id}
                    href={`/practice/${category.name}`}
                    push
                    asChild
                  >
                    <Pressable className="flex-1 rounded-md border border-input bg-white px-4 py-2 active:bg-accent web:hover:bg-accent">
                      <Text>{category.display_name}</Text>
                      <View className="flex-1 p-1">
                        <Image
                          className="m-auto h-10 w-full"
                          source={{ uri: category.display_image }}
                          contentFit="contain"
                        />
                      </View>
                    </Pressable>
                  </Link>
                ))
            : new Array(5).fill(0).map((_, i) => <ModelButtonLoader key={i} />)}
        </CardsContainer>
      </View>
    </ScreenContainer>
  );
}
