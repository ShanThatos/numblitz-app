import { getCategories, useCategories } from "~/api/categories";
import { useModelsByCategory } from "~/api/models";
import BackButton from "~/components/screens/components/BackButton";
import ModelButton from "~/components/screens/components/ModelButton";
import ModelButtonLoader from "~/components/screens/components/ModelButtonLoader";
import PromiseRefreshControl from "~/components/screens/components/PromiseRefreshControl";
import { ScreenContainer } from "~/components/screens/components/ScreenContainer";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export async function generateStaticParams(): Promise<
  Record<string, string>[]
> {
  const { data } = await getCategories();
  if (!data) {
    throw new Error("Failed to fetch categories");
  }
  return data.map(({ name }) => ({
    category: name,
  }));
}

export default function CategoryScreen() {
  const params = useLocalSearchParams<{ category: string }>();
  const {
    data: categories,
    status: categoriesStatus,
    refetch: categoriesRefetch,
  } = useCategories();
  const {
    data: models,
    status: modelsStatus,
    refetch: modelsRefetch,
  } = useModelsByCategory(params.category);

  const category = categories?.data?.find(
    ({ name }) => name === params.category,
  );

  if (categoriesStatus !== "success") {
    return <></>;
  }

  const onRefresh = () => {
    return Promise.all([categoriesRefetch(), modelsRefetch()]);
  };

  return (
    <ScreenContainer
      refreshControl={<PromiseRefreshControl onRefresh={onRefresh} />}
    >
      <View className="pt-safe flex-1">
        <View className="flex flex-row items-center gap-3 px-3 pt-2">
          <BackButton size={25} />
          <Text className="text-4xl font-bold leading-none">
            {category?.display_name}
          </Text>
        </View>
        <View className="flex-col items-stretch justify-center gap-2.5 p-5">
          {modelsStatus === "success"
            ? models.data?.map((model) => (
                <ModelButton key={model.name} model={model} />
              ))
            : new Array(3).fill(0).map((_, i) => <ModelButtonLoader key={i} />)}
        </View>
      </View>
    </ScreenContainer>
  );
}
