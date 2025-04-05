import { useRef, useState } from "react";
import { useCategories } from "~/api/categories";
import { useModelsByCategory } from "~/api/models";
import BackButton from "~/components/screens/components/BackButton";
import CardsContainer from "~/components/screens/components/CardsContainer";
import ModelButton from "~/components/screens/components/ModelButton";
import ModelButtonLoader from "~/components/screens/components/ModelButtonLoader";
import PromiseRefreshControl from "~/components/screens/components/PromiseRefreshControl";
import { ScreenContainer } from "~/components/screens/components/ScreenContainer";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import Fuse from "fuse.js";
import { TextInput, View } from "react-native";

export default function CategoryScreen() {
  const params = useLocalSearchParams<{ category: string }>();

  const searchInputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const getSearchResults = () => {
    if (!models?.data) {
      return [];
    }

    if (!searchQuery) {
      return models.data;
    }

    const fuse = new Fuse(models.data, {
      keys: ["display_name"],
      shouldSort: true,
      threshold: 0.5,
    });

    return fuse.search(searchQuery).map((result) => result.item);
  };

  return (
    <ScreenContainer
      refreshControl={<PromiseRefreshControl onRefresh={onRefresh} />}
      onScrollBeginDrag={() => {
        searchInputRef.current?.blur();
      }}
    >
      <View className="pt-safe flex-1">
        <View className="flex flex-row items-center gap-3 px-3 pt-2">
          <BackButton size={25} />
          <Text className="text-4xl font-bold leading-none">
            {category?.display_name}
          </Text>
        </View>
        <View className="px-5 pt-3">
          <TextInput
            ref={searchInputRef}
            className="rounded-lg border-2 border-neutral-200 bg-neutral-50 p-3 transition-colors focus:border-sky-300"
            placeholderTextColor={"#777"}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <CardsContainer>
          {modelsStatus === "success"
            ? getSearchResults().map((model) => (
                <ModelButton key={model.name} model={model} />
              ))
            : new Array(5).fill(0).map((_, i) => <ModelButtonLoader key={i} />)}
        </CardsContainer>
      </View>
    </ScreenContainer>
  );
}
