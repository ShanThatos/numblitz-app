import { useModels } from "~/api/models";
import { Text } from "~/components/ui/text";
import Fuse from "fuse.js";
import { Pressable, ScrollView } from "react-native";
import ModelButton from "../components/ModelButton";

interface SearchResultsPageProps {
  searchQuery: string;
  dismissSearch: () => void;
}

export default function SearchResultsPage({
  searchQuery,
  dismissSearch,
}: SearchResultsPageProps) {
  const { data: models, status } = useModels();

  if (status !== "success" || !models.data) {
    return <Text>Loading...</Text>;
  }

  const fuse = new Fuse(models.data, {
    keys: ["display_name"],
    shouldSort: true,
    threshold: 0.5,
  });

  const results = fuse.search(searchQuery).map((result) => result.item);

  return (
    <ScrollView
      className="flex-1"
      keyboardShouldPersistTaps="always"
      contentContainerClassName="min-h-full"
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        className="flex flex-1 flex-col items-stretch gap-2"
        onPress={dismissSearch}
      >
        {results.map((model) => (
          <ModelButton
            key={model.name}
            model={model}
            onPress={dismissSearch}
            hardResetNavigate
          />
        ))}
      </Pressable>
    </ScrollView>
  );
}
